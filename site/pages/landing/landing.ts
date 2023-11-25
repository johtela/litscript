import { initializeTheme } from "../../styles/theming"
import * as $ from '../../components/common'

initializeTheme()
let sections = $.elementsWithTag('section')
let currentSection = 0
let prevButton = $.elementWithId("prev-button") as HTMLAnchorElement
let nextButton = $.elementWithId("next-button") as HTMLAnchorElement

updateSections()
initNavigation()
moveToPageInUrl()

function getTransform(sectionNo: number, curr: number): string {
    let even = (sectionNo & 1) == 0
    let flipped = sectionNo < curr 
    return even ?
        (flipped ? "rotateY(-180deg)" : "") :
        (flipped ? "translateX(-100%) rotateY(-360deg)" : "translateX(-100%) rotateY(-180deg)")
}

function updateSections(animate = false, dir = 0) {
    let smallScr = smallScreen()
    if (!smallScr) 
        currentSection &= ~1
    let curr = (currentSection + 1) & ~1
    for (let i = 0; i < sections.length; ++i) {
        let style = sections[i].style
        style.zIndex = (100 - Math.abs(curr - dir - i)).toString()
        style.transform = getTransform(i, curr)
        style.backgroundPositionX = i <= curr ? "0%" : "100%"
        if (animate)
            style.transition = "transform 1s ease, background-position 1s ease, left 1s ease"
        if (curr >= sections.length) 
            style.left = smallScr? "95%" : "75%" 
        else if (curr > 0)
            style.left = smallScr ? 
                ((currentSection & 1) == 0 ? "5%" : "95%") : 
                "50%"
        else
            style.left = ""
    }
}

function smallScreen() {
    return getComputedStyle(document.body)
        .getPropertyValue("--screen-size") == "small"
}

function updateButtonStates() {
    if (currentSection <= 0)
        prevButton.classList.add("disabled")
    else
        prevButton.classList.remove("disabled")
    if (currentSection >= sections.length - 1)
        nextButton.classList.add("disabled")
    else
        nextButton.classList.remove("disabled")
}

function pushToPageHistory() {
    window.history.pushState(currentSection, "Page " + currentSection, 
        "#" + currentSection)
    document.title = "LiTScript - Home - Page " + currentSection
}

function moveToPageInUrl() {
    let prevCurrent = currentSection
    currentSection = Number.parseInt(window.location.hash.substring(1)) || 0
    if (prevCurrent != currentSection)
        updateSections(true, currentSection > prevCurrent ? 2 : 0)
    updateButtonStates()
}

function moveToPreviousPage(e: Event) {
    if (currentSection > 0) {
        currentSection -= smallScreen() ? 1 : 2
        updateSections(true)
        pushToPageHistory()
    }
    e.preventDefault()
    updateButtonStates()
}

function moveToNextPage(e: Event) {
    if (currentSection < (sections.length - 1)) {
        currentSection += smallScreen() ? 1 : 2
        updateSections(true, 2)
        pushToPageHistory()
    }
    e.preventDefault()
    updateButtonStates()
}

function initNavigation() {
    prevButton.onclick = moveToPreviousPage
    nextButton.onclick = moveToNextPage
    document.body.addEventListener('keydown', e => {
        if (e.key =="ArrowLeft")
            moveToPreviousPage(e)
        else if (e.key == "ArrowRight")
            moveToNextPage(e)
    })
    window.addEventListener('popstate', moveToPageInUrl)
}