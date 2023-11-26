/**
 * ---
 * { 
 *  "modules": [
 *      "lits-extras"
 *  ]
 * }
 * ---
 * # Creating Module Dependency Graph
 * 
 * As a side product LiTScript can produce a JSON file that represents the 
 * module dependency graph. It contains all the modules in the project and 
 * their dependencies. A dependency arises when a module imports or exports 
 * another.
 * 
 * This information can be used to generate diagrams or dictionaries that help
 * understanding the project structure. LiTScript by itself does not use the
 * dependency file, but there is a web component in the extras folder that 
 * serves as an example how it can be utilized.
 * 
 * <dependency-diagram url="../dependencies.json" filter="src\/(?!extras)">
 * </dependency-diagram>
 * 
 * ## Data Structure
 * 
 * The main data element of the dependency graph is the module, which is 
 * defined below.
 */
export interface Module {
    /**
     * The `url` property refers to the documentation file generated from the 
     * module. This property can also be missing, if the module is defined
     * outside the project or is omitted from the documentation.
     */
    url: string
    /**
     * Dependencies to other modules are listed here. The following array 
     * contains names of the modules that are imported in this module.
     */
    dependencies: string[]
}
/**
 * The graph itself is just an object which properties are module names.
 * Module name is its source file name including the relative folder path. The 
 * root of the path is the project base directory. The module name must be 
 * unique, it serves also as a key that identifies the module.
*/
export interface DependencyGraph {
    [name: string]: Module
}
/**
 * Both data structures are stored in global variables. The dependency graph 
 * can be retrieved using the getter function.
 */
var dependencyGraph: DependencyGraph = {}

export function getDependencyGraph() {
    return dependencyGraph
}
/**
 * ## Updating the Graph
 * 
 * To unify the module names we change backslash characters in the module path
 * to forward slashes and remove the file extension.
 */
function normalizeName(name: string) {
    return name.replace(/\\/g, "/",).replace(/\.[j|t]s$/, "")
}
/**
 * ### Adding a Module
 * 
 * Before adding a new module to the graph we check if the module is already
 * there. If so, we only update the url property, if it is given.
 */
export function addModule(name: string, url?: string): Module {
    name = normalizeName(name)
    let res = dependencyGraph[name]
    if (!res) {
        res = { url, dependencies: [] }
        dependencyGraph[name] = res
    }
    if (url)
        res.url = url
    return res
}
/**
 * ### Adding a Dependency
 * 
 * We do duplicate checking also before adding a dependency.
 */
export function addDependency(module: Module, dependency: string) {
    let name = normalizeName(dependency)
    if (!module.dependencies.includes(name))
        module.dependencies.push(name)
}
/**
 * ###  Get Transitive Dependencies
 * 
 * We can obtain the transitive dependencies of a module by recursively 
 * traversing the dependency graph. The method returns a subgraph of modules 
 * that depend on the given module.
 */
export function allDependencies(moduleName: string): DependencyGraph {
    let res: DependencyGraph = {}
    let mod = dependencyGraph[moduleName]
    if (mod)
        addDeps(mod)
    return res

    function addDeps(module: Module) {
        for (let i = 0; i < module.dependencies.length; ++i) {
            let depName = module.dependencies[i]
            if (!res[depName]) {
                let dep = dependencyGraph[depName]
                res[depName] = dep
                addDeps(dep)
            }
        }
    }
}