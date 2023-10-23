import * as $ from "../../components/common"

// Set up responsive menu.
let navbar = $.elementWithId($.navbar)
let navmenu = $.firstElementWithStyle($.navmenu, navbar)
let hamb = $.firstElementWithStyle($.hamburger, navbar)
let contentarea = $.firstElementWithStyle($.contentarea, document.body)
let hidden = false
$.toggleClassOnClick(hamb, $.expanded, navbar, resizeNavbar)
resizeNavbar()

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

window["syntaxHighlight"] = (name: string) => {
    if (contentarea)
        contentarea.setAttribute("data-syntax-highlight", name)
}