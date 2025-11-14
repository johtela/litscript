/**
 * # Region Resolution with Dependency Analysis
 *
 * This module handles the resolution of region references after all source
 * files have been parsed. It implements a sophisticated dependency resolution
 * system that allows regions to reference other regions, even before they are
 * defined (forward references), while detecting circular dependencies.
 *
 * ## The Problem
 *
 * When a region references another region using `<<r:name>>`, we need to
 * expand that reference to include the actual content. This becomes complex
 * when:
 *
 *  * Regions reference other regions that haven't been defined yet (forward references)
 *  * Regions contain references to other regions (nested references)
 *  * Two or more regions reference each other (circular dependencies)
 *
 * ## The Solution
 *
 * We use a four-step approach:
 *
 * 1. **Scan Phase**: Collect all region definitions from source files
 * 2. **Parse Phase**: Process files and create `regionRef` placeholder blocks
 * 3. **Resolution Phase**: Build a dependency graph and expand regions bottom-up
 * 4. **Output Phase**: Write the fully resolved files
 *
 * The key insight is that we don't expand regions during parsing. Instead,
 * we create placeholder blocks and defer the actual expansion until all
 * regions are known. Then we can resolve them in the correct order using
 * topological sorting.
 */
//#region -c region-resolver imports
import * as bl from "./block-list";
import * as reg from "./region";
import * as path from "path";
//#endregion

/**
 * ## Dependency Graph
 *
 * Each region can depend on other regions. We track these dependencies in
 * a graph structure where nodes represent regions and edges represent
 * "depends on" relationships.
 *
 * For example, if region A contains `<<r:B>>`, then A depends on B. Before
 * we can fully expand A, we must first expand B.
 */
interface RegionNode {
  name: string;
  region: reg.Region;
  dependencies: Set<string>; // Names of regions this region references
  resolved: boolean;
}

/**
 * ## The Region Resolver
 *
 * The resolver orchestrates the entire resolution process. It builds a
 * dependency graph from all regions, performs topological sorting to
 * determine the correct expansion order, and recursively expands each
 * region's references.
 *
 * ### How It Works
 *
 * Consider this example:
 *
 * ```typescript
 * //#region inner
 * function inner() { return "inner"; }
 * //#endregion
 *
 * //#region outer
 * // References inner: <<r:inner>>
 * function outer() { return "outer"; }
 * //#endregion
 * ```
 *
 * The resolver will:
 *
 * 1. Scan both regions and find that `outer` depends on `inner`
 * 2. Sort them topologically: [`inner`, `outer`]
 * 3. Expand `inner` first (no dependencies, nothing to do)
 * 4. Expand `outer` second (replaces `<<r:inner>>` with inner's content)
 */
export class RegionResolver {
  private nodes: Map<string, RegionNode> = new Map();
  private fileBlocks: Map<string, bl.BlockList>;

  constructor(fileBlocks: Map<string, bl.BlockList>) {
    this.fileBlocks = fileBlocks;
  }

  /**
   * ### Building the Dependency Graph
   *
   * We scan all regions to find which other regions they reference. Each
   * reference creates a dependency edge in our graph. For example, if
   * region A contains a `<<r:B>>` marker, we add B to A's dependency set.
   *
   * Self-references (a region referencing itself) are filtered out as
   * they would create trivial cycles.
   */
  buildGraph() {
    const regions = reg.Region.getAllRegions();

    // First, create nodes for all regions
    for (const [name, region] of Object.entries(regions)) {
      const node: RegionNode = {
        name,
        region: region as reg.Region,
        dependencies: new Set(),
        resolved: false,
      };

      // Scan the region's blocks for region references
      for (
        let block = region.getStart();
        block && block !== region.getEnd();
        block = block.next
      ) {
        if (block.kind === bl.BlockKind.regionRef) {
          const refName = block.contents.trim();
          if (refName !== name) {
            // Ignore self-references (would be cycle)
            node.dependencies.add(refName);
          }
        }
      }

      this.nodes.set(name, node);
    }
  }

  /**
   * ### Topological Sort with Cycle Detection
   *
   * Returns region names in dependency order (dependencies come first).
   * Uses depth-first search with a "visiting" set to detect cycles.
   *
   * If region A depends on B, and B depends on C, the result will be
   * [C, B, A] - we can safely expand C first, then B, then A.
   *
   * If we detect a cycle (e.g., A → B → C → A), we throw an error with
   * the full cycle path for debugging.
   */
  topologicalSort(): string[] {
    const sorted: string[] = [];
    const visiting = new Set<string>();
    const visited = new Set<string>();

    const visit = (name: string, path: string[]) => {
      if (visited.has(name)) return;

      if (visiting.has(name)) {
        // Cycle detected!
        const cycle = [...path, name].join(" → ");
        throw new Error(`Circular region dependency detected: ${cycle}`);
      }

      visiting.add(name);
      const node = this.nodes.get(name);

      if (node) {
        for (const dep of node.dependencies) {
          visit(dep, [...path, name]);
        }
      }

      visiting.delete(name);
      visited.add(name);
      sorted.push(name);
    };

    for (const name of this.nodes.keys()) {
      visit(name, []);
    }

    return sorted;
  }

  /**
   * ### Resolving All Regions
   *
   * This is the main entry point for region resolution. It:
   *
   * 1. Builds the dependency graph
   * 2. Sorts regions topologically
   * 3. Expands each region recursively in the correct order
   * 4. Expands region references in file-level content (outside regions)
   *
   * After this process, all `regionRef` placeholder blocks are replaced
   * with the actual expanded content.
   */
  resolve() {
    this.buildGraph();
    const order = this.topologicalSort();

    // Expand regions in dependency order (bottom-up)
    for (const name of order) {
      const node = this.nodes.get(name);
      if (!node || node.resolved) continue;

      // Recursively expand this region with cycle detection
      this.expandRegionRecursively(node.region, new Set());
      node.resolved = true;
    }

    // Also expand region references in ALL file blocks (not just within regions)
    for (const blocks of this.fileBlocks.values()) {
      this.expandFileBlocksRecursively(blocks, new Set());
    }
  }

  /**
   * ### Recursive Region Expansion
   *
   * Expands all region references within a region, recursively expanding
   * any nested references. Uses a "visiting" set to detect cycles during
   * the expansion process.
   *
   * For example, if region A references B, and B references C, this will:
   *
   * 1. Expand C first (no dependencies)
   * 2. Expand B (replaces `<<r:C>>` with C's content)
   * 3. Expand A (replaces `<<r:B>>` with B's fully expanded content)
   *
   * The visiting set prevents infinite recursion if there's a cycle that
   * somehow wasn't caught by topological sort.
   */
  private expandRegionRecursively(region: reg.Region, visiting: Set<string>) {
    const regionName = region.name;

    // Check for cycles
    if (visiting.has(regionName)) {
      const cycle = Array.from(visiting).join(" → ") + " → " + regionName;
      throw new Error(
        `Circular region dependency detected during expansion: ${cycle}`
      );
    }

    visiting.add(regionName);

    let prev: bl.BlockList | null = null;
    let current = region.getStart();
    const relTargetPath = region.relOutputDir;

    while (current && current !== region.getEnd()) {
      if (current.kind === bl.BlockKind.regionRef) {
        const refName = current.contents.trim();
        const refRegion = reg.Region.get(refName, region.definedInFile);

        // Recursively expand the referenced region FIRST
        this.expandRegionRecursively(refRegion, new Set(visiting));

        // Now expand it into our blocks
        let firstExpanded: bl.BlockList | null = null;
        let lastExpanded: bl.BlockList | null = null;

        for (const block of refRegion.expand(relTargetPath)) {
          if (!firstExpanded) {
            firstExpanded = block;
            lastExpanded = block;
          } else {
            lastExpanded!.next = block;
            lastExpanded = block;
          }
        }

        // Replace the regionRef block with expanded blocks
        if (firstExpanded) {
          if (prev) {
            prev.next = firstExpanded;
          } else {
            // This was the first block, update region start
            region.updateStart(firstExpanded);
          }
          lastExpanded!.next = current.next;
          current = lastExpanded!.next;
        } else {
          // Empty region, just skip
          if (prev) {
            prev.next = current.next;
          }
          current = current.next;
        }
      } else {
        prev = current;
        current = current.next;
      }
    }

    visiting.delete(regionName);
  }

  /**
   * ### File-Level Reference Expansion
   *
   * Expands region references that appear in the main file content,
   * outside of any region definition. These are typically references
   * in documentation sections between code blocks.
   *
   * For example:
   *
   * ```typescript
   * /**
   *  * Here's the implementation: <<r:implementation>>
   *  *\/
   *
   * //#region implementation
   * function foo() { }
   * //#endregion
   * ```
   *
   * The `<<r:implementation>>` in the comment will be expanded here.
   */
  private expandFileBlocksRecursively(
    headBlock: bl.BlockList,
    visiting: Set<string>
  ) {
    let prev: bl.BlockList | null = null;
    let current: bl.BlockList | null = headBlock;

    while (current) {
      if (current.kind === bl.BlockKind.regionRef) {
        const refName = current.contents.trim();
        try {
          const refRegion = reg.Region.get(refName, "file");

          // Recursively expand the referenced region first
          // Note: We create a NEW visiting set here because file-level
          // references don't create cycles with the file itself
          this.expandRegionRecursively(refRegion, new Set());

          // Expand the referenced region
          let firstExpanded: bl.BlockList | null = null;
          let lastExpanded: bl.BlockList | null = null;

          for (const block of refRegion.expand("")) {
            if (!firstExpanded) {
              firstExpanded = block;
              lastExpanded = block;
            } else {
              lastExpanded!.next = block;
              lastExpanded = block;
            }
          }

          // Replace the regionRef block with expanded blocks
          if (firstExpanded) {
            if (prev) {
              prev.next = firstExpanded;
            }
            lastExpanded!.next = current.next;
            current = lastExpanded!.next;
          } else {
            // Empty region, just skip
            if (prev) {
              prev.next = current.next;
            }
            current = current.next;
          }
        } catch (e) {
          // Region not found or cycle detected, skip or rethrow
          if (e.message && e.message.includes("Circular")) {
            throw e;
          }
          prev = current;
          current = current.next;
        }
      } else {
        prev = current;
        current = current.next;
      }
    }
  }
}

/**
 * ## Main Entry Point
 *
 * This function is called from the weaver after all TypeScript files have
 * been processed. It receives a map of file paths to their processed blocks
 * (which may contain `regionRef` placeholders) and resolves all region
 * references.
 *
 * The resolved blocks are modified in place, so when the weaver outputs
 * the files, all region references will have been replaced with actual
 * content.
 */
export function resolveAllRegions(
  processedBlocks: Map<string, { blocks: bl.BlockList; outFile: any }>
) {
  // Extract just the blocks for the resolver
  const fileBlocks = new Map<string, bl.BlockList>();
  for (const [path, { blocks }] of processedBlocks.entries()) {
    fileBlocks.set(path, blocks);
  }

  const resolver = new RegionResolver(fileBlocks);
  resolver.resolve();
}
