import * as $ from "../../components/common"

let tocmenu = $.firstElementWithClass("tocmenu")
if (tocmenu) {
    setTimeout(initAccordions, 1000)
}

export function initAccordions () {
    $.each($.elementsWithClass($.accordion, tocmenu), acc =>
    {
        let panel = acc.nextElementSibling as HTMLElement
        openPanel(acc, panel)
        acc.onclick = () => {
            acc.classList.toggle($.collapsed)
            togglePanel(acc, panel)
        }
    })
    tocmenu.querySelector('.highlight')?.scrollIntoView({ 
        block: "nearest", behavior: "smooth" })
}

function openPanel(acc: HTMLElement, panel: HTMLElement) {
    let closed = panelClosed(panel);
    panel.style.maxHeight = panel.scrollHeight + "px" 
    if (closed)
        resizeParents(acc, panel)
}

function togglePanel(acc: HTMLElement, panel: HTMLElement) {
    let closed = panelClosed(panel)
    panel.style.maxHeight = closed ?
        panel.scrollHeight + "px" :  "0px"
    if (closed)
        resizeParents(acc, panel)
}

function panelClosed(panel: HTMLElement): boolean {
    return panel.style.maxHeight == "0px"
}

function resizeParents(acc: HTMLElement, panel: HTMLElement) {
    let parent = parentPanel(acc);
    while (parent) {
        parent.style.maxHeight =
            (parent.scrollHeight + panel.scrollHeight) + "px";
        parent = parentPanel(parent);
    }
}

function parentPanel(acc: HTMLElement): HTMLElement | null {
    let elem = acc.parentElement
    while (elem && elem.tagName == "UL" || elem.tagName == "LI") {
        if (elem.tagName == "UL" && 
            elem.previousElementSibling.classList.contains($.accordion))
            return elem
        elem = elem.parentElement
    }
    return null
}