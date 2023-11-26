import { StyledElement } from '../custom-elem'
import * as sc from './scene'
import './file-anim.css'

export class FileAnim extends StyledElement {
    private scene: sc.Scene
    
    constructor() {
        super("file-anim")
    }

    connect() {
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
