import * as $ from "../../components/common"
import { initAccordions } from "../../components/tocmenu/tocmenu"
import { activateItem } from "../../components/navbar/navbar"

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

function setSyntax(name: string) {
    document.body.setAttribute("data-syntax-highlight", name)
    let menuItem = $.elementWithId(name)   
    if (menuItem)
        activateItem(menuItem)
}

document.body["syntaxHighlight"] = setSyntax
let sh = window.localStorage.getItem("syntaxHighlight")
if (sh)
    setSyntax(sh)

