import * as vis from '../visualizer'
import * as scene from './scene'
import * as dd from './dependency-diag'
import './extras.less'

vis.registerVisualizer("hello", vis.console(name => `Hello ${name}!`))

vis.registerVisualizer("dependency-diag", dd.createDiagram)

vis.registerVisualizer("filediagram", (input: string, parent: HTMLElement) =>
    playAnimations(new scene.Scene(parent)))

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