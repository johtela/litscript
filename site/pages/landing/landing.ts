import { initializeTheme } from "../../styles/theming"
import * as $ from '../../components/common'

initializeTheme()
let sections = $.elementsWithTag('section')
let currentSection = 0
updateSections()
initButtons()

function getTransform(sectionNo: number): string {
    let even = (sectionNo & 1) == 0
    let flipped = sectionNo < currentSection 
    return even ?
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
            style.transition = "transform 1s ease, background-position 1s ease, left 1s ease"
        if (currentSection >= sections.length) 
            style.left = "70%" 
        else if (currentSection > 0)
            style.left = "50%" 
        else
            style.left = ""
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