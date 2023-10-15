import * as $ from "../../components/common"

let tocmenu = $.elementsWithStyle("tocmenu")[0] as HTMLElement
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        initAccordions()
    else
        document.fonts.onloadingdone = () => initAccordions()
}

export function initAccordions () {
    let accordions = tocmenu.getElementsByClassName($.accordion);

    for (let i = accordions.length - 1; i >= 0; --i) {
        let acc = accordions[i] as HTMLElement;
        let panel = acc.nextElementSibling as HTMLElement;
        if (panelClosed(panel)) {
            panel.style.maxHeight = panel.scrollHeight + "px"
            resizeParents(acc, panel)
        }
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            let closed = panelClosed(panel)
            panel.style.maxHeight = closed ?
                panel.scrollHeight + "px" :  "0px";
            if (closed) {
                resizeParents(acc, panel);
            }
        }
    }
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