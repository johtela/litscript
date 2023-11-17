import * as $ from "../../components/common"
import { initAccordions } from "../../components/tocmenu/tocmenu"
import { initializeTheme } from "../../styles/theming"

initializeTheme()
const tocbutton = $.elementsWithClass("toc-button")[0] as HTMLElement
const layout = $.elementsWithClass("layout")[0] as HTMLElement
const contentarea = $.elementsWithClass("contentarea")[0] as HTMLElement
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