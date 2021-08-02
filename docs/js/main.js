/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../lits-template/components/contentarea/contentarea.less":
/*!****************************************************************!*\
  !*** ../lits-template/components/contentarea/contentarea.less ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/footer/footer.less":
/*!******************************************************!*\
  !*** ../lits-template/components/footer/footer.less ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/hamburger/hamburger.less":
/*!************************************************************!*\
  !*** ../lits-template/components/hamburger/hamburger.less ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/landing.less":
/*!************************************************!*\
  !*** ../lits-template/components/landing.less ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/layout/layout.less":
/*!******************************************************!*\
  !*** ../lits-template/components/layout/layout.less ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/main.less":
/*!*********************************************!*\
  !*** ../lits-template/components/main.less ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/navbar/navbar.less":
/*!******************************************************!*\
  !*** ../lits-template/components/navbar/navbar.less ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/pagemenu/pagemenu.less":
/*!**********************************************************!*\
  !*** ../lits-template/components/pagemenu/pagemenu.less ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/syntax/son-of-obsidian.less":
/*!***************************************************************!*\
  !*** ../lits-template/components/syntax/son-of-obsidian.less ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/tocmenu/tocmenu.less":
/*!********************************************************!*\
  !*** ../lits-template/components/tocmenu/tocmenu.less ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/tooltips/tooltips.less":
/*!**********************************************************!*\
  !*** ../lits-template/components/tooltips/tooltips.less ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../lits-template/components/common/accordion.ts":
/*!*******************************************************!*\
  !*** ../lits-template/components/common/accordion.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initAccordions = void 0;
const $ = __webpack_require__(/*! ./myquery */ "../lits-template/components/common/myquery.ts");
function initAccordions(element) {
    let accordions = element.getElementsByClassName($.accordion);
    for (let i = 0; i < accordions.length; ++i) {
        let acc = accordions[i];
        let panel = acc.nextElementSibling;
        let initHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = initHeight;
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            panel.style.maxHeight = panel.style.maxHeight === "0px" ?
                initHeight : "0px";
        };
    }
}
exports.initAccordions = initAccordions;


/***/ }),

/***/ "../lits-template/components/common/myquery.ts":
/*!*****************************************************!*\
  !*** ../lits-template/components/common/myquery.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attr = exports.create = exports.each = exports.isHTMLCollection = exports.elementsWithStyle = exports.firstElementWithStyle = exports.infobox = exports.closepopups = exports.scrollingarea = exports.navbar = exports.hamburger = exports.accordion = exports.collapsed = exports.expanded = void 0;
exports.expanded = "expanded";
exports.collapsed = "collapsed";
exports.accordion = "accordion";
exports.hamburger = "hamburger";
exports.navbar = "navbar";
exports.scrollingarea = "scrollingarea";
exports.closepopups = "closepopups";
exports.infobox = "info-box";
function firstElementWithStyle(className, parent = document) {
    let res = parent.getElementsByClassName(className)[0];
    if (!res)
        throw ReferenceError(`Cannot find element with class "${className}".`);
    return res;
}
exports.firstElementWithStyle = firstElementWithStyle;
function elementsWithStyle(className, parent = document) {
    return parent.getElementsByClassName(className);
}
exports.elementsWithStyle = elementsWithStyle;
function isHTMLCollection(elem) {
    return elem.length !== undefined;
}
exports.isHTMLCollection = isHTMLCollection;
function each(elem, action) {
    if (isHTMLCollection(elem))
        for (let i = 0; i < elem.length; ++i)
            action(elem[i]);
    else
        action(elem);
}
exports.each = each;
function create(tag, children = null) {
    let elem = document.createElement(tag);
    if (children) {
        if (typeof (children) === "string")
            elem.appendChild(document.createTextNode(children));
        else
            each(children, c => elem.appendChild(c));
    }
    return elem;
}
exports.create = create;
function attr(elem, attrName, attrValue) {
    each(elem, e => e.setAttribute(attrName, attrValue));
    return elem;
}
exports.attr = attr;


/***/ }),

/***/ "../lits-template/components/common/popups.ts":
/*!****************************************************!*\
  !*** ../lits-template/components/common/popups.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toggleClassOnClick = exports.popupOnClick = void 0;
const $ = __webpack_require__(/*! ./myquery */ "../lits-template/components/common/myquery.ts");
let closepopups = $.firstElementWithStyle($.closepopups);
function popupOnClick(element, toggle, hide) {
    element.addEventListener("click", toggle);
    closepopups.addEventListener("mouseup", hide);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape")
            hide();
    });
}
exports.popupOnClick = popupOnClick;
function toggleClassOnClick(element, cls, target = element) {
    popupOnClick(element, () => $.each(target, e => e.classList.toggle(cls)), () => $.each(target, e => e.classList.remove(cls)));
}
exports.toggleClassOnClick = toggleClassOnClick;


/***/ }),

/***/ "../lits-template/components/contentarea/contentarea.ts":
/*!**************************************************************!*\
  !*** ../lits-template/components/contentarea/contentarea.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./contentarea.less */ "../lits-template/components/contentarea/contentarea.less");
__webpack_require__(/*! syntaxhighlight */ "../lits-template/components/syntax/son-of-obsidian.less");


/***/ }),

/***/ "../lits-template/components/footer/footer.ts":
/*!****************************************************!*\
  !*** ../lits-template/components/footer/footer.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./footer.less */ "../lits-template/components/footer/footer.less");


/***/ }),

/***/ "../lits-template/components/hamburger/hamburger.ts":
/*!**********************************************************!*\
  !*** ../lits-template/components/hamburger/hamburger.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./hamburger.less */ "../lits-template/components/hamburger/hamburger.less");
const $ = __webpack_require__(/*! ../../components/common/myquery */ "../lits-template/components/common/myquery.ts");
const popups_1 = __webpack_require__(/*! ../../components/common/popups */ "../lits-template/components/common/popups.ts");
$.each($.elementsWithStyle("hamburger"), hamb => popups_1.toggleClassOnClick(hamb, "open"));


/***/ }),

/***/ "../lits-template/components/landing.ts":
/*!**********************************************!*\
  !*** ../lits-template/components/landing.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./landing.less */ "../lits-template/components/landing.less");
const $ = __webpack_require__(/*! ./common/myquery */ "../lits-template/components/common/myquery.ts");
revealInfoBoxes();
createInfoMenu();
function revealInfoBoxes() {
    let arrows = $.elementsWithStyle("scroll-indicator");
    if (!arrows || arrows.length != 2)
        return;
    let arrowUp = arrows[0];
    let arrowDown = arrows[1];
    window.addEventListener("scroll", setBoxOpacities);
    window.addEventListener("resize", setBoxOpacities);
    setBoxOpacities();
    function setBoxOpacities() {
        arrowUp.style.opacity = "0";
        arrowDown.style.opacity = "0";
        for (let ib of $.elementsWithStyle('info-box')) {
            let hib = ib;
            let scrtop = window.pageYOffset;
            let scrbot = window.pageYOffset + window.innerHeight;
            let marginFactor = 6;
            let top = hib.offsetTop;
            let bot = top + hib.offsetHeight;
            let margin = window.innerHeight / marginFactor;
            if (scrtop == 0) {
                hib.style.opacity = "0";
                arrowDown.style.opacity = "1";
            }
            else if (top < scrbot - margin && bot > scrtop + margin)
                hib.style.opacity = "1";
            else {
                hib.style.opacity = "0";
                if (bot > scrtop && bot < scrtop + margin)
                    arrowUp.style.opacity = "1";
                if (top < scrbot && top > scrtop - margin)
                    arrowDown.style.opacity = "1";
            }
        }
    }
}
function createInfoMenu() {
    let infoArea = $.elementsWithStyle("info-area")[0];
    if (!infoArea)
        return;
    let headingOffsets = [];
    let headings = infoArea.querySelectorAll("h2");
    let menu = $.firstElementWithStyle("info-menu");
    let ul = document.createElement('ul');
    menu.appendChild(ul);
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        let link = $.attr($.create("a", heading.textContent), "href", "#" + heading.id);
        let li = $.create("li", link);
        ul.appendChild(li);
        headingOffsets[i] = { heading, li };
    }
    window.addEventListener("scroll", () => {
        let pos = window.pageYOffset;
        let found = false;
        let prev = null;
        for (let i = 0; i < headingOffsets.length; i++) {
            let ho = headingOffsets[i];
            ho.li.classList.remove("highlight");
            if (!found && ho.heading.offsetTop > (pos + ho.heading.offsetHeight)) {
                (prev || ho).li.classList.add("highlight");
                found = true;
            }
            prev = ho;
        }
        if (!found && prev)
            prev.li.classList.add("highlight");
    });
}


/***/ }),

/***/ "../lits-template/components/layout/layout.ts":
/*!****************************************************!*\
  !*** ../lits-template/components/layout/layout.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./layout.less */ "../lits-template/components/layout/layout.less");
const $ = __webpack_require__(/*! ../../components/common/myquery */ "../lits-template/components/common/myquery.ts");
const popups_1 = __webpack_require__(/*! ../../components/common/popups */ "../lits-template/components/common/popups.ts");
// Hook hamburger icon to closing side pane.
let layout = $.elementsWithStyle("layout")[0];
if (layout) {
    let hamb = $.firstElementWithStyle("hamburger", layout);
    popups_1.toggleClassOnClick(hamb, "expanded", layout.getElementsByClassName("collapsible"));
    // Set the top offset of sticky pane.
    let stickypane = $.firstElementWithStyle("stickypane");
    let stickyStyle = getComputedStyle(stickypane);
    let initialStickyTop = parseInt(stickyStyle.top, 10);
    setStickyTop();
    window.addEventListener("resize", setStickyTop);
    function setStickyTop() {
        let offs = Math.min((window.innerHeight - stickypane.offsetHeight) / 2, initialStickyTop);
        stickypane.style.top = `${offs}px`;
    }
}


/***/ }),

/***/ "../lits-template/components/navbar/navbar.ts":
/*!****************************************************!*\
  !*** ../lits-template/components/navbar/navbar.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./navbar.less */ "../lits-template/components/navbar/navbar.less");
const $ = __webpack_require__(/*! ../common/myquery */ "../lits-template/components/common/myquery.ts");
const popups_1 = __webpack_require__(/*! ../../components/common/popups */ "../lits-template/components/common/popups.ts");
// Set up responsive menu.
let navbar = $.firstElementWithStyle($.navbar);
let hamb = $.firstElementWithStyle($.hamburger, navbar);
let hidden = false;
popups_1.toggleClassOnClick(hamb, $.expanded, navbar);
// Hide navbar when scrolling down.
let dockedTop = navbar.offsetTop === 0;
let prevScroll = window.pageYOffset;
window.addEventListener("scroll", () => {
    var currScroll = window.pageYOffset;
    setNavbarOffset(dockedTop, prevScroll > currScroll ? 0 : -(navbar.offsetHeight - (dockedTop ? 1 : 2)));
    prevScroll = currScroll;
});
navbar.addEventListener("mouseenter", () => {
    if (hidden)
        setNavbarOffset(dockedTop, 0);
});
function setNavbarOffset(dockedTop, offs) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        if (dockedTop)
            navbar.style.top = `${offs}px`;
        else
            navbar.style.bottom = `${offs}px`;
    }
}


/***/ }),

/***/ "../lits-template/components/pagemenu/pagemenu.ts":
/*!********************************************************!*\
  !*** ../lits-template/components/pagemenu/pagemenu.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./pagemenu.less */ "../lits-template/components/pagemenu/pagemenu.less");
const $ = __webpack_require__(/*! ../../components/common/myquery */ "../lits-template/components/common/myquery.ts");
let pagemenu = $.elementsWithStyle("pagemenu")[0];
if (pagemenu) {
    let headingOffsets = [];
    let contentarea = $.firstElementWithStyle("contentarea");
    let pagetree = $.firstElementWithStyle("pagetree", pagemenu);
    let headings = contentarea.querySelectorAll("h1, h2, h3, h4, h5");
    buildTree(pagetree, null, 1, headings, 0);
    window.addEventListener("scroll", () => {
        let pos = window.pageYOffset;
        let found = false;
        let prev = null;
        for (let i = 0; i < headingOffsets.length; i++) {
            let ho = headingOffsets[i];
            ho.link.classList.remove("highlight");
            if (!found && ho.heading.offsetTop > (pos + ho.heading.offsetHeight)) {
                (prev || ho).link.classList.add("highlight");
                found = true;
            }
            prev = ho;
        }
        if (!found && prev)
            prev.link.classList.add("highlight");
    });
    function buildTree(parentList, prevItem, level, headings, index) {
        while (index < headings.length) {
            let heading = headings[index];
            let currLevel = parseInt(heading.tagName.substr(1, 1));
            if (currLevel < level)
                return index;
            if (currLevel > level) {
                if (prevItem) {
                    let subList = document.createElement("ul");
                    prevItem.appendChild(subList);
                    index = buildTree(subList, null, currLevel, headings, index);
                }
                else
                    index = buildTree(parentList, null, currLevel, headings, index);
            }
            else {
                let link = $.attr($.create("a", heading.textContent), "href", "#" + heading.id);
                let listItem = $.create("li", link);
                parentList.appendChild(listItem);
                headingOffsets[index] = { heading, link };
                index = buildTree(parentList, listItem, level, headings, index + 1);
            }
        }
        return index;
    }
}


/***/ }),

/***/ "../lits-template/components/tocmenu/tocmenu.ts":
/*!******************************************************!*\
  !*** ../lits-template/components/tocmenu/tocmenu.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./tocmenu.less */ "../lits-template/components/tocmenu/tocmenu.less");
const $ = __webpack_require__(/*! ../../components/common/myquery */ "../lits-template/components/common/myquery.ts");
const accordion_1 = __webpack_require__(/*! ../../components/common/accordion */ "../lits-template/components/common/accordion.ts");
let tocmenu = $.elementsWithStyle("tocmenu")[0];
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        accordion_1.initAccordions(tocmenu);
    else
        document.fonts.onloadingdone = () => accordion_1.initAccordions(tocmenu);
}


/***/ }),

/***/ "../lits-template/components/tooltips/tooltips.ts":
/*!********************************************************!*\
  !*** ../lits-template/components/tooltips/tooltips.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tooltip = void 0;
const $ = __webpack_require__(/*! ../../components/common/myquery */ "../lits-template/components/common/myquery.ts");
__webpack_require__(/*! ./tooltips.less */ "../lits-template/components/tooltips/tooltips.less");
// let body = document.getElementsByTagName('body')[0]
document.querySelectorAll('[data-toggle="tooltip"]').forEach(elem => tooltip(elem, elem.getAttribute("data-title")));
const id = "tooltip";
function tooltip(elem, text) {
    elem.addEventListener('mouseenter', () => showTooltip(elem, text));
    elem.addEventListener('mouseleave', hideTooltip);
}
exports.tooltip = tooltip;
function showTooltip(elem, contents) {
    hideTooltip();
    if (!contents)
        return;
    let tt = $.create('legend');
    document.body.appendChild(tt);
    tt.id = id;
    tt.innerHTML = contents;
    let bb = elem.getBoundingClientRect();
    tt.style.left = `${Math.round(bb.left) + window.scrollX}px`;
    tt.style.top = `${Math.round(bb.top) + window.scrollY}px`;
    tt.style.opacity = "95%";
}
function hideTooltip() {
    let tt = document.getElementById(id);
    if (tt)
        tt.remove();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************************!*\
  !*** ../lits-template/components/main.ts ***!
  \*******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./main.less */ "../lits-template/components/main.less");
__webpack_require__(/*! ./hamburger/hamburger */ "../lits-template/components/hamburger/hamburger.ts");
__webpack_require__(/*! ./navbar/navbar */ "../lits-template/components/navbar/navbar.ts");
__webpack_require__(/*! ./layout/layout */ "../lits-template/components/layout/layout.ts");
__webpack_require__(/*! ./tocmenu/tocmenu */ "../lits-template/components/tocmenu/tocmenu.ts");
__webpack_require__(/*! ./contentarea/contentarea */ "../lits-template/components/contentarea/contentarea.ts");
__webpack_require__(/*! ./pagemenu/pagemenu */ "../lits-template/components/pagemenu/pagemenu.ts");
__webpack_require__(/*! ./footer/footer */ "../lits-template/components/footer/footer.ts");
__webpack_require__(/*! ./tooltips/tooltips */ "../lits-template/components/tooltips/tooltips.ts");
__webpack_require__(/*! ./landing */ "../lits-template/components/landing.ts");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2NvbnRlbnRhcmVhL2NvbnRlbnRhcmVhLmxlc3M/ZDYwMiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIubGVzcz85YTg2Iiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5sZXNzP2ZkNTEiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9sYW5kaW5nLmxlc3M/NzAzMiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2xheW91dC9sYXlvdXQubGVzcz8wOTU3Iiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbWFpbi5sZXNzPzdiZTMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmxlc3M/MmVhZCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51Lmxlc3M/NWM3YSIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL3N5bnRheC9zb24tb2Ytb2JzaWRpYW4ubGVzcz9mNTEyIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51Lmxlc3M/YWExMiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL3Rvb2x0aXBzL3Rvb2x0aXBzLmxlc3M/NzkyYiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2NvbW1vbi9hY2NvcmRpb24udHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9jb21tb24vbXlxdWVyeS50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2NvbW1vbi9wb3B1cHMudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9jb250ZW50YXJlYS9jb250ZW50YXJlYS50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9oYW1idXJnZXIvaGFtYnVyZ2VyLnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbGFuZGluZy50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2xheW91dC9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy90b29sdGlwcy90b29sdGlwcy50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAqIGFzICQgZnJvbSBcIi4vbXlxdWVyeVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRBY2NvcmRpb25zIChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IGFjY29yZGlvbnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJC5hY2NvcmRpb24pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjb3JkaW9ucy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBhY2MgPSBhY2NvcmRpb25zW2ldIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGxldCBwYW5lbCA9IGFjYy5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGluaXRIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gIGluaXRIZWlnaHQ7XHJcbiAgICAgICAgYWNjLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYy5jbGFzc0xpc3QudG9nZ2xlKCQuY29sbGFwc2VkKTtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID09PSBcIjBweFwiID8gXHJcbiAgICAgICAgICAgICAgICBpbml0SGVpZ2h0IDogIFwiMHB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBleHBhbmRlZCA9IFwiZXhwYW5kZWRcIlxyXG5leHBvcnQgY29uc3QgY29sbGFwc2VkID0gXCJjb2xsYXBzZWRcIlxyXG5leHBvcnQgY29uc3QgYWNjb3JkaW9uID0gXCJhY2NvcmRpb25cIlxyXG5leHBvcnQgY29uc3QgaGFtYnVyZ2VyID0gXCJoYW1idXJnZXJcIlxyXG5leHBvcnQgY29uc3QgbmF2YmFyID0gXCJuYXZiYXJcIlxyXG5leHBvcnQgY29uc3Qgc2Nyb2xsaW5nYXJlYSA9IFwic2Nyb2xsaW5nYXJlYVwiXHJcbmV4cG9ydCBjb25zdCBjbG9zZXBvcHVwcyA9IFwiY2xvc2Vwb3B1cHNcIlxyXG5leHBvcnQgY29uc3QgaW5mb2JveCA9IFwiaW5mby1ib3hcIlxyXG5cclxuZXhwb3J0IHR5cGUgRWxlbSA9IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb25PZjxFbGVtZW50PlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0RWxlbWVudFdpdGhTdHlsZShjbGFzc05hbWU6IHN0cmluZywgXHJcbiAgICBwYXJlbnQ6IEVsZW1lbnQgfCBEb2N1bWVudCA9IGRvY3VtZW50KTogSFRNTEVsZW1lbnQge1xyXG4gICAgbGV0IHJlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF0gYXMgSFRNTEVsZW1lbnRcclxuICAgIGlmICghcmVzKVxyXG4gICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggY2xhc3MgXCIke2NsYXNzTmFtZX1cIi5gKVxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudHNXaXRoU3R5bGUoY2xhc3NOYW1lOiBzdHJpbmcsIFxyXG4gICAgcGFyZW50OiBFbGVtZW50IHwgRG9jdW1lbnQgPSBkb2N1bWVudCk6IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4ge1xyXG4gICAgcmV0dXJuIHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSFRNTENvbGxlY3Rpb24oZWxlbTogRWxlbSk6XHJcbiAgICBlbGVtIGlzIEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4ge1xyXG4gICAgcmV0dXJuICg8SFRNTENvbGxlY3Rpb25PZjxFbGVtZW50Pj5lbGVtKS5sZW5ndGggIT09IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWFjaChlbGVtOiBFbGVtLCBhY3Rpb246IChlOiBFbGVtZW50KSA9PiB2b2lkKSB7XHJcbiAgICBpZiAoaXNIVE1MQ29sbGVjdGlvbihlbGVtKSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW0ubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGFjdGlvbihlbGVtW2ldKVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGFjdGlvbihlbGVtKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZzogSywgXHJcbiAgICBjaGlsZHJlbjogRWxlbSB8IHN0cmluZyA9IG51bGwpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxyXG4gICAgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoY2hpbGRyZW4pID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkcmVuKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGVhY2goY2hpbGRyZW4sIGMgPT4gZWxlbS5hcHBlbmRDaGlsZChjKSlcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gZWxlbVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0cihlbGVtOiBFbGVtLCBhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZyk6IEVsZW0ge1xyXG4gICAgZWFjaChlbGVtLCBlID0+IGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpKVxyXG4gICAgcmV0dXJuIGVsZW1cclxufSIsImltcG9ydCAqIGFzICQgZnJvbSBcIi4vbXlxdWVyeVwiXHJcblxyXG5sZXQgY2xvc2Vwb3B1cHMgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZSgkLmNsb3NlcG9wdXBzKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVwT25DbGljayhlbGVtZW50OiBIVE1MRWxlbWVudCwgdG9nZ2xlOiAoKSA9PiB2b2lkLFxyXG4gICAgaGlkZTogKCkgPT4gdm9pZCkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlKVxyXG4gICAgY2xvc2Vwb3B1cHMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGlkZSlcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIilcclxuICAgICAgICAgICAgaGlkZSgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3NPbkNsaWNrKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjbHM6IHN0cmluZyxcclxuICAgIHRhcmdldDogJC5FbGVtID0gZWxlbWVudCkge1xyXG4gICAgcG9wdXBPbkNsaWNrKGVsZW1lbnQsXHJcbiAgICAgICAgKCkgPT4gJC5lYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC50b2dnbGUoY2xzKSksXHJcbiAgICAgICAgKCkgPT4gJC5lYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSkpXHJcbn0iLCJpbXBvcnQgXCIuL2NvbnRlbnRhcmVhLmxlc3NcIlxyXG5pbXBvcnQgXCJzeW50YXhoaWdobGlnaHRcIiIsImltcG9ydCBcIi4vZm9vdGVyLmxlc3NcIiIsImltcG9ydCBcIi4vaGFtYnVyZ2VyLmxlc3NcIjtcclxuaW1wb3J0ICogYXMgJCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vbXlxdWVyeVwiO1xyXG5pbXBvcnQgeyB0b2dnbGVDbGFzc09uQ2xpY2sgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vcG9wdXBzXCI7XHJcblxyXG4kLmVhY2goJC5lbGVtZW50c1dpdGhTdHlsZShcImhhbWJ1cmdlclwiKSwgaGFtYiA9PlxyXG4gICAgdG9nZ2xlQ2xhc3NPbkNsaWNrKGhhbWIgYXMgSFRNTEVsZW1lbnQsIFwib3BlblwiKSk7IiwiaW1wb3J0IFwiLi9sYW5kaW5nLmxlc3NcIjtcclxuaW1wb3J0ICogYXMgJCBmcm9tIFwiLi9jb21tb24vbXlxdWVyeVwiO1xyXG5cclxucmV2ZWFsSW5mb0JveGVzKCk7XHJcbmNyZWF0ZUluZm9NZW51KCk7XHJcblxyXG5mdW5jdGlvbiByZXZlYWxJbmZvQm94ZXMoKSB7XHJcbiAgICBsZXQgYXJyb3dzID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInNjcm9sbC1pbmRpY2F0b3JcIik7XHJcbiAgICBpZiAoIWFycm93cyB8fCBhcnJvd3MubGVuZ3RoICE9IDIpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICBsZXQgYXJyb3dVcCA9IGFycm93c1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBhcnJvd0Rvd24gPSBhcnJvd3NbMV0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzZXRCb3hPcGFjaXRpZXMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0Qm94T3BhY2l0aWVzKTtcclxuICAgIHNldEJveE9wYWNpdGllcygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldEJveE9wYWNpdGllcygpIHtcclxuICAgICAgICBhcnJvd1VwLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgICBhcnJvd0Rvd24uc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgIGZvciAobGV0IGliIG9mICQuZWxlbWVudHNXaXRoU3R5bGUoJ2luZm8tYm94JykpIHtcclxuICAgICAgICAgICAgbGV0IGhpYiA9IGliIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgc2NydG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgc2NyYm90ID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgbWFyZ2luRmFjdG9yID0gNjtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IGhpYi5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIGxldCBib3QgPSB0b3AgKyBoaWIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgbWFyZ2luID0gd2luZG93LmlubmVySGVpZ2h0IC8gbWFyZ2luRmFjdG9yO1xyXG4gICAgICAgICAgICBpZiAoc2NydG9wID09IDApIHtcclxuICAgICAgICAgICAgICAgIGhpYi5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICBhcnJvd0Rvd24uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRvcCA8IHNjcmJvdCAtIG1hcmdpbiAmJiBib3QgPiBzY3J0b3AgKyBtYXJnaW4pXHJcbiAgICAgICAgICAgICAgICBoaWIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpYi5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm90ID4gc2NydG9wICYmIGJvdCA8IHNjcnRvcCArIG1hcmdpbilcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd1VwLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCBzY3Jib3QgJiYgdG9wID4gc2NydG9wIC0gbWFyZ2luKVxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93RG93bi5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUluZm9NZW51KCkge1xyXG4gICAgbGV0IGluZm9BcmVhID0gJC5lbGVtZW50c1dpdGhTdHlsZShcImluZm8tYXJlYVwiKVswXTtcclxuICAgIGlmICghaW5mb0FyZWEpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICBsZXQgaGVhZGluZ09mZnNldHM6IHsgaGVhZGluZzogSFRNTEhlYWRFbGVtZW50LCBsaTogSFRNTEVsZW1lbnQgfVtdID0gW11cclxuICAgIGxldCBoZWFkaW5ncyA9IGluZm9BcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMlwiKTtcclxuICAgIGxldCBtZW51ID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJpbmZvLW1lbnVcIik7XHJcbiAgICBsZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgbWVudS5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGluZyA9IGhlYWRpbmdzW2ldO1xyXG4gICAgICAgIGxldCBsaW5rID0gJC5hdHRyKCQuY3JlYXRlKFwiYVwiLCBoZWFkaW5nLnRleHRDb250ZW50KSwgXCJocmVmXCIsXHJcbiAgICAgICAgICAgIFwiI1wiICsgaGVhZGluZy5pZCk7XHJcbiAgICAgICAgbGV0IGxpID0gJC5jcmVhdGUoXCJsaVwiLCBsaW5rKTtcclxuICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcclxuICAgICAgICBoZWFkaW5nT2Zmc2V0c1tpXSA9IHsgaGVhZGluZywgbGkgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGxldCBwb3MgPSB3aW5kb3cucGFnZVlPZmZzZXRcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZVxyXG4gICAgICAgIGxldCBwcmV2OiB7IGhlYWRpbmc6IEhUTUxIZWFkRWxlbWVudCwgbGk6IEhUTUxFbGVtZW50IH0gPSBudWxsXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5nT2Zmc2V0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaG8gPSBoZWFkaW5nT2Zmc2V0c1tpXVxyXG4gICAgICAgICAgICBoby5saS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpXHJcbiAgICAgICAgICAgIGlmICghZm91bmQgJiYgaG8uaGVhZGluZy5vZmZzZXRUb3AgPiAocG9zICsgaG8uaGVhZGluZy5vZmZzZXRIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICAocHJldiB8fCBobykubGkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldiA9IGhvXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZm91bmQgJiYgcHJldilcclxuICAgICAgICAgICAgcHJldi5saS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IFwiLi9sYXlvdXQubGVzc1wiXHJcbmltcG9ydCAqIGFzICQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL215cXVlcnlcIlxyXG5pbXBvcnQgeyB0b2dnbGVDbGFzc09uQ2xpY2sgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vcG9wdXBzXCJcclxuXHJcbi8vIEhvb2sgaGFtYnVyZ2VyIGljb24gdG8gY2xvc2luZyBzaWRlIHBhbmUuXHJcbmxldCBsYXlvdXQgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwibGF5b3V0XCIpWzBdXHJcbmlmIChsYXlvdXQpIHtcclxuICAgIGxldCBoYW1iID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJoYW1idXJnZXJcIiwgbGF5b3V0KVxyXG4gICAgdG9nZ2xlQ2xhc3NPbkNsaWNrKGhhbWIsIFwiZXhwYW5kZWRcIiwgXHJcbiAgICAgICAgbGF5b3V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2xsYXBzaWJsZVwiKSlcclxuICAgIFxyXG4gICAgLy8gU2V0IHRoZSB0b3Agb2Zmc2V0IG9mIHN0aWNreSBwYW5lLlxyXG4gICAgbGV0IHN0aWNreXBhbmUgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcInN0aWNreXBhbmVcIilcclxuICAgIGxldCBzdGlja3lTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoc3RpY2t5cGFuZSlcclxuICAgIGxldCBpbml0aWFsU3RpY2t5VG9wID0gcGFyc2VJbnQoc3RpY2t5U3R5bGUudG9wLCAxMClcclxuICAgIHNldFN0aWNreVRvcCgpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzZXRTdGlja3lUb3ApICAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lUb3AoKSB7XHJcbiAgICAgICAgbGV0IG9mZnMgPSBNYXRoLm1pbigod2luZG93LmlubmVySGVpZ2h0IC0gc3RpY2t5cGFuZS5vZmZzZXRIZWlnaHQpIC8gMiwgXHJcbiAgICAgICAgICAgIGluaXRpYWxTdGlja3lUb3ApXHJcbiAgICAgICAgc3RpY2t5cGFuZS5zdHlsZS50b3AgPSBgJHtvZmZzfXB4YFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgXCIuL25hdmJhci5sZXNzXCI7XHJcbmltcG9ydCAqIGFzICQgZnJvbSBcIi4uL2NvbW1vbi9teXF1ZXJ5XCI7XHJcbmltcG9ydCB7IHRvZ2dsZUNsYXNzT25DbGljayB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9wb3B1cHNcIjtcclxuXHJcbi8vIFNldCB1cCByZXNwb25zaXZlIG1lbnUuXHJcbmxldCBuYXZiYXIgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZSgkLm5hdmJhcik7XHJcbmxldCBoYW1iID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoJC5oYW1idXJnZXIsIG5hdmJhcik7XHJcbmxldCBoaWRkZW4gPSBmYWxzZTtcclxudG9nZ2xlQ2xhc3NPbkNsaWNrKGhhbWIsICQuZXhwYW5kZWQsIG5hdmJhcik7XHJcblxyXG4vLyBIaWRlIG5hdmJhciB3aGVuIHNjcm9sbGluZyBkb3duLlxyXG5sZXQgZG9ja2VkVG9wID0gbmF2YmFyLm9mZnNldFRvcCA9PT0gMDtcclxubGV0IHByZXZTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgIHZhciBjdXJyU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgc2V0TmF2YmFyT2Zmc2V0KGRvY2tlZFRvcCwgXHJcbiAgICAgICAgcHJldlNjcm9sbCA+IGN1cnJTY3JvbGwgPyAwIDogLShuYXZiYXIub2Zmc2V0SGVpZ2h0IC0gKGRvY2tlZFRvcCA/IDEgOiAyKSkpOyBcclxuICAgIHByZXZTY3JvbGwgPSBjdXJyU2Nyb2xsO1xyXG59KTtcclxubmF2YmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcclxuICAgIGlmIChoaWRkZW4pXHJcbiAgICAgICAgc2V0TmF2YmFyT2Zmc2V0KGRvY2tlZFRvcCwgMCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0TmF2YmFyT2Zmc2V0KGRvY2tlZFRvcDogYm9vbGVhbiwgb2ZmczogbnVtYmVyKSB7XHJcbiAgICBoaWRkZW4gPSBvZmZzICE9PSAwO1xyXG4gICAgaWYgKCFuYXZiYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCQuZXhwYW5kZWQpKSB7XHJcbiAgICAgICAgaWYgKGRvY2tlZFRvcClcclxuICAgICAgICAgICAgbmF2YmFyLnN0eWxlLnRvcCA9IGAke29mZnN9cHhgO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbmF2YmFyLnN0eWxlLmJvdHRvbSA9IGAke29mZnN9cHhgO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgXCIuL3BhZ2VtZW51Lmxlc3NcIlxyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9teXF1ZXJ5XCJcclxuXHJcbmxldCBwYWdlbWVudSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJwYWdlbWVudVwiKVswXVxyXG5pZiAocGFnZW1lbnUpIHtcclxuICAgIGxldCBoZWFkaW5nT2Zmc2V0czogeyBoZWFkaW5nOiBIVE1MRWxlbWVudCwgbGluazogSFRNTEVsZW1lbnQgfVtdID0gW11cclxuICAgIGxldCBjb250ZW50YXJlYSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwiY29udGVudGFyZWFcIilcclxuICAgIGxldCBwYWdldHJlZSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwicGFnZXRyZWVcIiwgcGFnZW1lbnUpXHJcbiAgICBsZXQgaGVhZGluZ3MgPSBjb250ZW50YXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiaDEsIGgyLCBoMywgaDQsIGg1XCIpXHJcbiAgICBidWlsZFRyZWUocGFnZXRyZWUsIG51bGwsIDEsIGhlYWRpbmdzLCAwKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGxldCBwb3MgPSB3aW5kb3cucGFnZVlPZmZzZXRcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZVxyXG4gICAgICAgIGxldCBwcmV2OiB7IGhlYWRpbmc6IEhUTUxFbGVtZW50LCBsaW5rOiBIVE1MRWxlbWVudCB9ID0gbnVsbFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ09mZnNldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhvID0gaGVhZGluZ09mZnNldHNbaV1cclxuICAgICAgICAgICAgaG8ubGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpXHJcbiAgICAgICAgICAgIGlmICghZm91bmQgJiYgaG8uaGVhZGluZy5vZmZzZXRUb3AgPiAocG9zICsgaG8uaGVhZGluZy5vZmZzZXRIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICAocHJldiB8fCBobykubGluay5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2ID0gaG9cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3VuZCAmJiBwcmV2KVxyXG4gICAgICAgICAgICBwcmV2LmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBidWlsZFRyZWUocGFyZW50TGlzdDogSFRNTEVsZW1lbnQsIHByZXZJdGVtOiBIVE1MRWxlbWVudCwgXHJcbiAgICAgICAgbGV2ZWw6IG51bWJlciwgaGVhZGluZ3M6IE5vZGVMaXN0T2Y8RWxlbWVudD4sIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBoZWFkaW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRpbmcgPSBoZWFkaW5nc1tpbmRleF0gYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGN1cnJMZXZlbCA9IHBhcnNlSW50KGhlYWRpbmcudGFnTmFtZS5zdWJzdHIoMSwgMSkpXHJcbiAgICAgICAgICAgIGlmIChjdXJyTGV2ZWwgPCBsZXZlbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleFxyXG4gICAgICAgICAgICBpZiAoY3VyckxldmVsID4gbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWJMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uYXBwZW5kQ2hpbGQoc3ViTGlzdClcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShzdWJMaXN0LCBudWxsLCBjdXJyTGV2ZWwsIGhlYWRpbmdzLCBpbmRleClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShwYXJlbnRMaXN0LCBudWxsLCBjdXJyTGV2ZWwsIGhlYWRpbmdzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluayA9ICQuYXR0cigkLmNyZWF0ZShcImFcIiwgaGVhZGluZy50ZXh0Q29udGVudCksIFwiaHJlZlwiLCBcclxuICAgICAgICAgICAgICAgICAgICBcIiNcIiArIGhlYWRpbmcuaWQpIGFzIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdEl0ZW0gPSAkLmNyZWF0ZShcImxpXCIsIGxpbmspXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKVxyXG4gICAgICAgICAgICAgICAgaGVhZGluZ09mZnNldHNbaW5kZXhdID0geyBoZWFkaW5nLCBsaW5rIH1cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIGxpc3RJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICsgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXhcclxuICAgIH1cclxufSIsImltcG9ydCBcIi4vdG9jbWVudS5sZXNzXCJcclxuaW1wb3J0ICogYXMgJCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vbXlxdWVyeVwiXHJcbmltcG9ydCB7IGluaXRBY2NvcmRpb25zIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2FjY29yZGlvblwiXHJcblxyXG5sZXQgdG9jbWVudSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJ0b2NtZW51XCIpWzBdIGFzIEhUTUxFbGVtZW50XHJcbmlmICh0b2NtZW51KSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LmZvbnRzIHx8IGRvY3VtZW50LmZvbnRzLnN0YXR1cyA9PSBcImxvYWRlZFwiKVxyXG4gICAgICAgIGluaXRBY2NvcmRpb25zKHRvY21lbnUpXHJcbiAgICBlbHNlXHJcbiAgICAgICAgZG9jdW1lbnQuZm9udHMub25sb2FkaW5nZG9uZSA9ICgpID0+IGluaXRBY2NvcmRpb25zKHRvY21lbnUpXHJcbn0iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9teXF1ZXJ5XCJcclxuaW1wb3J0ICcuL3Rvb2x0aXBzLmxlc3MnXHJcblxyXG4vLyBsZXQgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLmZvckVhY2goZWxlbSA9PiBcclxuICAgIHRvb2x0aXAoZWxlbSBhcyBIVE1MRWxlbWVudCwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpdGxlXCIpKSlcclxuXHJcbmNvbnN0IGlkID0gXCJ0b29sdGlwXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b29sdGlwKGVsZW06IEhUTUxFbGVtZW50LCB0ZXh0OiBzdHJpbmcpIHtcclxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHNob3dUb29sdGlwKGVsZW0sIHRleHQpKVxyXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaGlkZVRvb2x0aXApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dUb29sdGlwKGVsZW06IEhUTUxFbGVtZW50LCBjb250ZW50cz86IHN0cmluZykge1xyXG4gICAgaGlkZVRvb2x0aXAoKVxyXG4gICAgaWYgKCFjb250ZW50cylcclxuICAgICAgICByZXR1cm5cclxuICAgIGxldCB0dCA9ICQuY3JlYXRlKCdsZWdlbmQnKVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0dClcclxuICAgIHR0LmlkID0gaWRcclxuICAgIHR0LmlubmVySFRNTCA9IGNvbnRlbnRzXHJcbiAgICBsZXQgYmIgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICB0dC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChiYi5sZWZ0KSArIHdpbmRvdy5zY3JvbGxYfXB4YFxyXG4gICAgdHQuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZChiYi50b3ApICsgd2luZG93LnNjcm9sbFl9cHhgXHJcbiAgICB0dC5zdHlsZS5vcGFjaXR5ID0gXCI5NSVcIlxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlVG9vbHRpcCgpIHtcclxuICAgIGxldCB0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxyXG4gICAgaWYgKHR0KVxyXG4gICAgICAgIHR0LnJlbW92ZSgpXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9tYWluLmxlc3NcIjtcclxuaW1wb3J0IFwiLi9oYW1idXJnZXIvaGFtYnVyZ2VyXCI7XHJcbmltcG9ydCBcIi4vbmF2YmFyL25hdmJhclwiO1xyXG5pbXBvcnQgXCIuL2xheW91dC9sYXlvdXRcIjtcclxuaW1wb3J0IFwiLi90b2NtZW51L3RvY21lbnVcIjtcclxuaW1wb3J0IFwiLi9jb250ZW50YXJlYS9jb250ZW50YXJlYVwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VtZW51L3BhZ2VtZW51XCI7XHJcbmltcG9ydCBcIi4vZm9vdGVyL2Zvb3RlclwiO1xyXG5pbXBvcnQgXCIuL3Rvb2x0aXBzL3Rvb2x0aXBzXCI7XHJcbmltcG9ydCBcIi4vbGFuZGluZ1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==