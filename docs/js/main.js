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
        navbar.style.opacity = hidden ? "0" : "1";
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
    tt.innerHTML = contents.replace(/=>/g, "⇒");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCO0FBQ3JCLHVHQUErQjtBQUMvQiwyRkFBeUI7QUFDekIsMkZBQXlCO0FBQ3pCLCtGQUEyQjtBQUMzQiwrR0FBbUM7QUFDbkMsbUdBQTZCO0FBQzdCLDJGQUF5QjtBQUN6QixtR0FBNkI7QUFDN0IsK0VBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9jb250ZW50YXJlYS9jb250ZW50YXJlYS5sZXNzP2Q2MDIiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmxlc3M/OWE4NiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIubGVzcz9mZDUxIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbGFuZGluZy5sZXNzPzcwMzIiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0Lmxlc3M/MDk1NyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL21haW4ubGVzcz83YmUzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5sZXNzPzJlYWQiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5sZXNzPzVjN2EiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9zeW50YXgvc29uLW9mLW9ic2lkaWFuLmxlc3M/ZjUxMiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5sZXNzP2FhMTIiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy90b29sdGlwcy90b29sdGlwcy5sZXNzPzc5MmIiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9jb21tb24vYWNjb3JkaW9uLnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvY29tbW9uL215cXVlcnkudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9jb21tb24vcG9wdXBzLnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvY29udGVudGFyZWEvY29udGVudGFyZWEudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL2xhbmRpbmcudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4uL2xpdHMtdGVtcGxhdGUvY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci50cyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi4vbGl0cy10ZW1wbGF0ZS9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51LnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51LnRzIiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvdG9vbHRpcHMvdG9vbHRpcHMudHMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpdHNjcmlwdC8uLi9saXRzLXRlbXBsYXRlL2NvbXBvbmVudHMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgKiBhcyAkIGZyb20gXCIuL215cXVlcnlcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0QWNjb3JkaW9ucyAoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBhY2NvcmRpb25zID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCQuYWNjb3JkaW9uKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY29yZGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgYWNjID0gYWNjb3JkaW9uc1tpXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGxldCBpbml0SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9ICBpbml0SGVpZ2h0O1xyXG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBhY2MuY2xhc3NMaXN0LnRvZ2dsZSgkLmNvbGxhcHNlZCk7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnN0eWxlLm1heEhlaWdodCA9PT0gXCIwcHhcIiA/IFxyXG4gICAgICAgICAgICAgICAgaW5pdEhlaWdodCA6ICBcIjBweFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgZXhwYW5kZWQgPSBcImV4cGFuZGVkXCJcclxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlZCA9IFwiY29sbGFwc2VkXCJcclxuZXhwb3J0IGNvbnN0IGFjY29yZGlvbiA9IFwiYWNjb3JkaW9uXCJcclxuZXhwb3J0IGNvbnN0IGhhbWJ1cmdlciA9IFwiaGFtYnVyZ2VyXCJcclxuZXhwb3J0IGNvbnN0IG5hdmJhciA9IFwibmF2YmFyXCJcclxuZXhwb3J0IGNvbnN0IHNjcm9sbGluZ2FyZWEgPSBcInNjcm9sbGluZ2FyZWFcIlxyXG5leHBvcnQgY29uc3QgY2xvc2Vwb3B1cHMgPSBcImNsb3NlcG9wdXBzXCJcclxuZXhwb3J0IGNvbnN0IGluZm9ib3ggPSBcImluZm8tYm94XCJcclxuXHJcbmV4cG9ydCB0eXBlIEVsZW0gPSBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdEVsZW1lbnRXaXRoU3R5bGUoY2xhc3NOYW1lOiBzdHJpbmcsIFxyXG4gICAgcGFyZW50OiBFbGVtZW50IHwgRG9jdW1lbnQgPSBkb2N1bWVudCk6IEhUTUxFbGVtZW50IHtcclxuICAgIGxldCByZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdIGFzIEhUTUxFbGVtZW50XHJcbiAgICBpZiAoIXJlcylcclxuICAgICAgICB0aHJvdyBSZWZlcmVuY2VFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGNsYXNzIFwiJHtjbGFzc05hbWV9XCIuYClcclxuICAgIHJldHVybiByZXNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRzV2l0aFN0eWxlKGNsYXNzTmFtZTogc3RyaW5nLCBcclxuICAgIHBhcmVudDogRWxlbWVudCB8IERvY3VtZW50ID0gZG9jdW1lbnQpOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+IHtcclxuICAgIHJldHVybiBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0hUTUxDb2xsZWN0aW9uKGVsZW06IEVsZW0pOlxyXG4gICAgZWxlbSBpcyBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+IHtcclxuICAgIHJldHVybiAoPEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4+ZWxlbSkubGVuZ3RoICE9PSB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVhY2goZWxlbTogRWxlbSwgYWN0aW9uOiAoZTogRWxlbWVudCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKGlzSFRNTENvbGxlY3Rpb24oZWxlbSkpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBhY3Rpb24oZWxlbVtpXSlcclxuICAgIGVsc2VcclxuICAgICAgICBhY3Rpb24oZWxlbSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPih0YWc6IEssIFxyXG4gICAgY2hpbGRyZW46IEVsZW0gfCBzdHJpbmcgPSBudWxsKTogSFRNTEVsZW1lbnQge1xyXG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcclxuICAgIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGNoaWxkcmVuKSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZHJlbikpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlYWNoKGNoaWxkcmVuLCBjID0+IGVsZW0uYXBwZW5kQ2hpbGQoYykpXHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIGVsZW1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIoZWxlbTogRWxlbSwgYXR0ck5hbWU6IHN0cmluZywgYXR0clZhbHVlOiBzdHJpbmcpOiBFbGVtIHtcclxuICAgIGVhY2goZWxlbSwgZSA9PiBlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKSlcclxuICAgIHJldHVybiBlbGVtXHJcbn0iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCIuL215cXVlcnlcIlxyXG5cclxubGV0IGNsb3NlcG9wdXBzID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoJC5jbG9zZXBvcHVwcylcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cE9uQ2xpY2soZWxlbWVudDogSFRNTEVsZW1lbnQsIHRvZ2dsZTogKCkgPT4gdm9pZCxcclxuICAgIGhpZGU6ICgpID0+IHZvaWQpIHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZSlcclxuICAgIGNsb3NlcG9wdXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpZGUpXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpXHJcbiAgICAgICAgICAgIGhpZGUoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzT25DbGljayhlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xzOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6ICQuRWxlbSA9IGVsZW1lbnQpIHtcclxuICAgIHBvcHVwT25DbGljayhlbGVtZW50LFxyXG4gICAgICAgICgpID0+ICQuZWFjaCh0YXJnZXQsIGUgPT4gZS5jbGFzc0xpc3QudG9nZ2xlKGNscykpLFxyXG4gICAgICAgICgpID0+ICQuZWFjaCh0YXJnZXQsIGUgPT4gZS5jbGFzc0xpc3QucmVtb3ZlKGNscykpKVxyXG59IiwiaW1wb3J0IFwiLi9jb250ZW50YXJlYS5sZXNzXCJcclxuaW1wb3J0IFwic3ludGF4aGlnaGxpZ2h0XCIiLCJpbXBvcnQgXCIuL2Zvb3Rlci5sZXNzXCIiLCJpbXBvcnQgXCIuL2hhbWJ1cmdlci5sZXNzXCI7XHJcbmltcG9ydCAqIGFzICQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL215cXVlcnlcIjtcclxuaW1wb3J0IHsgdG9nZ2xlQ2xhc3NPbkNsaWNrIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL3BvcHVwc1wiO1xyXG5cclxuJC5lYWNoKCQuZWxlbWVudHNXaXRoU3R5bGUoXCJoYW1idXJnZXJcIiksIGhhbWIgPT5cclxuICAgIHRvZ2dsZUNsYXNzT25DbGljayhoYW1iIGFzIEhUTUxFbGVtZW50LCBcIm9wZW5cIikpOyIsImltcG9ydCBcIi4vbGFuZGluZy5sZXNzXCI7XHJcbmltcG9ydCAqIGFzICQgZnJvbSBcIi4vY29tbW9uL215cXVlcnlcIjtcclxuXHJcbnJldmVhbEluZm9Cb3hlcygpO1xyXG5jcmVhdGVJbmZvTWVudSgpO1xyXG5cclxuZnVuY3Rpb24gcmV2ZWFsSW5mb0JveGVzKCkge1xyXG4gICAgbGV0IGFycm93cyA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJzY3JvbGwtaW5kaWNhdG9yXCIpO1xyXG4gICAgaWYgKCFhcnJvd3MgfHwgYXJyb3dzLmxlbmd0aCAhPSAyKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgbGV0IGFycm93VXAgPSBhcnJvd3NbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgYXJyb3dEb3duID0gYXJyb3dzWzFdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2V0Qm94T3BhY2l0aWVzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNldEJveE9wYWNpdGllcyk7XHJcbiAgICBzZXRCb3hPcGFjaXRpZXMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRCb3hPcGFjaXRpZXMoKSB7XHJcbiAgICAgICAgYXJyb3dVcC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgYXJyb3dEb3duLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgICBmb3IgKGxldCBpYiBvZiAkLmVsZW1lbnRzV2l0aFN0eWxlKCdpbmZvLWJveCcpKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWIgPSBpYiBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgbGV0IHNjcnRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IHNjcmJvdCA9IHdpbmRvdy5wYWdlWU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICAgICAgbGV0IG1hcmdpbkZhY3RvciA9IDY7XHJcbiAgICAgICAgICAgIGxldCB0b3AgPSBoaWIub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBsZXQgYm90ID0gdG9wICsgaGliLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgbGV0IG1hcmdpbiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIG1hcmdpbkZhY3RvcjtcclxuICAgICAgICAgICAgaWYgKHNjcnRvcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBoaWIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgYXJyb3dEb3duLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b3AgPCBzY3Jib3QgLSBtYXJnaW4gJiYgYm90ID4gc2NydG9wICsgbWFyZ2luKVxyXG4gICAgICAgICAgICAgICAgaGliLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvdCA+IHNjcnRvcCAmJiBib3QgPCBzY3J0b3AgKyBtYXJnaW4pXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dVcC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wIDwgc2NyYm90ICYmIHRvcCA+IHNjcnRvcCAtIG1hcmdpbilcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd0Rvd24uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJbmZvTWVudSgpIHtcclxuICAgIGxldCBpbmZvQXJlYSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJpbmZvLWFyZWFcIilbMF07XHJcbiAgICBpZiAoIWluZm9BcmVhKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgbGV0IGhlYWRpbmdPZmZzZXRzOiB7IGhlYWRpbmc6IEhUTUxIZWFkRWxlbWVudCwgbGk6IEhUTUxFbGVtZW50IH1bXSA9IFtdXHJcbiAgICBsZXQgaGVhZGluZ3MgPSBpbmZvQXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiaDJcIik7XHJcbiAgICBsZXQgbWVudSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwiaW5mby1tZW51XCIpO1xyXG4gICAgbGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIG1lbnUuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGhlYWRpbmcgPSBoZWFkaW5nc1tpXTtcclxuICAgICAgICBsZXQgbGluayA9ICQuYXR0cigkLmNyZWF0ZShcImFcIiwgaGVhZGluZy50ZXh0Q29udGVudCksIFwiaHJlZlwiLFxyXG4gICAgICAgICAgICBcIiNcIiArIGhlYWRpbmcuaWQpO1xyXG4gICAgICAgIGxldCBsaSA9ICQuY3JlYXRlKFwibGlcIiwgbGluayk7XHJcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXHJcbiAgICAgICAgaGVhZGluZ09mZnNldHNbaV0gPSB7IGhlYWRpbmcsIGxpIH1cclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICBsZXQgcG9zID0gd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2VcclxuICAgICAgICBsZXQgcHJldjogeyBoZWFkaW5nOiBIVE1MSGVhZEVsZW1lbnQsIGxpOiBIVE1MRWxlbWVudCB9ID0gbnVsbFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ09mZnNldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhvID0gaGVhZGluZ09mZnNldHNbaV1cclxuICAgICAgICAgICAgaG8ubGkuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKVxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kICYmIGhvLmhlYWRpbmcub2Zmc2V0VG9wID4gKHBvcyArIGhvLmhlYWRpbmcub2Zmc2V0SGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgKHByZXYgfHwgaG8pLmxpLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIilcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXYgPSBob1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvdW5kICYmIHByZXYpXHJcbiAgICAgICAgICAgIHByZXYubGkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKVxyXG4gICAgfSlcclxufSIsImltcG9ydCBcIi4vbGF5b3V0Lmxlc3NcIlxyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9teXF1ZXJ5XCJcclxuaW1wb3J0IHsgdG9nZ2xlQ2xhc3NPbkNsaWNrIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL3BvcHVwc1wiXHJcblxyXG4vLyBIb29rIGhhbWJ1cmdlciBpY29uIHRvIGNsb3Npbmcgc2lkZSBwYW5lLlxyXG5sZXQgbGF5b3V0ID0gJC5lbGVtZW50c1dpdGhTdHlsZShcImxheW91dFwiKVswXVxyXG5pZiAobGF5b3V0KSB7XHJcbiAgICBsZXQgaGFtYiA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwiaGFtYnVyZ2VyXCIsIGxheW91dClcclxuICAgIHRvZ2dsZUNsYXNzT25DbGljayhoYW1iLCBcImV4cGFuZGVkXCIsIFxyXG4gICAgICAgIGxheW91dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2libGVcIikpXHJcbiAgICBcclxuICAgIC8vIFNldCB0aGUgdG9wIG9mZnNldCBvZiBzdGlja3kgcGFuZS5cclxuICAgIGxldCBzdGlja3lwYW5lID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJzdGlja3lwYW5lXCIpXHJcbiAgICBsZXQgc3RpY2t5U3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHN0aWNreXBhbmUpXHJcbiAgICBsZXQgaW5pdGlhbFN0aWNreVRvcCA9IHBhcnNlSW50KHN0aWNreVN0eWxlLnRvcCwgMTApXHJcbiAgICBzZXRTdGlja3lUb3AoKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U3RpY2t5VG9wKSAgICBcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2V0U3RpY2t5VG9wKCkge1xyXG4gICAgICAgIGxldCBvZmZzID0gTWF0aC5taW4oKHdpbmRvdy5pbm5lckhlaWdodCAtIHN0aWNreXBhbmUub2Zmc2V0SGVpZ2h0KSAvIDIsIFxyXG4gICAgICAgICAgICBpbml0aWFsU3RpY2t5VG9wKVxyXG4gICAgICAgIHN0aWNreXBhbmUuc3R5bGUudG9wID0gYCR7b2Zmc31weGBcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IFwiLi9uYXZiYXIubGVzc1wiO1xyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCIuLi9jb21tb24vbXlxdWVyeVwiO1xyXG5pbXBvcnQgeyB0b2dnbGVDbGFzc09uQ2xpY2sgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vcG9wdXBzXCI7XHJcblxyXG4vLyBTZXQgdXAgcmVzcG9uc2l2ZSBtZW51LlxyXG5sZXQgbmF2YmFyID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoJC5uYXZiYXIpO1xyXG5sZXQgaGFtYiA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKCQuaGFtYnVyZ2VyLCBuYXZiYXIpO1xyXG5sZXQgaGlkZGVuID0gZmFsc2U7XHJcbnRvZ2dsZUNsYXNzT25DbGljayhoYW1iLCAkLmV4cGFuZGVkLCBuYXZiYXIpO1xyXG5cclxuLy8gSGlkZSBuYXZiYXIgd2hlbiBzY3JvbGxpbmcgZG93bi5cclxubGV0IGRvY2tlZFRvcCA9IG5hdmJhci5vZmZzZXRUb3AgPT09IDA7XHJcbmxldCBwcmV2U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICB2YXIgY3VyclNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIHNldE5hdmJhck9mZnNldChkb2NrZWRUb3AsIFxyXG4gICAgICAgIHByZXZTY3JvbGwgPiBjdXJyU2Nyb2xsID8gMCA6IC0obmF2YmFyLm9mZnNldEhlaWdodCAtIChkb2NrZWRUb3AgPyAxIDogMikpKTsgXHJcbiAgICBwcmV2U2Nyb2xsID0gY3VyclNjcm9sbDtcclxufSk7XHJcbm5hdmJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XHJcbiAgICBpZiAoaGlkZGVuKVxyXG4gICAgICAgIHNldE5hdmJhck9mZnNldChkb2NrZWRUb3AsIDApO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNldE5hdmJhck9mZnNldChkb2NrZWRUb3A6IGJvb2xlYW4sIG9mZnM6IG51bWJlcikge1xyXG4gICAgaGlkZGVuID0gb2ZmcyAhPT0gMDtcclxuICAgIGlmICghbmF2YmFyLmNsYXNzTGlzdC5jb250YWlucygkLmV4cGFuZGVkKSkge1xyXG4gICAgICAgIGlmIChkb2NrZWRUb3ApXHJcbiAgICAgICAgICAgIG5hdmJhci5zdHlsZS50b3AgPSBgJHtvZmZzfXB4YDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIG5hdmJhci5zdHlsZS5ib3R0b20gPSBgJHtvZmZzfXB4YDtcclxuICAgICAgICBuYXZiYXIuc3R5bGUub3BhY2l0eSA9IGhpZGRlbiA/IFwiMFwiIDogXCIxXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBcIi4vcGFnZW1lbnUubGVzc1wiXHJcbmltcG9ydCAqIGFzICQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL215cXVlcnlcIlxyXG5cclxubGV0IHBhZ2VtZW51ID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInBhZ2VtZW51XCIpWzBdXHJcbmlmIChwYWdlbWVudSkge1xyXG4gICAgbGV0IGhlYWRpbmdPZmZzZXRzOiB7IGhlYWRpbmc6IEhUTUxFbGVtZW50LCBsaW5rOiBIVE1MRWxlbWVudCB9W10gPSBbXVxyXG4gICAgbGV0IGNvbnRlbnRhcmVhID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJjb250ZW50YXJlYVwiKVxyXG4gICAgbGV0IHBhZ2V0cmVlID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJwYWdldHJlZVwiLCBwYWdlbWVudSlcclxuICAgIGxldCBoZWFkaW5ncyA9IGNvbnRlbnRhcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMSwgaDIsIGgzLCBoNCwgaDVcIilcclxuICAgIGJ1aWxkVHJlZShwYWdldHJlZSwgbnVsbCwgMSwgaGVhZGluZ3MsIDApXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlXHJcbiAgICAgICAgbGV0IHByZXY6IHsgaGVhZGluZzogSFRNTEVsZW1lbnQsIGxpbms6IEhUTUxFbGVtZW50IH0gPSBudWxsXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5nT2Zmc2V0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaG8gPSBoZWFkaW5nT2Zmc2V0c1tpXVxyXG4gICAgICAgICAgICBoby5saW5rLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHRcIilcclxuICAgICAgICAgICAgaWYgKCFmb3VuZCAmJiBoby5oZWFkaW5nLm9mZnNldFRvcCA+IChwb3MgKyBoby5oZWFkaW5nLm9mZnNldEhlaWdodCkpIHtcclxuICAgICAgICAgICAgICAgIChwcmV2IHx8IGhvKS5saW5rLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIilcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXYgPSBob1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvdW5kICYmIHByZXYpXHJcbiAgICAgICAgICAgIHByZXYubGluay5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpXHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ1aWxkVHJlZShwYXJlbnRMaXN0OiBIVE1MRWxlbWVudCwgcHJldkl0ZW06IEhUTUxFbGVtZW50LCBcclxuICAgICAgICBsZXZlbDogbnVtYmVyLCBoZWFkaW5nczogTm9kZUxpc3RPZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGhlYWRpbmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGluZyA9IGhlYWRpbmdzW2luZGV4XSBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgICAgICBsZXQgY3VyckxldmVsID0gcGFyc2VJbnQoaGVhZGluZy50YWdOYW1lLnN1YnN0cigxLCAxKSlcclxuICAgICAgICAgICAgaWYgKGN1cnJMZXZlbCA8IGxldmVsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4XHJcbiAgICAgICAgICAgIGlmIChjdXJyTGV2ZWwgPiBsZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ykxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcclxuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5hcHBlbmRDaGlsZChzdWJMaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHN1Ykxpc3QsIG51bGwsIGN1cnJMZXZlbCwgaGVhZGluZ3MsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIG51bGwsIGN1cnJMZXZlbCwgaGVhZGluZ3MsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5rID0gJC5hdHRyKCQuY3JlYXRlKFwiYVwiLCBoZWFkaW5nLnRleHRDb250ZW50KSwgXCJocmVmXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiI1wiICsgaGVhZGluZy5pZCkgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0SXRlbSA9ICQuY3JlYXRlKFwibGlcIiwgbGluaylcclxuICAgICAgICAgICAgICAgIHBhcmVudExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pXHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nT2Zmc2V0c1tpbmRleF0gPSB7IGhlYWRpbmcsIGxpbmsgfVxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUocGFyZW50TGlzdCwgbGlzdEl0ZW0sIGxldmVsLCBoZWFkaW5ncywgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggKyAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFwiLi90b2NtZW51Lmxlc3NcIlxyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9teXF1ZXJ5XCJcclxuaW1wb3J0IHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb24vYWNjb3JkaW9uXCJcclxuXHJcbmxldCB0b2NtZW51ID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInRvY21lbnVcIilbMF0gYXMgSFRNTEVsZW1lbnRcclxuaWYgKHRvY21lbnUpIHtcclxuICAgIGlmICghZG9jdW1lbnQuZm9udHMgfHwgZG9jdW1lbnQuZm9udHMuc3RhdHVzID09IFwibG9hZGVkXCIpXHJcbiAgICAgICAgaW5pdEFjY29yZGlvbnModG9jbWVudSlcclxuICAgIGVsc2VcclxuICAgICAgICBkb2N1bWVudC5mb250cy5vbmxvYWRpbmdkb25lID0gKCkgPT4gaW5pdEFjY29yZGlvbnModG9jbWVudSlcclxufSIsImltcG9ydCAqIGFzICQgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uL215cXVlcnlcIlxyXG5pbXBvcnQgJy4vdG9vbHRpcHMubGVzcydcclxuXHJcbi8vIGxldCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykuZm9yRWFjaChlbGVtID0+IFxyXG4gICAgdG9vbHRpcChlbGVtIGFzIEhUTUxFbGVtZW50LCBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIikpKVxyXG5cclxuY29uc3QgaWQgPSBcInRvb2x0aXBcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvb2x0aXAoZWxlbTogSFRNTEVsZW1lbnQsIHRleHQ6IHN0cmluZykge1xyXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gc2hvd1Rvb2x0aXAoZWxlbSwgdGV4dCkpXHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoaWRlVG9vbHRpcClcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1Rvb2x0aXAoZWxlbTogSFRNTEVsZW1lbnQsIGNvbnRlbnRzPzogc3RyaW5nKSB7XHJcbiAgICBoaWRlVG9vbHRpcCgpXHJcbiAgICBpZiAoIWNvbnRlbnRzKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgbGV0IHR0ID0gJC5jcmVhdGUoJ2xlZ2VuZCcpXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHR0KVxyXG4gICAgdHQuaWQgPSBpZFxyXG4gICAgdHQuaW5uZXJIVE1MID0gY29udGVudHMucmVwbGFjZSgvPT4vZywgXCLih5JcIilcclxuICAgIGxldCBiYiA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgIHR0LnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGJiLmxlZnQpICsgd2luZG93LnNjcm9sbFh9cHhgXHJcbiAgICB0dC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKGJiLnRvcCkgKyB3aW5kb3cuc2Nyb2xsWX1weGBcclxuICAgIHR0LnN0eWxlLm9wYWNpdHkgPSBcIjk1JVwiXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVUb29sdGlwKCkge1xyXG4gICAgbGV0IHR0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXHJcbiAgICBpZiAodHQpXHJcbiAgICAgICAgdHQucmVtb3ZlKClcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL21haW4ubGVzc1wiO1xyXG5pbXBvcnQgXCIuL2hhbWJ1cmdlci9oYW1idXJnZXJcIjtcclxuaW1wb3J0IFwiLi9uYXZiYXIvbmF2YmFyXCI7XHJcbmltcG9ydCBcIi4vbGF5b3V0L2xheW91dFwiO1xyXG5pbXBvcnQgXCIuL3RvY21lbnUvdG9jbWVudVwiO1xyXG5pbXBvcnQgXCIuL2NvbnRlbnRhcmVhL2NvbnRlbnRhcmVhXCI7XHJcbmltcG9ydCBcIi4vcGFnZW1lbnUvcGFnZW1lbnVcIjtcclxuaW1wb3J0IFwiLi9mb290ZXIvZm9vdGVyXCI7XHJcbmltcG9ydCBcIi4vdG9vbHRpcHMvdG9vbHRpcHNcIjtcclxuaW1wb3J0IFwiLi9sYW5kaW5nXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9