import * as $ from "../../components/common"

const id = "tooltip"

document.querySelectorAll('[data-toggle="tooltip"]').forEach(elem => 
    tooltip(elem as HTMLElement, elem.getAttribute("data-title")))

export function tooltip(elem: HTMLElement, text: string) {
    elem.addEventListener('mouseenter', () => showTooltip(elem, text))
    elem.addEventListener('mouseleave', hideTooltip)
}

function showTooltip(elem: HTMLElement, contents?: string) {
    hideTooltip()
    if (!contents)
        return
    let tt = $.create('legend')
    document.body.appendChild(tt)
    tt.id = id
    tt.innerHTML = contents.replace(/=>/g, "⇒")
    let bb = elem.getBoundingClientRect()
    tt.style.left = `${Math.round(bb.left) + window.scrollX}px`
    tt.style.top = `${Math.round(bb.top) + window.scrollY}px`
    tt.style.opacity = "95%"
}

function hideTooltip() {
    let tt = document.getElementById(id)
    if (tt)
        tt.remove()
}