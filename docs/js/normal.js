/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/site/components/common.js":
/*!***************************************!*\
  !*** ./lib/site/components/common.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toggleClassOnClick = exports.popupOnClick = exports.initAccordions = exports.attr = exports.create = exports.each = exports.isHTMLCollection = exports.elementsWithStyle = exports.firstElementWithStyle = exports.elementWithId = exports.infobox = exports.closepopups = exports.scrollingarea = exports.navmenu = exports.navbar = exports.hamburger = exports.accordion = exports.collapsed = exports.expanded = void 0;
exports.expanded = "expanded";
exports.collapsed = "collapsed";
exports.accordion = "accordion";
exports.hamburger = "hamburger";
exports.navbar = "navbar";
exports.navmenu = "navmenu";
exports.scrollingarea = "scrollingarea";
exports.closepopups = "closepopups";
exports.infobox = "info-box";
function elementWithId(id) {
    return document.getElementById(id);
}
exports.elementWithId = elementWithId;
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
function initAccordions(element) {
    let accordions = element.getElementsByClassName(exports.accordion);
    for (let i = 0; i < accordions.length; ++i) {
        let acc = accordions[i];
        let panel = acc.nextElementSibling;
        let initHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = initHeight;
        acc.onclick = () => {
            acc.classList.toggle(exports.collapsed);
            panel.style.maxHeight = panel.style.maxHeight === "0px" ?
                initHeight : "0px";
        };
    }
}
exports.initAccordions = initAccordions;
function popupOnClick(element, toggle, hide) {
    element.addEventListener("click", toggle);
    let closeElem = firstElementWithStyle(exports.closepopups);
    closeElem.addEventListener("mouseup", hide);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape")
            hide();
    });
}
exports.popupOnClick = popupOnClick;
function toggleClassOnClick(element, cls, target = element, update) {
    popupOnClick(element, () => {
        each(target, e => e.classList.toggle(cls));
        update === null || update === void 0 ? void 0 : update();
    }, () => {
        each(target, e => e.classList.remove(cls));
        update === null || update === void 0 ? void 0 : update();
    });
}
exports.toggleClassOnClick = toggleClassOnClick;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./lib/site/components/hamburger/hamburger.js":
/*!****************************************************!*\
  !*** ./lib/site/components/hamburger/hamburger.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
$.each($.elementsWithStyle($.hamburger), hamb => $.toggleClassOnClick(hamb, "open"));
//# sourceMappingURL=hamburger.js.map

/***/ }),

/***/ "./lib/site/components/navbar/navbar.js":
/*!**********************************************!*\
  !*** ./lib/site/components/navbar/navbar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
// Set up responsive menu.
let navbar = $.elementWithId($.navbar);
let navmenu = $.firstElementWithStyle($.navmenu, navbar);
let hamb = $.firstElementWithStyle($.hamburger, navbar);
let hidden = false;
$.toggleClassOnClick(hamb, $.expanded, navbar, resizeNavbar);
resizeNavbar();
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
function setNavbarOffset(offs) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        navbar.style.top = `${offs}px`;
    }
}
function resizeNavbar() {
    navbar.style.height = navmenu.scrollHeight + "px";
}
//# sourceMappingURL=navbar.js.map

/***/ }),

/***/ "./lib/site/components/pagemenu/pagemenu.js":
/*!**************************************************!*\
  !*** ./lib/site/components/pagemenu/pagemenu.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
let pagemenu = $.elementsWithStyle("pagemenu")[0];
if (pagemenu) {
    let headingOffsets = [];
    let contentarea = $.firstElementWithStyle("contentarea");
    let pagetree = $.firstElementWithStyle("pagetree", pagemenu);
    let headings = contentarea.querySelectorAll("h1, h2, h3, h4, h5");
    buildTree(pagetree, null, 1, headings, 0);
    window.addEventListener("scroll", () => {
        let pos = window.scrollY;
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
            let currLevel = parseInt(heading.tagName.substring(1));
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
//# sourceMappingURL=pagemenu.js.map

/***/ }),

/***/ "./lib/site/components/tocmenu/tocmenu.js":
/*!************************************************!*\
  !*** ./lib/site/components/tocmenu/tocmenu.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initAccordions = void 0;
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
let tocmenu = $.firstElementWithStyle("tocmenu");
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        initAccordions();
    else
        document.fonts.onloadingdone = () => initAccordions();
}
function initAccordions() {
    $.each($.elementsWithStyle($.accordion, tocmenu), acc => {
        let panel = acc.nextElementSibling;
        openPanel(acc, panel);
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            togglePanel(acc, panel);
        };
    });
}
exports.initAccordions = initAccordions;
function openPanel(acc, panel) {
    let closed = panelClosed(panel);
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (closed)
        resizeParents(acc, panel);
}
function togglePanel(acc, panel) {
    let closed = panelClosed(panel);
    panel.style.maxHeight = closed ?
        panel.scrollHeight + "px" : "0px";
    if (closed)
        resizeParents(acc, panel);
}
function panelClosed(panel) {
    return panel.style.maxHeight == "0px";
}
function resizeParents(acc, panel) {
    let parent = parentPanel(acc);
    while (parent) {
        parent.style.maxHeight =
            (parent.scrollHeight + panel.scrollHeight) + "px";
        parent = parentPanel(parent);
    }
}
function parentPanel(acc) {
    let elem = acc.parentElement;
    while (elem && elem.tagName == "UL" || elem.tagName == "LI") {
        if (elem.tagName == "UL" &&
            elem.previousElementSibling.classList.contains($.accordion))
            return elem;
        elem = elem.parentElement;
    }
    return null;
}
//# sourceMappingURL=tocmenu.js.map

/***/ }),

/***/ "./lib/site/components/tooltip/tooltip.js":
/*!************************************************!*\
  !*** ./lib/site/components/tooltip/tooltip.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tooltip = void 0;
const $ = __webpack_require__(/*! ../common */ "./lib/site/components/common.js");
const id = "tooltip";
document.querySelectorAll('[data-toggle="tooltip"]').forEach(elem => tooltip(elem, elem.getAttribute("data-title")));
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
//# sourceMappingURL=tooltip.js.map

/***/ }),

/***/ "./lib/site/pages/normal/normal.js":
/*!*****************************************!*\
  !*** ./lib/site/pages/normal/normal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
const tocmenu_1 = __webpack_require__(/*! ../../components/tocmenu/tocmenu */ "./lib/site/components/tocmenu/tocmenu.js");
const tocbutton = $.elementsWithStyle("toc-button")[0];
const layout = $.elementsWithStyle("layout")[0];
const contentarea = $.elementsWithStyle("contentarea")[0];
const tocopen = "toc-open";
tocbutton.onmousedown = () => {
    layout.classList.add(tocopen);
    layout.ontransitionend = () => {
        (0, tocmenu_1.initAccordions)();
        layout.ontransitionend = null;
    };
};
contentarea.addEventListener("mousedown", () => {
    layout.classList.remove(tocopen);
}, { capture: true });
//# sourceMappingURL=normal.js.map

/***/ }),

/***/ "./site/components/contentarea/contentarea.css":
/*!*****************************************************!*\
  !*** ./site/components/contentarea/contentarea.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/components/hamburger/hamburger.css":
/*!*************************************************!*\
  !*** ./site/components/hamburger/hamburger.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/components/navbar/navbar.css":
/*!*******************************************!*\
  !*** ./site/components/navbar/navbar.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/components/pagemenu/pagemenu.css":
/*!***********************************************!*\
  !*** ./site/components/pagemenu/pagemenu.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/components/tocmenu/tocmenu.css":
/*!*********************************************!*\
  !*** ./site/components/tocmenu/tocmenu.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/components/tooltip/tooltip.css":
/*!*********************************************!*\
  !*** ./site/components/tooltip/tooltip.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/pages/normal/normal.css":
/*!**************************************!*\
  !*** ./site/pages/normal/normal.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/styles/syntax.css":
/*!********************************!*\
  !*** ./site/styles/syntax.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./site/styles/theme.css":
/*!*******************************!*\
  !*** ./site/styles/theme.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!*********************************!*\
  !*** ./lib/site/main/normal.js ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../../../site/styles/theme.css */ "./site/styles/theme.css");
__webpack_require__(/*! ../../../site/styles/syntax.css */ "./site/styles/syntax.css");
__webpack_require__(/*! ../pages/normal/normal.js */ "./lib/site/pages/normal/normal.js");
__webpack_require__(/*! ../../../site/pages/normal/normal.css */ "./site/pages/normal/normal.css");
__webpack_require__(/*! ../components/navbar/navbar.js */ "./lib/site/components/navbar/navbar.js");
__webpack_require__(/*! ../../../site/components/navbar/navbar.css */ "./site/components/navbar/navbar.css");
__webpack_require__(/*! ../components/hamburger/hamburger.js */ "./lib/site/components/hamburger/hamburger.js");
__webpack_require__(/*! ../../../site/components/hamburger/hamburger.css */ "./site/components/hamburger/hamburger.css");
__webpack_require__(/*! ../components/tooltip/tooltip.js */ "./lib/site/components/tooltip/tooltip.js");
__webpack_require__(/*! ../../../site/components/tooltip/tooltip.css */ "./site/components/tooltip/tooltip.css");
__webpack_require__(/*! ../components/tocmenu/tocmenu.js */ "./lib/site/components/tocmenu/tocmenu.js");
__webpack_require__(/*! ../../../site/components/tocmenu/tocmenu.css */ "./site/components/tocmenu/tocmenu.css");
__webpack_require__(/*! ../../../site/components/contentarea/contentarea.css */ "./site/components/contentarea/contentarea.css");
__webpack_require__(/*! ../components/pagemenu/pagemenu.js */ "./lib/site/components/pagemenu/pagemenu.js");
__webpack_require__(/*! ../../../site/components/pagemenu/pagemenu.css */ "./site/components/pagemenu/pagemenu.css");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBTyxDQUFDLCtEQUFnQztBQUN4QyxtQkFBTyxDQUFDLGlFQUFpQztBQUN6QyxtQkFBTyxDQUFDLG9FQUEyQjtBQUNuQyxtQkFBTyxDQUFDLDZFQUF1QztBQUMvQyxtQkFBTyxDQUFDLDhFQUFnQztBQUN4QyxtQkFBTyxDQUFDLHVGQUE0QztBQUNwRCxtQkFBTyxDQUFDLDBGQUFzQztBQUM5QyxtQkFBTyxDQUFDLG1HQUFrRDtBQUMxRCxtQkFBTyxDQUFDLGtGQUFrQztBQUMxQyxtQkFBTyxDQUFDLDJGQUE4QztBQUN0RCxtQkFBTyxDQUFDLGtGQUFrQztBQUMxQyxtQkFBTyxDQUFDLDJGQUE4QztBQUN0RCxtQkFBTyxDQUFDLDJHQUFzRDtBQUM5RCxtQkFBTyxDQUFDLHNGQUFvQztBQUM1QyxtQkFBTyxDQUFDLCtGQUFnRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvY29tbW9uLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9wYWdlcy9ub3JtYWwvbm9ybWFsLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy9jb250ZW50YXJlYS9jb250ZW50YXJlYS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNzcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvcGFnZXMvbm9ybWFsL25vcm1hbC5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9zdHlsZXMvc3ludGF4LmNzcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL3N0eWxlcy90aGVtZS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL21haW4vbm9ybWFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b2dnbGVDbGFzc09uQ2xpY2sgPSBleHBvcnRzLnBvcHVwT25DbGljayA9IGV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSBleHBvcnRzLmF0dHIgPSBleHBvcnRzLmNyZWF0ZSA9IGV4cG9ydHMuZWFjaCA9IGV4cG9ydHMuaXNIVE1MQ29sbGVjdGlvbiA9IGV4cG9ydHMuZWxlbWVudHNXaXRoU3R5bGUgPSBleHBvcnRzLmZpcnN0RWxlbWVudFdpdGhTdHlsZSA9IGV4cG9ydHMuZWxlbWVudFdpdGhJZCA9IGV4cG9ydHMuaW5mb2JveCA9IGV4cG9ydHMuY2xvc2Vwb3B1cHMgPSBleHBvcnRzLnNjcm9sbGluZ2FyZWEgPSBleHBvcnRzLm5hdm1lbnUgPSBleHBvcnRzLm5hdmJhciA9IGV4cG9ydHMuaGFtYnVyZ2VyID0gZXhwb3J0cy5hY2NvcmRpb24gPSBleHBvcnRzLmNvbGxhcHNlZCA9IGV4cG9ydHMuZXhwYW5kZWQgPSB2b2lkIDA7XG5leHBvcnRzLmV4cGFuZGVkID0gXCJleHBhbmRlZFwiO1xuZXhwb3J0cy5jb2xsYXBzZWQgPSBcImNvbGxhcHNlZFwiO1xuZXhwb3J0cy5hY2NvcmRpb24gPSBcImFjY29yZGlvblwiO1xuZXhwb3J0cy5oYW1idXJnZXIgPSBcImhhbWJ1cmdlclwiO1xuZXhwb3J0cy5uYXZiYXIgPSBcIm5hdmJhclwiO1xuZXhwb3J0cy5uYXZtZW51ID0gXCJuYXZtZW51XCI7XG5leHBvcnRzLnNjcm9sbGluZ2FyZWEgPSBcInNjcm9sbGluZ2FyZWFcIjtcbmV4cG9ydHMuY2xvc2Vwb3B1cHMgPSBcImNsb3NlcG9wdXBzXCI7XG5leHBvcnRzLmluZm9ib3ggPSBcImluZm8tYm94XCI7XG5mdW5jdGlvbiBlbGVtZW50V2l0aElkKGlkKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn1cbmV4cG9ydHMuZWxlbWVudFdpdGhJZCA9IGVsZW1lbnRXaXRoSWQ7XG5mdW5jdGlvbiBmaXJzdEVsZW1lbnRXaXRoU3R5bGUoY2xhc3NOYW1lLCBwYXJlbnQgPSBkb2N1bWVudCkge1xuICAgIGxldCByZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICAgIGlmICghcmVzKVxuICAgICAgICB0aHJvdyBSZWZlcmVuY2VFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGNsYXNzIFwiJHtjbGFzc05hbWV9XCIuYCk7XG4gICAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMuZmlyc3RFbGVtZW50V2l0aFN0eWxlID0gZmlyc3RFbGVtZW50V2l0aFN0eWxlO1xuZnVuY3Rpb24gZWxlbWVudHNXaXRoU3R5bGUoY2xhc3NOYW1lLCBwYXJlbnQgPSBkb2N1bWVudCkge1xuICAgIHJldHVybiBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xufVxuZXhwb3J0cy5lbGVtZW50c1dpdGhTdHlsZSA9IGVsZW1lbnRzV2l0aFN0eWxlO1xuZnVuY3Rpb24gaXNIVE1MQ29sbGVjdGlvbihlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0ubGVuZ3RoICE9PSB1bmRlZmluZWQ7XG59XG5leHBvcnRzLmlzSFRNTENvbGxlY3Rpb24gPSBpc0hUTUxDb2xsZWN0aW9uO1xuZnVuY3Rpb24gZWFjaChlbGVtLCBhY3Rpb24pIHtcbiAgICBpZiAoaXNIVE1MQ29sbGVjdGlvbihlbGVtKSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYWN0aW9uKGVsZW1baV0pO1xuICAgIGVsc2VcbiAgICAgICAgYWN0aW9uKGVsZW0pO1xufVxuZXhwb3J0cy5lYWNoID0gZWFjaDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIGNoaWxkcmVuID0gbnVsbCkge1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBpZiAodHlwZW9mIChjaGlsZHJlbikgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkcmVuKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVhY2goY2hpbGRyZW4sIGMgPT4gZWxlbS5hcHBlbmRDaGlsZChjKSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtO1xufVxuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XG5mdW5jdGlvbiBhdHRyKGVsZW0sIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBlYWNoKGVsZW0sIGUgPT4gZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSkpO1xuICAgIHJldHVybiBlbGVtO1xufVxuZXhwb3J0cy5hdHRyID0gYXR0cjtcbmZ1bmN0aW9uIGluaXRBY2NvcmRpb25zKGVsZW1lbnQpIHtcbiAgICBsZXQgYWNjb3JkaW9ucyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShleHBvcnRzLmFjY29yZGlvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2NvcmRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBhY2MgPSBhY2NvcmRpb25zW2ldO1xuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgaW5pdEhlaWdodCA9IHBhbmVsLnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gaW5pdEhlaWdodDtcbiAgICAgICAgYWNjLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBhY2MuY2xhc3NMaXN0LnRvZ2dsZShleHBvcnRzLmNvbGxhcHNlZCk7XG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPT09IFwiMHB4XCIgP1xuICAgICAgICAgICAgICAgIGluaXRIZWlnaHQgOiBcIjBweFwiO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSBpbml0QWNjb3JkaW9ucztcbmZ1bmN0aW9uIHBvcHVwT25DbGljayhlbGVtZW50LCB0b2dnbGUsIGhpZGUpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGUpO1xuICAgIGxldCBjbG9zZUVsZW0gPSBmaXJzdEVsZW1lbnRXaXRoU3R5bGUoZXhwb3J0cy5jbG9zZXBvcHVwcyk7XG4gICAgY2xvc2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpZGUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpXG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnBvcHVwT25DbGljayA9IHBvcHVwT25DbGljaztcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzT25DbGljayhlbGVtZW50LCBjbHMsIHRhcmdldCA9IGVsZW1lbnQsIHVwZGF0ZSkge1xuICAgIHBvcHVwT25DbGljayhlbGVtZW50LCAoKSA9PiB7XG4gICAgICAgIGVhY2godGFyZ2V0LCBlID0+IGUuY2xhc3NMaXN0LnRvZ2dsZShjbHMpKTtcbiAgICAgICAgdXBkYXRlID09PSBudWxsIHx8IHVwZGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXBkYXRlKCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgICBlYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgICAgIHVwZGF0ZSA9PT0gbnVsbCB8fCB1cGRhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVwZGF0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50b2dnbGVDbGFzc09uQ2xpY2sgPSB0b2dnbGVDbGFzc09uQ2xpY2s7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21tb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xuJC5lYWNoKCQuZWxlbWVudHNXaXRoU3R5bGUoJC5oYW1idXJnZXIpLCBoYW1iID0+ICQudG9nZ2xlQ2xhc3NPbkNsaWNrKGhhbWIsIFwib3BlblwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oYW1idXJnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xuLy8gU2V0IHVwIHJlc3BvbnNpdmUgbWVudS5cbmxldCBuYXZiYXIgPSAkLmVsZW1lbnRXaXRoSWQoJC5uYXZiYXIpO1xubGV0IG5hdm1lbnUgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZSgkLm5hdm1lbnUsIG5hdmJhcik7XG5sZXQgaGFtYiA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKCQuaGFtYnVyZ2VyLCBuYXZiYXIpO1xubGV0IGhpZGRlbiA9IGZhbHNlO1xuJC50b2dnbGVDbGFzc09uQ2xpY2soaGFtYiwgJC5leHBhbmRlZCwgbmF2YmFyLCByZXNpemVOYXZiYXIpO1xucmVzaXplTmF2YmFyKCk7XG4vLyBIaWRlIG5hdmJhciB3aGVuIHNjcm9sbGluZyBkb3duLlxubGV0IHByZXZTY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICB2YXIgY3VyclNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIHNldE5hdmJhck9mZnNldChwcmV2U2Nyb2xsID4gY3VyclNjcm9sbCA/IDAgOiAtbmF2YmFyLm9mZnNldEhlaWdodCArIDEpO1xuICAgIHByZXZTY3JvbGwgPSBjdXJyU2Nyb2xsO1xufSk7XG5uYXZiYXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgIGlmIChoaWRkZW4pXG4gICAgICAgIHNldE5hdmJhck9mZnNldCgwKTtcbn0pO1xuZnVuY3Rpb24gc2V0TmF2YmFyT2Zmc2V0KG9mZnMpIHtcbiAgICBoaWRkZW4gPSBvZmZzICE9PSAwO1xuICAgIGlmICghbmF2YmFyLmNsYXNzTGlzdC5jb250YWlucygkLmV4cGFuZGVkKSkge1xuICAgICAgICBuYXZiYXIuc3R5bGUudG9wID0gYCR7b2Zmc31weGA7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzaXplTmF2YmFyKCkge1xuICAgIG5hdmJhci5zdHlsZS5oZWlnaHQgPSBuYXZtZW51LnNjcm9sbEhlaWdodCArIFwicHhcIjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgcGFnZW1lbnUgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwicGFnZW1lbnVcIilbMF07XG5pZiAocGFnZW1lbnUpIHtcbiAgICBsZXQgaGVhZGluZ09mZnNldHMgPSBbXTtcbiAgICBsZXQgY29udGVudGFyZWEgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcImNvbnRlbnRhcmVhXCIpO1xuICAgIGxldCBwYWdldHJlZSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwicGFnZXRyZWVcIiwgcGFnZW1lbnUpO1xuICAgIGxldCBoZWFkaW5ncyA9IGNvbnRlbnRhcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMSwgaDIsIGgzLCBoNCwgaDVcIik7XG4gICAgYnVpbGRUcmVlKHBhZ2V0cmVlLCBudWxsLCAxLCBoZWFkaW5ncywgMCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcG9zID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ09mZnNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBobyA9IGhlYWRpbmdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgaG8ubGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgaWYgKCFmb3VuZCAmJiBoby5oZWFkaW5nLm9mZnNldFRvcCA+IChwb3MgKyBoby5oZWFkaW5nLm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAocHJldiB8fCBobykubGluay5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSBobztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIHByZXYpXG4gICAgICAgICAgICBwcmV2LmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBidWlsZFRyZWUocGFyZW50TGlzdCwgcHJldkl0ZW0sIGxldmVsLCBoZWFkaW5ncywgaW5kZXgpIHtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgaGVhZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGluZyA9IGhlYWRpbmdzW2luZGV4XTtcbiAgICAgICAgICAgIGxldCBjdXJyTGV2ZWwgPSBwYXJzZUludChoZWFkaW5nLnRhZ05hbWUuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgIGlmIChjdXJyTGV2ZWwgPCBsZXZlbClcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICBpZiAoY3VyckxldmVsID4gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ykxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmFwcGVuZENoaWxkKHN1Ykxpc3QpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShzdWJMaXN0LCBudWxsLCBjdXJyTGV2ZWwsIGhlYWRpbmdzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUocGFyZW50TGlzdCwgbnVsbCwgY3VyckxldmVsLCBoZWFkaW5ncywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmsgPSAkLmF0dHIoJC5jcmVhdGUoXCJhXCIsIGhlYWRpbmcudGV4dENvbnRlbnQpLCBcImhyZWZcIiwgXCIjXCIgKyBoZWFkaW5nLmlkKTtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdEl0ZW0gPSAkLmNyZWF0ZShcImxpXCIsIGxpbmspO1xuICAgICAgICAgICAgICAgIHBhcmVudExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIGhlYWRpbmdPZmZzZXRzW2luZGV4XSA9IHsgaGVhZGluZywgbGluayB9O1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIGxpc3RJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VtZW51LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0QWNjb3JkaW9ucyA9IHZvaWQgMDtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgdG9jbWVudSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwidG9jbWVudVwiKTtcbmlmICh0b2NtZW51KSB7XG4gICAgaWYgKCFkb2N1bWVudC5mb250cyB8fCBkb2N1bWVudC5mb250cy5zdGF0dXMgPT0gXCJsb2FkZWRcIilcbiAgICAgICAgaW5pdEFjY29yZGlvbnMoKTtcbiAgICBlbHNlXG4gICAgICAgIGRvY3VtZW50LmZvbnRzLm9ubG9hZGluZ2RvbmUgPSAoKSA9PiBpbml0QWNjb3JkaW9ucygpO1xufVxuZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMoKSB7XG4gICAgJC5lYWNoKCQuZWxlbWVudHNXaXRoU3R5bGUoJC5hY2NvcmRpb24sIHRvY21lbnUpLCBhY2MgPT4ge1xuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBvcGVuUGFuZWwoYWNjLCBwYW5lbCk7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoJC5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgdG9nZ2xlUGFuZWwoYWNjLCBwYW5lbCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmluaXRBY2NvcmRpb25zID0gaW5pdEFjY29yZGlvbnM7XG5mdW5jdGlvbiBvcGVuUGFuZWwoYWNjLCBwYW5lbCkge1xuICAgIGxldCBjbG9zZWQgPSBwYW5lbENsb3NlZChwYW5lbCk7XG4gICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgIGlmIChjbG9zZWQpXG4gICAgICAgIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCk7XG59XG5mdW5jdGlvbiB0b2dnbGVQYW5lbChhY2MsIHBhbmVsKSB7XG4gICAgbGV0IGNsb3NlZCA9IHBhbmVsQ2xvc2VkKHBhbmVsKTtcbiAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBjbG9zZWQgP1xuICAgICAgICBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCIgOiBcIjBweFwiO1xuICAgIGlmIChjbG9zZWQpXG4gICAgICAgIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCk7XG59XG5mdW5jdGlvbiBwYW5lbENsb3NlZChwYW5lbCkge1xuICAgIHJldHVybiBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPT0gXCIwcHhcIjtcbn1cbmZ1bmN0aW9uIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCkge1xuICAgIGxldCBwYXJlbnQgPSBwYXJlbnRQYW5lbChhY2MpO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LnN0eWxlLm1heEhlaWdodCA9XG4gICAgICAgICAgICAocGFyZW50LnNjcm9sbEhlaWdodCArIHBhbmVsLnNjcm9sbEhlaWdodCkgKyBcInB4XCI7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudFBhbmVsKHBhcmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyZW50UGFuZWwoYWNjKSB7XG4gICAgbGV0IGVsZW0gPSBhY2MucGFyZW50RWxlbWVudDtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLnRhZ05hbWUgPT0gXCJVTFwiIHx8IGVsZW0udGFnTmFtZSA9PSBcIkxJXCIpIHtcbiAgICAgICAgaWYgKGVsZW0udGFnTmFtZSA9PSBcIlVMXCIgJiZcbiAgICAgICAgICAgIGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJC5hY2NvcmRpb24pKVxuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIGVsZW0gPSBlbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9jbWVudS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9vbHRpcCA9IHZvaWQgMDtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vY29tbW9uXCIpO1xuY29uc3QgaWQgPSBcInRvb2x0aXBcIjtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS5mb3JFYWNoKGVsZW0gPT4gdG9vbHRpcChlbGVtLCBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIikpKTtcbmZ1bmN0aW9uIHRvb2x0aXAoZWxlbSwgdGV4dCkge1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHNob3dUb29sdGlwKGVsZW0sIHRleHQpKTtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoaWRlVG9vbHRpcCk7XG59XG5leHBvcnRzLnRvb2x0aXAgPSB0b29sdGlwO1xuZnVuY3Rpb24gc2hvd1Rvb2x0aXAoZWxlbSwgY29udGVudHMpIHtcbiAgICBoaWRlVG9vbHRpcCgpO1xuICAgIGlmICghY29udGVudHMpXG4gICAgICAgIHJldHVybjtcbiAgICBsZXQgdHQgPSAkLmNyZWF0ZSgnbGVnZW5kJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0dCk7XG4gICAgdHQuaWQgPSBpZDtcbiAgICB0dC5pbm5lckhUTUwgPSBjb250ZW50cy5yZXBsYWNlKC89Pi9nLCBcIuKHklwiKTtcbiAgICBsZXQgYmIgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHR0LnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGJiLmxlZnQpICsgd2luZG93LnNjcm9sbFh9cHhgO1xuICAgIHR0LnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQoYmIudG9wKSArIHdpbmRvdy5zY3JvbGxZfXB4YDtcbiAgICB0dC5zdHlsZS5vcGFjaXR5ID0gXCI5NSVcIjtcbn1cbmZ1bmN0aW9uIGhpZGVUb29sdGlwKCkge1xuICAgIGxldCB0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAodHQpXG4gICAgICAgIHR0LnJlbW92ZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5jb25zdCB0b2NtZW51XzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy90b2NtZW51L3RvY21lbnVcIik7XG5jb25zdCB0b2NidXR0b24gPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwidG9jLWJ1dHRvblwiKVswXTtcbmNvbnN0IGxheW91dCA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJsYXlvdXRcIilbMF07XG5jb25zdCBjb250ZW50YXJlYSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJjb250ZW50YXJlYVwiKVswXTtcbmNvbnN0IHRvY29wZW4gPSBcInRvYy1vcGVuXCI7XG50b2NidXR0b24ub25tb3VzZWRvd24gPSAoKSA9PiB7XG4gICAgbGF5b3V0LmNsYXNzTGlzdC5hZGQodG9jb3Blbik7XG4gICAgbGF5b3V0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICAgICAgKDAsIHRvY21lbnVfMS5pbml0QWNjb3JkaW9ucykoKTtcbiAgICAgICAgbGF5b3V0Lm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgfTtcbn07XG5jb250ZW50YXJlYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICBsYXlvdXQuY2xhc3NMaXN0LnJlbW92ZSh0b2NvcGVuKTtcbn0sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbC5qcy5tYXAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9zdHlsZXMvdGhlbWUuY3NzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvc3R5bGVzL3N5bnRheC5jc3NcIik7XG5yZXF1aXJlKFwiLi4vcGFnZXMvbm9ybWFsL25vcm1hbC5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL3BhZ2VzL25vcm1hbC9ub3JtYWwuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oYW1idXJnZXIvaGFtYnVyZ2VyLmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy9oYW1idXJnZXIvaGFtYnVyZ2VyLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51LmNzc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvY29udGVudGFyZWEvY29udGVudGFyZWEuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51LmNzc1wiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==