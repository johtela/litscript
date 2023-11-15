import * as $ from "../../components/common"
import { initAccordions } from "../../components/tocmenu/tocmenu"
import { activateItem } from "../../components/navbar/navbar"

const tocbutton = $.elementsWithClass("toc-button")[0] as HTMLElement
const layout = $.elementsWithClass("layout")[0] as HTMLElement
const contentarea = $.elementsWithClass("contentarea")[0] as HTMLElement
const tocopen = "toc-open"
const syntaxKey = "syntaxHighlight"
const themeKey = "theme"

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
        activateItem(menuItem, syntaxKey)
}

function setTheme(name: string) {
    document.body.setAttribute("data-theme", name)
    let menuItem = $.elementWithId(name)   
    if (menuItem)
        activateItem(menuItem, themeKey)
}

document.body["syntaxHighlight"] = setSyntax
let sh = window.localStorage.getItem(syntaxKey)
if (sh)
    setSyntax(sh)

document.body["theme"] = setTheme
let th = window.localStorage.getItem(themeKey)
if (th)
    setTheme(th)
    
    