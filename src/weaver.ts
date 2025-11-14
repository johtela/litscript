/**
 * # Weaver
 *
 * Weaver is the component that generates documentation for a project.
 * Its operation depends on the output format (markdown or HTML). Therefore,
 * weaver is defined as an abstract class which can be customized by overriding
 * certain methods. The abstract Weaver class contains the code common to both
 * markdown and HTML generation.
 */
//#region -c weaver imports
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { minimatch } from "minimatch";
import * as cfg from "./config";
import * as tr from "./translators/translators";
import * as bl from "./block-list";
import * as reg from "./region";
import * as resolver from "./region-resolver";
import * as log from "./logging";
import * as dg from "./dependency-graph";
//#endregion
/**
 * ## Weaver Base Class
 *
 * Main functionality provided by the Weaver class includes retrieving all
 * the source files according to the configuration and feeding them to a
 * [translator](translators/translators.html). It splits an input file into
 * code and markdown blocks.
 */
const tocModifiedDelayInMs = 1000;

export abstract class Weaver {
  protected typeChecker: ts.TypeChecker;
  protected outputMap: tr.OutputFileMap;
  private tocLastModified: number = 0;
  /**
   * ### Generating All Files
   *
   * The public method below takes a TypeScript `Program` object and generates
   * documentation for it. It first gathers all the files for which the
   * documentation is created. Then it creates a translator and processes
   * the files in two passes: first the TypeScript source files and then the
   * other files. The order is significant as [regions](region.html)
   * defined in source files must be created before they can be used.
   */
  generateDocumentation(prg: ts.Program) {
    this.outputMap = {};
    this.addTSFilesToOutputMap(prg);
    this.addOtherFilesToOutputMap();
    this.typeChecker = prg.getTypeChecker();
    this.processAllFiles();
  }
  /**
   * Map to store processed blocks before region resolution
   */
  private processedBlocks: Map<
    string,
    { blocks: bl.BlockList; outFile: tr.OutputFile }
  > = new Map();

  /**
   * Generate all files in the output file map.
   *
   * This is done in five passes:
   * 1. Scan all TypeScript files to collect region definitions
   * 2. Process TypeScript files (creating blocks with region references)
   * 3. Process other files (markdown, etc.) - also creates blocks with region references
   * 4. Resolve ALL region references using topological sorting
   * 5. Output all processed files
   */
  protected processAllFiles() {
    reg.Region.clear();
    this.processedBlocks.clear();

    // Pass 1: Scan TypeScript files to collect all regions
    this.getOutputFiles(tr.SourceKind.typescript).forEach(
      this.scanTsFileForRegions,
      this
    );

    // Pass 2: Process TypeScript files (store blocks, don't output yet)
    this.getOutputFiles(tr.SourceKind.typescript).forEach(
      this.processTsFileWithoutOutput,
      this
    );

    // Pass 3: Process other files (markdown, etc.) - store blocks, don't output yet
    this.getOutputFiles(tr.SourceKind.other).forEach(
      this.processOtherFileWithoutOutput,
      this
    );

    // Pass 4: Resolve all region references with topological sorting
    resolver.resolveAllRegions(this.processedBlocks);

    // Pass 5: Output all processed files with resolved regions
    for (const [_, { blocks, outFile }] of this.processedBlocks) {
      this.outputBlocks(blocks, outFile);
    }

    this.saveDependencyGraph();
  }
  /**
   * ### Watching Changes
   *
   * In watch mode we get a subtype of a `Program` object and use it to
   * process only the source files that are changed. If the output map is
   * not yet initialized, we call the `generateDocumentation` method to
   * build the whole documentation.
   */
  programChanged(
    prg: ts.SemanticDiagnosticsBuilderProgram,
    complete: (prg: ts.SemanticDiagnosticsBuilderProgram) => void
  ) {
    let d = prg.getSemanticDiagnosticsOfNextAffectedFile();
    while (d) {
      let aff = d.affected;
      if ((aff as ts.SourceFile).kind)
        this.reprocessSourceFile(aff as ts.SourceFile);
      else {
        this.processAllFiles();
        break;
      }
      d = prg.getSemanticDiagnosticsOfNextAffectedFile();
    }
    complete(prg);
  }
  /**
   * TypeScript compiler tracks only TS files, it does not notify us when
   * other files are changed. So, we must setup watchers for them separately.
   */
  watchOtherFiles(
    host: ts.WatchCompilerHostOfConfigFile<ts.SemanticDiagnosticsBuilderProgram>
  ) {
    this.getOutputFiles(tr.SourceKind.other).forEach((of) =>
      host.watchFile(of.source.fileName, (fileName, event) => {
        if (event == ts.FileWatcherEventKind.Changed) {
          let outFile = this.outputMap[fileName];
          if (outFile) this.reprocessOtherFile(outFile);
        }
      })
    );
    let opts = cfg.getOptions();
    if (opts.tocFile) {
      let tocPath = path.resolve(opts.outDir, opts.tocFile);
      host.watchFile(tocPath, (fileName, event) => {
        let lastMod = fs.statSync(tocPath).mtimeMs;
        if (lastMod - this.tocLastModified > tocModifiedDelayInMs) {
          this.tocLastModified = lastMod;
          setTimeout(() => {
            this.tocFileChanged(fileName);
          }, tocModifiedDelayInMs);
        }
      });
    }
  }
  /**
   * ### Abstract Methods
   *
   * The methods below are implemented in the sub-classes. The first one
   * returns the file extension for output files.
   */
  protected abstract getFileExt(): string;
  /**
   * The second one abstract method outputs a [blocks list](block-list.html)
   * to a file.
   */
  protected abstract outputBlocks(
    blocks: bl.BlockList,
    outputFile: tr.OutputFile
  ): void;
  /**
   * ### Helper Methods
   *
   * The helper   function below returns an output path for a given input file.
   * It returns it both absolute and relative form. It also ensures that the
   * target path exists by creating the sub-folder on demand.
   */
  private targetPathFor(filePath: string): [string, string] {
    const opts = cfg.getOptions();
    let relPath = path.relative(opts.baseDir, filePath);
    let parsed = path.parse(relPath);
    let targetPath = this.ensureOutDirExist(parsed.dir);
    let res = path.join(targetPath, parsed.name + this.getFileExt());
    return [
      res.replace(/\\/g, "/"),
      path.relative(opts.outDir, res).replace(/\\/g, "/"),
    ];
  }

  private ensureOutDirExist(subdir: string) {
    let targetPath = path.resolve(cfg.getOptions().outDir, subdir);
    if (!fs.existsSync(targetPath))
      fs.mkdirSync(targetPath, { recursive: true });
    return targetPath;
  }

  private getOutputFiles(kind: tr.SourceKind): tr.OutputFile[] {
    return Object.values(this.outputMap).filter((of) => of.sourceKind == kind);
  }
  /**
   * ### Processing TypeScript Files
   *
   * The method below constructs a map (or a dictionary) that contains the
   * source files to be processed. It skips declaration files because they
   * are outside of the project, and any files that are specified to be
   * excluded in the configuration.
   */
  private addTSFilesToOutputMap(prg: ts.Program) {
    let opts = cfg.getOptions();
    for (const source of prg.getSourceFiles()) {
      let relPath = path.relative(opts.baseDir, source.fileName);
      if (!(source.isDeclarationFile || this.excludePath(relPath))) {
        let [fullTargetPath, relTargetPath] = this.targetPathFor(
          source.fileName
        );
        this.outputMap[source.fileName] = {
          sourceKind: tr.SourceKind.typescript,
          fullTargetPath,
          relTargetPath,
          source,
        };
      }
    }
  }
  /**
   * Once the file map is created it is quite simple to just traverse through
   * it and feed the files to a translator. The block list produced is then
   * written to disk by calling the abstract `outputBlocks` method.
   */
  private scanTsFileForRegions(outFile: tr.OutputFile) {
    let translator = tr.getTranslator(
      outFile,
      this.typeChecker,
      this.outputMap
    );
    // Scan for regions without generating blocks
    translator.scanForRegions(outFile);
  }

  private processTsFileWithoutOutput(outFile: tr.OutputFile) {
    log.reportWeaverProgress(outFile);
    let translator = tr.getTranslator(
      outFile,
      this.typeChecker,
      this.outputMap
    );
    let blocks = translator.getBlocksForFile(outFile);
    // Store blocks instead of outputting immediately
    this.processedBlocks.set(outFile.fullTargetPath, { blocks, outFile });
  }

  private processTsFile(outFile: tr.OutputFile) {
    log.reportWeaverProgress(outFile);
    let translator = tr.getTranslator(
      outFile,
      this.typeChecker,
      this.outputMap
    );
    let blocks = translator.getBlocksForFile(outFile);
    this.outputBlocks(blocks, outFile);
  }
  /**
   * ### Reprocessing Changed Files
   *
   * If we are reprocessing a TypeScript file, we update the `Source` object
   * and remove the regions defined in the file before calling the
   * `processTsFile` method.
   */
  protected reprocessSourceFile(sourceFile: ts.SourceFile) {
    let fileName = sourceFile.fileName;
    let outFile = this.outputMap[fileName];
    if (!outFile) return;
    reg.Region.clear(fileName);
    outFile.source = sourceFile;
    this.processTsFile(outFile);
    this.outputFileChanged(outFile);
  }

  protected reprocessOtherFile(outputFile: tr.OutputFile) {
    this.processOtherFile(outputFile);
    this.outputFileChanged(outputFile);
  }
  /**
   * ### Processing Other Files
   *
   * To gather the other files we browse through all subdirectories in the
   * project root folder. We do this in a generator that yields each file in
   * turn.
   */
  private *getOtherFiles(dir: string): Iterable<string> {
    let opts = cfg.getOptions();
    if (dir == path.resolve(opts.outDir)) return;
    const paths = fs.readdirSync(dir);
    for (let subPath of paths) {
      let res = path.resolve(dir, subPath);
      let relPath = path.relative(opts.baseDir, res);
      if (fs.statSync(res).isDirectory()) {
        if (!this.excludePath(relPath)) yield* this.getOtherFiles(res);
      } else if (this.includePath(relPath)) yield res;
    }
  }
  /**
   * We need to determine whether a file is included or excluded based on the
   * configuration settings.
   */
  private includePath(relPath: string): boolean {
    return (
      cfg.getOptions().files.some((glob) => minimatch(relPath, glob)) &&
      !this.excludePath(relPath)
    );
  }

  private excludePath(relPath: string): boolean {
    return cfg.getOptions().exclude.some((glob) => minimatch(relPath, glob));
  }
  /**
   * The loop that processes other files is also quite simple. The contents
   * of each file is read and passed to the translator. The generated block
   * list is saved to a file by the abstract outputBlocks method.
   */
  private addOtherFilesToOutputMap() {
    let baseDir = cfg.getOptions().baseDir;
    for (let mdFile of this.getOtherFiles(path.resolve(baseDir))) {
      let [fullTargetPath, relTargetPath] = this.targetPathFor(mdFile);
      this.outputMap[mdFile] = {
        sourceKind: tr.SourceKind.other,
        fullTargetPath,
        relTargetPath,
        source: { fileName: mdFile, contents: null },
      };
    }
  }
  /**
   * There is a gotcha in the `readFileSync` function that we need to
   * take care of. The function adds whitespace at the beginning of
   * the contents string which messes up the markdown to HTML
   * transformation if we don't trim it out.
   */
  private processOtherFileWithoutOutput(outFile: tr.OutputFile) {
    log.reportWeaverProgress(outFile);
    (outFile.source as tr.OtherFile).contents = fs
      .readFileSync(outFile.source.fileName, "utf8")
      .trim();
    let translator = tr.getTranslator(outFile);
    let blocks = translator.getBlocksForFile(outFile);
    // Store blocks instead of outputting immediately
    this.processedBlocks.set(outFile.fullTargetPath, { blocks, outFile });
  }

  private processOtherFile(outFile: tr.OutputFile) {
    log.reportWeaverProgress(outFile);
    (outFile.source as tr.OtherFile).contents = fs
      .readFileSync(outFile.source.fileName, "utf8")
      .trim();
    let translator = tr.getTranslator(outFile);
    let blocks = translator.getBlocksForFile(outFile);
    this.outputBlocks(blocks, outFile);
  }
  /**
   * ### Change Events
   *
   * When a file has been changed are reweaved, this method is called.
   * Subclasses can override the method to run live reloading, etc.
   */
  protected outputFileChanged(outFile: tr.OutputFile) {}
  /**
   * This method is called when TOC file is changed.
   */
  protected tocFileChanged(tocFile: string) {}
  /**
   * ### Saving Depenency Graph
   *
   * After all the files are processed, dependency graph is saved to a file
   * designated in configuration.
   */
  private saveDependencyGraph() {
    let opts = cfg.getOptions();
    if (opts.dependencyGraph) {
      log.info(
        `Saving dependency graph to ${log.Colors.Blue}${opts.dependencyGraph}`
      );
      fs.writeFileSync(
        path.resolve(opts.outDir, opts.dependencyGraph),
        JSON.stringify(dg.getDependencyGraph(), null, 4)
      );
    }
  }
}
