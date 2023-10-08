import * as $ from "../../components/common";

// Set up responsive menu.
let navbar = $.elementWithId($.navbar);
let hamb = $.firstElementWithStyle($.hamburger, navbar);
let hidden = false;
$.toggleClassOnClick(hamb, $.expanded, navbar);

// Hide navbar when scrolling down.
let prevScroll = window.scrollY;
window.addEventListener("scroll", () => {
    var currScroll = window.scrollY;
    setNavbarOffset(prevScroll > currScroll ? 0 : -navbar.offsetHeight + 1); 
    prevScroll = currScroll;
});
navbar.addEventListener("mouseenter", () => {
    if (hidden)
        setNavbarOffset(0);
});

function setNavbarOffset(offs: number) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        navbar.style.top = `${offs}px`;
        navbar.style.opacity = hidden ? "0" : "1";
    }
}

