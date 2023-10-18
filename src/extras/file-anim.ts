import * as scene from './scene'
import './file-anim.less'

async function playAnimations(sc: scene.Scene) {
    while (true) {
        sc.setup()
        await sc.openBaseFolder.play()
        await sc.addLitsConfig.play()
        await sc.openTerminal.play()
        await sc.processFiles.play()
        sc.teardown()
    }
}