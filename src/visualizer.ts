/**
 * # Adding Dynamic Content to HTML Pages
 * 
 * LiTScript is conceptually a static site generator. It takes a set of input
 * files and converts them to static HTML pages. To add interactive and dynamic 
 * content on these pages you can write _visualizers_, which are basically 
 * JavaScript functions that modify the DOM.
 * 
 * The signature of the Visualizer is rather simple. It gets an optional
 * input string and a parent element as an argument. It can add new elements
 * under the parent, or do any other changes. 
 */
export type Visualizer = (input: string, parent: HTMLElement) => void
/**
 * The input string is specified by the user calling the visualizer from 
 * markdown. You can embed a visualizer in markdown using a format similar to a
 * region expander:
 * <pre><code>&lt;&lt;v:name input&gt;&gt;</code></pre>
 * The name of a visualizer has to be unique, so we can manage them in a 
 * dictionary. To make the parsing of a visualizer call simpler, whitespace 
 * is not allowed in the name. The input string following the name can contain 
 * spaces or tabs. 
 */
interface VisualizerMap {
    [name: string]: Visualizer
}
const visualizers: VisualizerMap = {}
/**
 * ## Registering Visualizers
 * 
 * Before you can use a visualizer you need to register it using the function
 * below. Another step that is required is to specify the file where the
 * visualizer resides in the `codeFile` setting of the front matter. The code
 * file can import other modules and it might be written in JavaScript or
 * TypeScript. The bundler transpiles TS modules to JS and packs them to a 
 * single file.
 */
export function registerVisualizer(name: string, visual: Visualizer) {
    if (name.match(/\s/))
        throw SyntaxError(`Visualizer name "${name}" contains whitespace.`)
    visualizers[name] = visual
}
/**
 * ## Creating Visualizers
 * 
 * It is possible to create your visualizers from scratch by defining a 
 * function that implements the signature defined above. However, usually
 * it is easier to use some of the helper functions defined below.
 * 
 * The first helper creates a new HTML elemenent and places it under the
 * parent element. You can specify the type of the element, its attributes,
 * and a function that returns the content inside the element. The content
 * is assumed to contain a valid HTML string.
 */
export function html<K extends keyof HTMLElementTagNameMap>(
    render: (input: string) => string, tag: K, attrs: object): Visualizer {
    return (input, parent) => {
        let res = document.createElement(tag)
        for (let attr in attrs)
            if (attrs.hasOwnProperty(attr))
                res.setAttribute(attr, attrs[attr])
        res.innerHTML = render(input)
        parent.appendChild(res)
    }
}
/**
 * Armed with the `html` function we can define more helpers that output
 * the result of a function in a specific element with a specific style.
 * The first one shows the result inside a `<pre>` tag which is styled
 * as console ouput.
 */
export function console(output: (input: string) => string): Visualizer {
    return html(output, 'pre', { class: "console" })
}
/**
 * The second function shows a styled error message. The style used here
 * is defined in the default template. It is possible also to import your
 * own style sheets (Less or CSS) in the code files you include. They are
 * separated, compiled and packed by the bundler.
 */
export function error(message: string): Visualizer {
    return html(_ => message, 'div', { class: "error" })
}
/**
 * ## Running Visualizers
 * 
 * The `runVisualizer` function is exported as a property of the `window` 
 * object. It runs the named visualizer with the given parameters. LiTScript
 * generates code that calls this function from a HTML page. 
 */
async function runVisualizer(name: string, params: string, parentId: string) {
    let parent = document.getElementById(parentId)
    if (!parent)
        throw Error(`Visualizer parent id "${parentId}" not found.`)
    let visualize = visualizers[name] ||
        error(`Visualizer "${name}" is not registered.`)
    try {
        await visualize(params, parent)
    }
    catch (e) {
        error(`Exception thrown by visualizer "${name}".<BR/>
        ${e.toString()}`)("", parent)
    }
}

if (typeof window !== 'undefined')
    window["runVisualizer"] = runVisualizer