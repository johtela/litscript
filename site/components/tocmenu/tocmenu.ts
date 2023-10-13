import * as $ from "../../components/common"

let tocmenu = $.elementsWithStyle("tocmenu")[0] as HTMLElement
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        initAccordions(tocmenu)
    else
        document.fonts.onloadingdone = () => initAccordions(tocmenu)
}

export function initAccordions (element: HTMLElement) {
    let accordions = element.getElementsByClassName($.accordion);

    for (let i = 0; i < accordions.length; ++i) {
        let acc = accordions[i] as HTMLElement;
        let panel = acc.nextElementSibling as HTMLElement;
        panel.style.maxHeight = panel.scrollHeight + "px"
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            let closed = panel.style.maxHeight == "0px"
            panel.style.maxHeight = closed ?
                panel.scrollHeight + "px" :  "0px";
            if (closed) {
                let parent = parentPanel(acc)
                while (parent) {
                    parent.style.maxHeight = 
                        (parent.scrollHeight + panel.scrollHeight) + "px";
                    parent = parentPanel(parent)
                }
            }
        }
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