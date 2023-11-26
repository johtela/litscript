export const expanded = "expanded"
export const collapsed = "collapsed"
export const accordion = "accordion"
export const hamburger = "hamburger"
export const navbar = "navbar"
export const navmenu = "navmenu"
export const contentarea = "contentarea"
export const closepopups = "closepopups"
export const infobox = "info-box"

export type Elem = HTMLElement | HTMLCollectionOf<HTMLElement>

export function elementWithId(id: string): HTMLElement | undefined {
    return document.getElementById(id)
}

export function firstElementWithClass(className: string, 
    parent: Element | Document = document): HTMLElement {
    let res = parent.getElementsByClassName(className)[0] as HTMLElement
    if (!res)
        throw ReferenceError(`Cannot find element with class "${className}".`)
    return res
}

export function elementsWithClass(className: string, 
    parent: Element | Document = document): HTMLCollectionOf<HTMLElement> {
    return parent.getElementsByClassName(className) as 
        HTMLCollectionOf<HTMLElement>
}

export function elementsWithTag<K extends keyof HTMLElementTagNameMap>(
    tagName: K, parent: Element | Document = document): 
    HTMLCollectionOf<HTMLElement> {
    return parent.getElementsByTagName(tagName) as HTMLCollectionOf<HTMLElement>
}

export function isHTMLCollection(elem: Elem):
    elem is HTMLCollectionOf<HTMLElement> {
    return (<HTMLCollectionOf<Element>>elem).length !== undefined
}

export function each(elem: Elem, action: (e: HTMLElement) => void) {
    if (isHTMLCollection(elem))
        for (let i = 0; i < elem.length; ++i)
            action(elem[i])
    else
        action(elem)
}

export function create<K extends keyof HTMLElementTagNameMap>(tag: K, 
    children: Elem | string = null): HTMLElement {
    let elem = document.createElement(tag)
    if (children) {
        if (typeof (children) === "string")
            elem.appendChild(document.createTextNode(children))
        else
            each(children, c => elem.appendChild(c))
        }
    return elem
}

export function attr(elem: Elem, attrName: string, attrValue: string): Elem {
    each(elem, e => e.setAttribute(attrName, attrValue))
    return elem
}

export function initAccordions (element: HTMLElement) {
    let accordions = element.getElementsByClassName(accordion);

    for (let i = 0; i < accordions.length; ++i) {
        let acc = accordions[i] as HTMLElement;
        let panel = acc.nextElementSibling as HTMLElement;
        let initHeight = panel.scrollHeight + "px";
        panel.style.maxHeight =  initHeight;
        acc.onclick = () => {
            acc.classList.toggle(collapsed);
            panel.style.maxHeight = panel.style.maxHeight === "0px" ? 
                initHeight :  "0px";
        }
    }
}

export function popupOnClick(element: HTMLElement, toggle: () => void,
    hide: () => void) {
    element.addEventListener("click", toggle)
    let closeElem = firstElementWithClass(closepopups)
    closeElem.addEventListener("mouseup", hide)
    document.addEventListener("keydown", e => {
        if (e.key === "Escape")
            hide()
    })
}

export function toggleClassOnClick(element: HTMLElement, cls: string,
    target: Elem = element, update?: () => void) {
    popupOnClick(element,
        () => {
            each(target, e => e.classList.toggle(cls))
            update?.()
        },
        () => {
            each(target, e => e.classList.remove(cls))
            update?.()
        })
}