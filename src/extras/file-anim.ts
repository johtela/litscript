import * as sc from './scene'
import './file-anim.css'

export class FileAnim extends HTMLElement {
    private body: HTMLElement
    private scene: sc.Scene
    
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' })
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '/dist/file-anim.css')
        shadow.appendChild(link)
        this.body = document.createElement('div')
        shadow.appendChild(this.body)
    }

    connectedCallback() {
        if (this.scene)
            return
        this.scene = new sc.Scene(this.body)
        setTimeout(() => this.playAnimations(), 1000)
    }

    async playAnimations() {
        while (true) {
            this.scene.setup()
            await this.scene.openBaseFolder.play()
            await this.scene.addLitsConfig.play()
            await this.scene.openTerminal.play()
            await this.scene.processFiles.play()
            this.scene.teardown()
        }
    }   
}

customElements.define('file-anim', FileAnim)
