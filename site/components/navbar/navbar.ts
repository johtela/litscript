import "./navbar.less";
import * as $ from "../common/myquery";
import { toggleClassOnClick } from "../../components/common/popups";

// Set up responsive menu.
let navbar = $.firstElementWithStyle($.navbar);
let hamb = $.firstElementWithStyle($.hamburger, navbar);
let hidden = false;
toggleClassOnClick(hamb, $.expanded, navbar);

// Hide navbar when scrolling down.
let dockedTop = navbar.offsetTop === 0;
let prevScroll = window.pageYOffset;
window.addEventListener("scroll", () => {
    var currScroll = window.pageYOffset;
    setNavbarOffset(dockedTop, 
        prevScroll > currScroll ? 0 : -(navbar.offsetHeight - (dockedTop ? 1 : 2))); 
    prevScroll = currScroll;
});
navbar.addEventListener("mouseenter", () => {
    if (hidden)
        setNavbarOffset(dockedTop, 0);
});

function setNavbarOffset(dockedTop: boolean, offs: number) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        if (dockedTop)
            navbar.style.top = `${offs}px`;
        else
            navbar.style.bottom = `${offs}px`;
        navbar.style.opacity = hidden ? "0" : "1";
    }
}

