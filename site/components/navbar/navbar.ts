import * as $ from "../../components/common"

// Set up responsive menu.
let navbar = $.elementWithId($.navbar)
let navmenu = $.firstElementWithStyle($.navmenu, navbar)
let hamb = $.firstElementWithStyle($.hamburger, navbar)
let hidden = false
$.toggleClassOnClick(hamb, $.expanded, navbar, resizeNavbar)
resizeNavbar()
hookToggleEvents()

// Hide navbar when scrolling down.
let prevScroll = window.scrollY;
window.addEventListener("scroll", () => {
    var currScroll = window.scrollY
    setNavbarOffset(prevScroll > currScroll ? 0 : -navbar.offsetHeight + 1)
    prevScroll = currScroll
});
navbar.addEventListener("mouseenter", () => {
    if (hidden)
        setNavbarOffset(0)
});

function setNavbarOffset(offs: number) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        navbar.style.top = `${offs}px`
    }
}

function resizeNavbar() {
    navbar.style.height = navmenu.scrollHeight + "px"
}

function hookToggleEvents() {
    $.each($.elementsWithStyle("toggle", navmenu), menu => 
        $.each($.elementsWithStyle("navitem", menu), item =>
            item.addEventListener("click", ev => 
                toggle(menu, ev.currentTarget as HTMLElement))))
}

function toggle(menu: HTMLElement, clicked: HTMLElement) {
    $.each($.elementsWithStyle("navitem", menu), item =>
        item.classList.remove("active"))
    clicked.classList.add("active")
}