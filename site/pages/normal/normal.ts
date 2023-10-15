import * as $ from "../../components/common"
import { initAccordions } from "../../components/tocmenu/tocmenu"

const tocbutton = $.elementsWithStyle("toc-button")[0] as HTMLElement
const layout = $.elementsWithStyle("layout")[0] as HTMLElement
const contentarea = $.elementsWithStyle("contentarea")[0] as HTMLElement
const tocopen = "toc-open"

tocbutton.onmousedown = () => {
    layout.classList.add(tocopen)
    layout.ontransitionend = () => {
        initAccordions()
        layout.ontransitionend = null
    }
}
contentarea.addEventListener("mousedown", () => {
    layout.classList.remove(tocopen)
}, { capture: true })