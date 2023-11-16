import * as $ from '../../components/common'

let sections = $.elementsWithTag('section')
let currentSection = 0
initSections()

function getTransform(sectionNo: number): string {
    let even = (sectionNo & 1) == 0
    let flipped = sectionNo < currentSection 
    return  even ?
        (flipped ? "rotateY(-180deg)" : "") :
        (flipped ? "translateX(-100%)" : "translateX(100%) rotateY(-180deg)")
}

export function initSections() {
    for (let i = 0; i < sections.length; ++i) {
        let style = sections[i].style
        style.zIndex = (100 - i).toString()
        style.transform = getTransform(i)
    }
}
