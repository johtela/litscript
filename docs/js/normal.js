/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/site/components/common.js":
/*!***************************************!*\
  !*** ./lib/site/components/common.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toggleClassOnClick = exports.popupOnClick = exports.initAccordions = exports.attr = exports.create = exports.each = exports.isHTMLCollection = exports.elementsWithStyle = exports.firstElementWithStyle = exports.elementWithId = exports.infobox = exports.closepopups = exports.scrollingarea = exports.navbar = exports.hamburger = exports.accordion = exports.collapsed = exports.expanded = void 0;
exports.expanded = "expanded";
exports.collapsed = "collapsed";
exports.accordion = "accordion";
exports.hamburger = "hamburger";
exports.navbar = "navbar";
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
function toggleClassOnClick(element, cls, target = element) {
    popupOnClick(element, () => each(target, e => e.classList.toggle(cls)), () => each(target, e => e.classList.remove(cls)));
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
function setNavbarOffset(offs) {
    hidden = offs !== 0;
    if (!navbar.classList.contains($.expanded)) {
        navbar.style.top = `${offs}px`;
    }
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
let tocmenu = $.elementsWithStyle("tocmenu")[0];
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        initAccordions();
    else
        document.fonts.onloadingdone = () => initAccordions();
}
function initAccordions() {
    let accordions = tocmenu.getElementsByClassName($.accordion);
    for (let i = 0; i < accordions.length; ++i) {
        let acc = accordions[i];
        let panel = acc.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
        acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            let closed = panel.style.maxHeight == "0px";
            panel.style.maxHeight = closed ?
                panel.scrollHeight + "px" : "0px";
            if (closed) {
                let parent = parentPanel(acc);
                while (parent) {
                    parent.style.maxHeight =
                        (parent.scrollHeight + panel.scrollHeight) + "px";
                    parent = parentPanel(parent);
                }
            }
        };
    }
}
exports.initAccordions = initAccordions;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG9FQUEyQjtBQUNuQyxtQkFBTyxDQUFDLDZFQUF1QztBQUMvQyxtQkFBTyxDQUFDLDhFQUFnQztBQUN4QyxtQkFBTyxDQUFDLHVGQUE0QztBQUNwRCxtQkFBTyxDQUFDLDBGQUFzQztBQUM5QyxtQkFBTyxDQUFDLG1HQUFrRDtBQUMxRCxtQkFBTyxDQUFDLGtGQUFrQztBQUMxQyxtQkFBTyxDQUFDLDJGQUE4QztBQUN0RCxtQkFBTyxDQUFDLGtGQUFrQztBQUMxQyxtQkFBTyxDQUFDLDJGQUE4QztBQUN0RCxtQkFBTyxDQUFDLDJHQUFzRDtBQUM5RCxtQkFBTyxDQUFDLHNGQUFvQztBQUM1QyxtQkFBTyxDQUFDLCtGQUFnRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvY29tbW9uLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9wYWdlcy9ub3JtYWwvbm9ybWFsLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy9jb250ZW50YXJlYS9jb250ZW50YXJlYS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNzcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvcGFnZXMvbm9ybWFsL25vcm1hbC5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9zdHlsZXMvc3ludGF4LmNzcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL3N0eWxlcy90aGVtZS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL21haW4vbm9ybWFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b2dnbGVDbGFzc09uQ2xpY2sgPSBleHBvcnRzLnBvcHVwT25DbGljayA9IGV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSBleHBvcnRzLmF0dHIgPSBleHBvcnRzLmNyZWF0ZSA9IGV4cG9ydHMuZWFjaCA9IGV4cG9ydHMuaXNIVE1MQ29sbGVjdGlvbiA9IGV4cG9ydHMuZWxlbWVudHNXaXRoU3R5bGUgPSBleHBvcnRzLmZpcnN0RWxlbWVudFdpdGhTdHlsZSA9IGV4cG9ydHMuZWxlbWVudFdpdGhJZCA9IGV4cG9ydHMuaW5mb2JveCA9IGV4cG9ydHMuY2xvc2Vwb3B1cHMgPSBleHBvcnRzLnNjcm9sbGluZ2FyZWEgPSBleHBvcnRzLm5hdmJhciA9IGV4cG9ydHMuaGFtYnVyZ2VyID0gZXhwb3J0cy5hY2NvcmRpb24gPSBleHBvcnRzLmNvbGxhcHNlZCA9IGV4cG9ydHMuZXhwYW5kZWQgPSB2b2lkIDA7XG5leHBvcnRzLmV4cGFuZGVkID0gXCJleHBhbmRlZFwiO1xuZXhwb3J0cy5jb2xsYXBzZWQgPSBcImNvbGxhcHNlZFwiO1xuZXhwb3J0cy5hY2NvcmRpb24gPSBcImFjY29yZGlvblwiO1xuZXhwb3J0cy5oYW1idXJnZXIgPSBcImhhbWJ1cmdlclwiO1xuZXhwb3J0cy5uYXZiYXIgPSBcIm5hdmJhclwiO1xuZXhwb3J0cy5zY3JvbGxpbmdhcmVhID0gXCJzY3JvbGxpbmdhcmVhXCI7XG5leHBvcnRzLmNsb3NlcG9wdXBzID0gXCJjbG9zZXBvcHVwc1wiO1xuZXhwb3J0cy5pbmZvYm94ID0gXCJpbmZvLWJveFwiO1xuZnVuY3Rpb24gZWxlbWVudFdpdGhJZChpZCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG59XG5leHBvcnRzLmVsZW1lbnRXaXRoSWQgPSBlbGVtZW50V2l0aElkO1xuZnVuY3Rpb24gZmlyc3RFbGVtZW50V2l0aFN0eWxlKGNsYXNzTmFtZSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcbiAgICBsZXQgcmVzID0gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICBpZiAoIXJlcylcbiAgICAgICAgdGhyb3cgUmVmZXJlbmNlRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBjbGFzcyBcIiR7Y2xhc3NOYW1lfVwiLmApO1xuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLmZpcnN0RWxlbWVudFdpdGhTdHlsZSA9IGZpcnN0RWxlbWVudFdpdGhTdHlsZTtcbmZ1bmN0aW9uIGVsZW1lbnRzV2l0aFN0eWxlKGNsYXNzTmFtZSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbn1cbmV4cG9ydHMuZWxlbWVudHNXaXRoU3R5bGUgPSBlbGVtZW50c1dpdGhTdHlsZTtcbmZ1bmN0aW9uIGlzSFRNTENvbGxlY3Rpb24oZWxlbSkge1xuICAgIHJldHVybiBlbGVtLmxlbmd0aCAhPT0gdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5pc0hUTUxDb2xsZWN0aW9uID0gaXNIVE1MQ29sbGVjdGlvbjtcbmZ1bmN0aW9uIGVhY2goZWxlbSwgYWN0aW9uKSB7XG4gICAgaWYgKGlzSFRNTENvbGxlY3Rpb24oZWxlbSkpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGFjdGlvbihlbGVtW2ldKTtcbiAgICBlbHNlXG4gICAgICAgIGFjdGlvbihlbGVtKTtcbn1cbmV4cG9ydHMuZWFjaCA9IGVhY2g7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBjaGlsZHJlbiA9IG51bGwpIHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoY2hpbGRyZW4pID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZHJlbikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlYWNoKGNoaWxkcmVuLCBjID0+IGVsZW0uYXBwZW5kQ2hpbGQoYykpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbTtcbn1cbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuZnVuY3Rpb24gYXR0cihlbGVtLCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgZWFjaChlbGVtLCBlID0+IGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpKTtcbiAgICByZXR1cm4gZWxlbTtcbn1cbmV4cG9ydHMuYXR0ciA9IGF0dHI7XG5mdW5jdGlvbiBpbml0QWNjb3JkaW9ucyhlbGVtZW50KSB7XG4gICAgbGV0IGFjY29yZGlvbnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZXhwb3J0cy5hY2NvcmRpb24pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjb3JkaW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgYWNjID0gYWNjb3JkaW9uc1tpXTtcbiAgICAgICAgbGV0IHBhbmVsID0gYWNjLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IGluaXRIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IGluaXRIZWlnaHQ7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoZXhwb3J0cy5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID09PSBcIjBweFwiID9cbiAgICAgICAgICAgICAgICBpbml0SGVpZ2h0IDogXCIwcHhcIjtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmluaXRBY2NvcmRpb25zID0gaW5pdEFjY29yZGlvbnM7XG5mdW5jdGlvbiBwb3B1cE9uQ2xpY2soZWxlbWVudCwgdG9nZ2xlLCBoaWRlKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlKTtcbiAgICBsZXQgY2xvc2VFbGVtID0gZmlyc3RFbGVtZW50V2l0aFN0eWxlKGV4cG9ydHMuY2xvc2Vwb3B1cHMpO1xuICAgIGNsb3NlRWxlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoaWRlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5wb3B1cE9uQ2xpY2sgPSBwb3B1cE9uQ2xpY2s7XG5mdW5jdGlvbiB0b2dnbGVDbGFzc09uQ2xpY2soZWxlbWVudCwgY2xzLCB0YXJnZXQgPSBlbGVtZW50KSB7XG4gICAgcG9wdXBPbkNsaWNrKGVsZW1lbnQsICgpID0+IGVhY2godGFyZ2V0LCBlID0+IGUuY2xhc3NMaXN0LnRvZ2dsZShjbHMpKSwgKCkgPT4gZWFjaCh0YXJnZXQsIGUgPT4gZS5jbGFzc0xpc3QucmVtb3ZlKGNscykpKTtcbn1cbmV4cG9ydHMudG9nZ2xlQ2xhc3NPbkNsaWNrID0gdG9nZ2xlQ2xhc3NPbkNsaWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgJCA9IHJlcXVpcmUoXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vblwiKTtcbiQuZWFjaCgkLmVsZW1lbnRzV2l0aFN0eWxlKCQuaGFtYnVyZ2VyKSwgaGFtYiA9PiAkLnRvZ2dsZUNsYXNzT25DbGljayhoYW1iLCBcIm9wZW5cIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGFtYnVyZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgJCA9IHJlcXVpcmUoXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vblwiKTtcbi8vIFNldCB1cCByZXNwb25zaXZlIG1lbnUuXG5sZXQgbmF2YmFyID0gJC5lbGVtZW50V2l0aElkKCQubmF2YmFyKTtcbmxldCBoYW1iID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoJC5oYW1idXJnZXIsIG5hdmJhcik7XG5sZXQgaGlkZGVuID0gZmFsc2U7XG4kLnRvZ2dsZUNsYXNzT25DbGljayhoYW1iLCAkLmV4cGFuZGVkLCBuYXZiYXIpO1xuLy8gSGlkZSBuYXZiYXIgd2hlbiBzY3JvbGxpbmcgZG93bi5cbmxldCBwcmV2U2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgdmFyIGN1cnJTY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBzZXROYXZiYXJPZmZzZXQocHJldlNjcm9sbCA+IGN1cnJTY3JvbGwgPyAwIDogLW5hdmJhci5vZmZzZXRIZWlnaHQgKyAxKTtcbiAgICBwcmV2U2Nyb2xsID0gY3VyclNjcm9sbDtcbn0pO1xubmF2YmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICBpZiAoaGlkZGVuKVxuICAgICAgICBzZXROYXZiYXJPZmZzZXQoMCk7XG59KTtcbmZ1bmN0aW9uIHNldE5hdmJhck9mZnNldChvZmZzKSB7XG4gICAgaGlkZGVuID0gb2ZmcyAhPT0gMDtcbiAgICBpZiAoIW5hdmJhci5jbGFzc0xpc3QuY29udGFpbnMoJC5leHBhbmRlZCkpIHtcbiAgICAgICAgbmF2YmFyLnN0eWxlLnRvcCA9IGAke29mZnN9cHhgO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgcGFnZW1lbnUgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwicGFnZW1lbnVcIilbMF07XG5pZiAocGFnZW1lbnUpIHtcbiAgICBsZXQgaGVhZGluZ09mZnNldHMgPSBbXTtcbiAgICBsZXQgY29udGVudGFyZWEgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcImNvbnRlbnRhcmVhXCIpO1xuICAgIGxldCBwYWdldHJlZSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwicGFnZXRyZWVcIiwgcGFnZW1lbnUpO1xuICAgIGxldCBoZWFkaW5ncyA9IGNvbnRlbnRhcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMSwgaDIsIGgzLCBoNCwgaDVcIik7XG4gICAgYnVpbGRUcmVlKHBhZ2V0cmVlLCBudWxsLCAxLCBoZWFkaW5ncywgMCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcG9zID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ09mZnNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBobyA9IGhlYWRpbmdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgaG8ubGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgaWYgKCFmb3VuZCAmJiBoby5oZWFkaW5nLm9mZnNldFRvcCA+IChwb3MgKyBoby5oZWFkaW5nLm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAocHJldiB8fCBobykubGluay5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSBobztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIHByZXYpXG4gICAgICAgICAgICBwcmV2LmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBidWlsZFRyZWUocGFyZW50TGlzdCwgcHJldkl0ZW0sIGxldmVsLCBoZWFkaW5ncywgaW5kZXgpIHtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgaGVhZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGluZyA9IGhlYWRpbmdzW2luZGV4XTtcbiAgICAgICAgICAgIGxldCBjdXJyTGV2ZWwgPSBwYXJzZUludChoZWFkaW5nLnRhZ05hbWUuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgIGlmIChjdXJyTGV2ZWwgPCBsZXZlbClcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICBpZiAoY3VyckxldmVsID4gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ykxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmFwcGVuZENoaWxkKHN1Ykxpc3QpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShzdWJMaXN0LCBudWxsLCBjdXJyTGV2ZWwsIGhlYWRpbmdzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUocGFyZW50TGlzdCwgbnVsbCwgY3VyckxldmVsLCBoZWFkaW5ncywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmsgPSAkLmF0dHIoJC5jcmVhdGUoXCJhXCIsIGhlYWRpbmcudGV4dENvbnRlbnQpLCBcImhyZWZcIiwgXCIjXCIgKyBoZWFkaW5nLmlkKTtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdEl0ZW0gPSAkLmNyZWF0ZShcImxpXCIsIGxpbmspO1xuICAgICAgICAgICAgICAgIHBhcmVudExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIGhlYWRpbmdPZmZzZXRzW2luZGV4XSA9IHsgaGVhZGluZywgbGluayB9O1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIGxpc3RJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VtZW51LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0QWNjb3JkaW9ucyA9IHZvaWQgMDtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgdG9jbWVudSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJ0b2NtZW51XCIpWzBdO1xuaWYgKHRvY21lbnUpIHtcbiAgICBpZiAoIWRvY3VtZW50LmZvbnRzIHx8IGRvY3VtZW50LmZvbnRzLnN0YXR1cyA9PSBcImxvYWRlZFwiKVxuICAgICAgICBpbml0QWNjb3JkaW9ucygpO1xuICAgIGVsc2VcbiAgICAgICAgZG9jdW1lbnQuZm9udHMub25sb2FkaW5nZG9uZSA9ICgpID0+IGluaXRBY2NvcmRpb25zKCk7XG59XG5mdW5jdGlvbiBpbml0QWNjb3JkaW9ucygpIHtcbiAgICBsZXQgYWNjb3JkaW9ucyA9IHRvY21lbnUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgkLmFjY29yZGlvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2NvcmRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBhY2MgPSBhY2NvcmRpb25zW2ldO1xuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoJC5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgbGV0IGNsb3NlZCA9IHBhbmVsLnN0eWxlLm1heEhlaWdodCA9PSBcIjBweFwiO1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gY2xvc2VkID9cbiAgICAgICAgICAgICAgICBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCIgOiBcIjBweFwiO1xuICAgICAgICAgICAgaWYgKGNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBwYXJlbnRQYW5lbChhY2MpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LnN0eWxlLm1heEhlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAocGFyZW50LnNjcm9sbEhlaWdodCArIHBhbmVsLnNjcm9sbEhlaWdodCkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudFBhbmVsKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSBpbml0QWNjb3JkaW9ucztcbmZ1bmN0aW9uIHBhcmVudFBhbmVsKGFjYykge1xuICAgIGxldCBlbGVtID0gYWNjLnBhcmVudEVsZW1lbnQ7XG4gICAgd2hpbGUgKGVsZW0gJiYgZWxlbS50YWdOYW1lID09IFwiVUxcIiB8fCBlbGVtLnRhZ05hbWUgPT0gXCJMSVwiKSB7XG4gICAgICAgIGlmIChlbGVtLnRhZ05hbWUgPT0gXCJVTFwiICYmXG4gICAgICAgICAgICBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCQuYWNjb3JkaW9uKSlcbiAgICAgICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvY21lbnUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRvb2x0aXAgPSB2b2lkIDA7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uL2NvbW1vblwiKTtcbmNvbnN0IGlkID0gXCJ0b29sdGlwXCI7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykuZm9yRWFjaChlbGVtID0+IHRvb2x0aXAoZWxlbSwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpdGxlXCIpKSk7XG5mdW5jdGlvbiB0b29sdGlwKGVsZW0sIHRleHQpIHtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiBzaG93VG9vbHRpcChlbGVtLCB0ZXh0KSk7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaGlkZVRvb2x0aXApO1xufVxuZXhwb3J0cy50b29sdGlwID0gdG9vbHRpcDtcbmZ1bmN0aW9uIHNob3dUb29sdGlwKGVsZW0sIGNvbnRlbnRzKSB7XG4gICAgaGlkZVRvb2x0aXAoKTtcbiAgICBpZiAoIWNvbnRlbnRzKVxuICAgICAgICByZXR1cm47XG4gICAgbGV0IHR0ID0gJC5jcmVhdGUoJ2xlZ2VuZCcpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodHQpO1xuICAgIHR0LmlkID0gaWQ7XG4gICAgdHQuaW5uZXJIVE1MID0gY29udGVudHMucmVwbGFjZSgvPT4vZywgXCLih5JcIik7XG4gICAgbGV0IGJiID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0dC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChiYi5sZWZ0KSArIHdpbmRvdy5zY3JvbGxYfXB4YDtcbiAgICB0dC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKGJiLnRvcCkgKyB3aW5kb3cuc2Nyb2xsWX1weGA7XG4gICAgdHQuc3R5bGUub3BhY2l0eSA9IFwiOTUlXCI7XG59XG5mdW5jdGlvbiBoaWRlVG9vbHRpcCgpIHtcbiAgICBsZXQgdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKHR0KVxuICAgICAgICB0dC5yZW1vdmUoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2x0aXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xuY29uc3QgdG9jbWVudV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51XCIpO1xuY29uc3QgdG9jYnV0dG9uID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInRvYy1idXR0b25cIilbMF07XG5jb25zdCBsYXlvdXQgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwibGF5b3V0XCIpWzBdO1xuY29uc3QgY29udGVudGFyZWEgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwiY29udGVudGFyZWFcIilbMF07XG5jb25zdCB0b2NvcGVuID0gXCJ0b2Mtb3BlblwiO1xudG9jYnV0dG9uLm9ubW91c2Vkb3duID0gKCkgPT4ge1xuICAgIGxheW91dC5jbGFzc0xpc3QuYWRkKHRvY29wZW4pO1xuICAgIGxheW91dC5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgICAgICgwLCB0b2NtZW51XzEuaW5pdEFjY29yZGlvbnMpKCk7XG4gICAgICAgIGxheW91dC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgIH07XG59O1xuY29udGVudGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4gICAgbGF5b3V0LmNsYXNzTGlzdC5yZW1vdmUodG9jb3Blbik7XG59LCB7IGNhcHR1cmU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3JtYWwuanMubWFwIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvc3R5bGVzL3RoZW1lLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL3N0eWxlcy9zeW50YXguY3NzXCIpO1xucmVxdWlyZShcIi4uL3BhZ2VzL25vcm1hbC9ub3JtYWwuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9wYWdlcy9ub3JtYWwvbm9ybWFsLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5jc3NcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL2NvbnRlbnRhcmVhL2NvbnRlbnRhcmVhLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51LmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5jc3NcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=