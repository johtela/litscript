export abstract class CustomElement extends HTMLElement {
    protected body: HTMLElement
    private connected: boolean
    
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

    connectedCallback() {
        if (!this.connected) {
            this.connect()
            this.connected = true
        }
    }

    protected abstract connect()
}
