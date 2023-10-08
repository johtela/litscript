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
        let initHeight = panel.scrollHeight + "px";
        panel.style.maxHeight =  initHeight;
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            panel.style.maxHeight = panel.style.maxHeight === "0px" ? 
                initHeight :  "0px";
        }
    }
}