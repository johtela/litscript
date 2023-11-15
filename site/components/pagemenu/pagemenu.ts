import * as $ from "../../components/common"

let pagemenu = $.elementsWithClass("pagemenu")[0]
if (pagemenu) {
    let headingOffsets: { heading: HTMLElement, link: HTMLElement }[] = []
    let contentarea = $.firstElementWithClass("contentarea")
    let pagetree = $.firstElementWithClass("pagetree", pagemenu)
    let headings = contentarea.querySelectorAll("h1, h2, h3, h4, h5")
    buildTree(pagetree, null, 1, headings, 0)
    window.addEventListener("scroll", () => {
        let pos = window.scrollY
        let found = false
        let prev: { heading: HTMLElement, link: HTMLElement } = null
        for (let i = 0; i < headingOffsets.length; i++) {
            let ho = headingOffsets[i]
            ho.link.classList.remove("highlight")
            if (!found && ho.heading.offsetTop > (pos + ho.heading.offsetHeight)) {
                (prev || ho).link.classList.add("highlight")
                found = true
            }
            prev = ho
        }
        if (!found && prev)
            prev.link.classList.add("highlight")
    })

    function buildTree(parentList: HTMLElement, prevItem: HTMLElement, 
        level: number, headings: NodeListOf<Element>, index: number) {
        while (index < headings.length) {
            let heading = headings[index] as HTMLElement
            let currLevel = parseInt(heading.tagName.substring(1))
            if (currLevel < level)
                return index
            if (currLevel > level) {
                if (prevItem) {
                    let subList = document.createElement("ul")
                    prevItem.appendChild(subList)
                    index = buildTree(subList, null, currLevel, headings, index)
                }
                else
                    index = buildTree(parentList, null, currLevel, headings, 
                        index)
            }
            else {
                let link = $.attr($.create("a", heading.textContent), "href", 
                    "#" + heading.id) as HTMLElement
                let listItem = $.create("li", link)
                parentList.appendChild(listItem)
                headingOffsets[index] = { heading, link }
                index = buildTree(parentList, listItem, level, headings, 
                    index + 1)
            }
        }
        return index
    }
}