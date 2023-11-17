import { current } from 'taitto/lib/anim'
import * as $ from '../../components/common'

let sections = $.elementsWithTag('section')
let currentSection = 0
updateSections()
initButtons()

function getTransform(sectionNo: number): string {
    let even = (sectionNo & 1) == 0
    let flipped = sectionNo < currentSection 
    return  even ?
        (flipped ? "rotateY(-180deg)" : "") :
        (flipped ? "translateX(-100%) rotateY(-360deg)" : "translateX(-100%) rotateY(-180deg)")
}

function updateSections(animate = false, dir = 0) {
    for (let i = 0; i < sections.length; ++i) {
        let style = sections[i].style
        style.zIndex = (100 - Math.abs(currentSection - dir - i)).toString()
        style.transform = getTransform(i)
        style.backgroundPositionX = i <= currentSection ? "0%" : "100%"
        if (animate)
            style.transition = "transform 2s ease, background-position 2s ease"
    }
}

function initButtons() {
    $.elementWithId("prev-button").onclick = e => {
        if (currentSection > 1) {
            currentSection -= 2
            updateSections(true)
        }
    }
    $.elementWithId("next-button").onclick = e => {
        if (currentSection < sections.length - 1) {
            currentSection += 2
            updateSections(true, 2)
        }
    }
}