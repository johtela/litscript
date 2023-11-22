/**
 * # Dynamic Content with Web Components
 * 
 * Visualizers are removed in LiTScript version 2. The recommended alternative
 * is to use [web components][] as a substitute. They can be inserted to 
 * markdown as easily and have other benefits:
* 
 *   *  [Shadow DOM][] isolates styles from the parent document. This prevents 
 *      CSS rules from spilling into the main page.
 * 
 *   *  You don't have to register your components with LiTScript. The web
 *      component API handles that.
 * 
 *   *  It's simpler to add parameters to the components using HTML attributes.
 * 
 *   *  You can use JS frameworks such as [Lit][] to create your components.
 * 
 * To help write web components in LiTScript, we provide a base class for custom
 * elements. It handles attaching the shadow DOM and loading styles into the
 * component. Below is an example how you can use it:
 * ```typescript
 *  // Import root style file. LiTScript will bundle this into file: 
 *  // ${outDir}/dist/my-styles.css
 *  import "my-styles.css"
 * 
 *  export abstract class MyElement extends CustomElement {
 *      constructor() {
 *          // Give the name of the root CSS file as argument to the inherited
 *          // constructor. The base class will insert a <link> tag inside the 
 *          // component that loads the styles.
 *          super("my-styles")
 *          // Initialize your component here. Add your elements under the 
 *          // inherited body element.
 *      }
 * 
 *      protected override connect() {
 *          // Called when the element is attached to the DOM. Call code that
 *          // you want to perform here.
 *      }
 *  }
 *  // Register your custom element.
 *  customElements.define("my-element", MyElement)
 * ```
 * 
 * Now you can import your component in the [front matter][] of any other file
 * and insert it at any location.
 * ```json
 * ---
 * { "modules": [ "path/to/my-element" ] }
 * ---
 * 
 * # Here is My Component
 * 
 * <my-element />
 * ```
 * 
 * [web components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
 * [Shadow DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
 * [front matter]: templates/front-matter.html
 * [Lit]: https://lit.dev/
 * 
 * ## CustomElement Class
 * 
 * The base class for custom elements extends HTMLElement DOM class and adds
 * a `body` element that is the root for your own UI.
 */
export abstract class CustomElement extends HTMLElement {
    protected body: HTMLElement
    /**
     * The flag that tells whether the component has been attached to DOM.
     */    
    private connected: boolean
    /**
     * Constructor attaches the shadow DOM and creates `<link>` tag under it
     * that refers to the CSS file. Then it creates the `body` div under the
     * shadow root.You can add your own elements under it.
     */
    constructor(cssRoot: string) {
        super();
        let shadow = this.attachShadow({ mode: 'open' })
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', `/dist/${cssRoot}.css`)
        shadow.appendChild(link)
        this.body = document.createElement('div')
        shadow.appendChild(this.body)
        this.connected = false
    }
    /**
     * This method is called when the component is attached to DOM. It checks
     * whether we have already connected our functionality. If not we call the
     * abstract `connect` method and set the `connected` flag.
     */
    connectedCallback() {
        if (!this.connected) {
            this.connect()
            this.connected = true
        }
    }
    /**
     * Override this method to run code when the component is connected.
     */
    protected abstract connect()
}
