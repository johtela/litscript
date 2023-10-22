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
    setTimeout(initAccordions, 1000);
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

/***/ "./site/components/footer/footer.css":
/*!*******************************************!*\
  !*** ./site/components/footer/footer.css ***!
  \*******************************************/
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
__webpack_require__(/*! ../../../site/components/footer/footer.css */ "./site/components/footer/footer.css");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQU8sQ0FBQywrREFBZ0M7QUFDeEMsbUJBQU8sQ0FBQyxpRUFBaUM7QUFDekMsbUJBQU8sQ0FBQyxvRUFBMkI7QUFDbkMsbUJBQU8sQ0FBQyw2RUFBdUM7QUFDL0MsbUJBQU8sQ0FBQyw4RUFBZ0M7QUFDeEMsbUJBQU8sQ0FBQyx1RkFBNEM7QUFDcEQsbUJBQU8sQ0FBQywwRkFBc0M7QUFDOUMsbUJBQU8sQ0FBQyxtR0FBa0Q7QUFDMUQsbUJBQU8sQ0FBQyxrRkFBa0M7QUFDMUMsbUJBQU8sQ0FBQywyRkFBOEM7QUFDdEQsbUJBQU8sQ0FBQyxrRkFBa0M7QUFDMUMsbUJBQU8sQ0FBQywyRkFBOEM7QUFDdEQsbUJBQU8sQ0FBQywyR0FBc0Q7QUFDOUQsbUJBQU8sQ0FBQyxzRkFBb0M7QUFDNUMsbUJBQU8sQ0FBQywrRkFBZ0Q7QUFDeEQsbUJBQU8sQ0FBQyx1RkFBNEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvcGFnZXMvbm9ybWFsL25vcm1hbC5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL2NvbXBvbmVudHMvY29udGVudGFyZWEvY29udGVudGFyZWEuY3NzP2U4NDciLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY3NzPzEwMzIiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuY3NzP2VlNzgiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY3NzPzM4M2YiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51LmNzcz9kYzI0Iiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuY3NzPzkwY2QiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5jc3M/NTQ3ZiIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL3BhZ2VzL25vcm1hbC9ub3JtYWwuY3NzPzA5ODUiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9zdHlsZXMvc3ludGF4LmNzcz82ODhiIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvc3R5bGVzL3RoZW1lLmNzcz80ZDg4Iiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9tYWluL25vcm1hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9nZ2xlQ2xhc3NPbkNsaWNrID0gZXhwb3J0cy5wb3B1cE9uQ2xpY2sgPSBleHBvcnRzLmluaXRBY2NvcmRpb25zID0gZXhwb3J0cy5hdHRyID0gZXhwb3J0cy5jcmVhdGUgPSBleHBvcnRzLmVhY2ggPSBleHBvcnRzLmlzSFRNTENvbGxlY3Rpb24gPSBleHBvcnRzLmVsZW1lbnRzV2l0aFN0eWxlID0gZXhwb3J0cy5maXJzdEVsZW1lbnRXaXRoU3R5bGUgPSBleHBvcnRzLmVsZW1lbnRXaXRoSWQgPSBleHBvcnRzLmluZm9ib3ggPSBleHBvcnRzLmNsb3NlcG9wdXBzID0gZXhwb3J0cy5zY3JvbGxpbmdhcmVhID0gZXhwb3J0cy5uYXZtZW51ID0gZXhwb3J0cy5uYXZiYXIgPSBleHBvcnRzLmhhbWJ1cmdlciA9IGV4cG9ydHMuYWNjb3JkaW9uID0gZXhwb3J0cy5jb2xsYXBzZWQgPSBleHBvcnRzLmV4cGFuZGVkID0gdm9pZCAwO1xuZXhwb3J0cy5leHBhbmRlZCA9IFwiZXhwYW5kZWRcIjtcbmV4cG9ydHMuY29sbGFwc2VkID0gXCJjb2xsYXBzZWRcIjtcbmV4cG9ydHMuYWNjb3JkaW9uID0gXCJhY2NvcmRpb25cIjtcbmV4cG9ydHMuaGFtYnVyZ2VyID0gXCJoYW1idXJnZXJcIjtcbmV4cG9ydHMubmF2YmFyID0gXCJuYXZiYXJcIjtcbmV4cG9ydHMubmF2bWVudSA9IFwibmF2bWVudVwiO1xuZXhwb3J0cy5zY3JvbGxpbmdhcmVhID0gXCJzY3JvbGxpbmdhcmVhXCI7XG5leHBvcnRzLmNsb3NlcG9wdXBzID0gXCJjbG9zZXBvcHVwc1wiO1xuZXhwb3J0cy5pbmZvYm94ID0gXCJpbmZvLWJveFwiO1xuZnVuY3Rpb24gZWxlbWVudFdpdGhJZChpZCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG59XG5leHBvcnRzLmVsZW1lbnRXaXRoSWQgPSBlbGVtZW50V2l0aElkO1xuZnVuY3Rpb24gZmlyc3RFbGVtZW50V2l0aFN0eWxlKGNsYXNzTmFtZSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcbiAgICBsZXQgcmVzID0gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICBpZiAoIXJlcylcbiAgICAgICAgdGhyb3cgUmVmZXJlbmNlRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBjbGFzcyBcIiR7Y2xhc3NOYW1lfVwiLmApO1xuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLmZpcnN0RWxlbWVudFdpdGhTdHlsZSA9IGZpcnN0RWxlbWVudFdpdGhTdHlsZTtcbmZ1bmN0aW9uIGVsZW1lbnRzV2l0aFN0eWxlKGNsYXNzTmFtZSwgcGFyZW50ID0gZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbn1cbmV4cG9ydHMuZWxlbWVudHNXaXRoU3R5bGUgPSBlbGVtZW50c1dpdGhTdHlsZTtcbmZ1bmN0aW9uIGlzSFRNTENvbGxlY3Rpb24oZWxlbSkge1xuICAgIHJldHVybiBlbGVtLmxlbmd0aCAhPT0gdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5pc0hUTUxDb2xsZWN0aW9uID0gaXNIVE1MQ29sbGVjdGlvbjtcbmZ1bmN0aW9uIGVhY2goZWxlbSwgYWN0aW9uKSB7XG4gICAgaWYgKGlzSFRNTENvbGxlY3Rpb24oZWxlbSkpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGFjdGlvbihlbGVtW2ldKTtcbiAgICBlbHNlXG4gICAgICAgIGFjdGlvbihlbGVtKTtcbn1cbmV4cG9ydHMuZWFjaCA9IGVhY2g7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBjaGlsZHJlbiA9IG51bGwpIHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoY2hpbGRyZW4pID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZHJlbikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlYWNoKGNoaWxkcmVuLCBjID0+IGVsZW0uYXBwZW5kQ2hpbGQoYykpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbTtcbn1cbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuZnVuY3Rpb24gYXR0cihlbGVtLCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgZWFjaChlbGVtLCBlID0+IGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpKTtcbiAgICByZXR1cm4gZWxlbTtcbn1cbmV4cG9ydHMuYXR0ciA9IGF0dHI7XG5mdW5jdGlvbiBpbml0QWNjb3JkaW9ucyhlbGVtZW50KSB7XG4gICAgbGV0IGFjY29yZGlvbnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZXhwb3J0cy5hY2NvcmRpb24pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjb3JkaW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgYWNjID0gYWNjb3JkaW9uc1tpXTtcbiAgICAgICAgbGV0IHBhbmVsID0gYWNjLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IGluaXRIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IGluaXRIZWlnaHQ7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoZXhwb3J0cy5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID09PSBcIjBweFwiID9cbiAgICAgICAgICAgICAgICBpbml0SGVpZ2h0IDogXCIwcHhcIjtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmluaXRBY2NvcmRpb25zID0gaW5pdEFjY29yZGlvbnM7XG5mdW5jdGlvbiBwb3B1cE9uQ2xpY2soZWxlbWVudCwgdG9nZ2xlLCBoaWRlKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlKTtcbiAgICBsZXQgY2xvc2VFbGVtID0gZmlyc3RFbGVtZW50V2l0aFN0eWxlKGV4cG9ydHMuY2xvc2Vwb3B1cHMpO1xuICAgIGNsb3NlRWxlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoaWRlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5wb3B1cE9uQ2xpY2sgPSBwb3B1cE9uQ2xpY2s7XG5mdW5jdGlvbiB0b2dnbGVDbGFzc09uQ2xpY2soZWxlbWVudCwgY2xzLCB0YXJnZXQgPSBlbGVtZW50LCB1cGRhdGUpIHtcbiAgICBwb3B1cE9uQ2xpY2soZWxlbWVudCwgKCkgPT4ge1xuICAgICAgICBlYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC50b2dnbGUoY2xzKSk7XG4gICAgICAgIHVwZGF0ZSA9PT0gbnVsbCB8fCB1cGRhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVwZGF0ZSgpO1xuICAgIH0sICgpID0+IHtcbiAgICAgICAgZWFjaCh0YXJnZXQsIGUgPT4gZS5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgICAgICB1cGRhdGUgPT09IG51bGwgfHwgdXBkYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1cGRhdGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudG9nZ2xlQ2xhc3NPbkNsaWNrID0gdG9nZ2xlQ2xhc3NPbkNsaWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgJCA9IHJlcXVpcmUoXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vblwiKTtcbiQuZWFjaCgkLmVsZW1lbnRzV2l0aFN0eWxlKCQuaGFtYnVyZ2VyKSwgaGFtYiA9PiAkLnRvZ2dsZUNsYXNzT25DbGljayhoYW1iLCBcIm9wZW5cIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGFtYnVyZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgJCA9IHJlcXVpcmUoXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vblwiKTtcbi8vIFNldCB1cCByZXNwb25zaXZlIG1lbnUuXG5sZXQgbmF2YmFyID0gJC5lbGVtZW50V2l0aElkKCQubmF2YmFyKTtcbmxldCBuYXZtZW51ID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoJC5uYXZtZW51LCBuYXZiYXIpO1xubGV0IGhhbWIgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZSgkLmhhbWJ1cmdlciwgbmF2YmFyKTtcbmxldCBoaWRkZW4gPSBmYWxzZTtcbiQudG9nZ2xlQ2xhc3NPbkNsaWNrKGhhbWIsICQuZXhwYW5kZWQsIG5hdmJhciwgcmVzaXplTmF2YmFyKTtcbnJlc2l6ZU5hdmJhcigpO1xuLy8gSGlkZSBuYXZiYXIgd2hlbiBzY3JvbGxpbmcgZG93bi5cbmxldCBwcmV2U2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgdmFyIGN1cnJTY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBzZXROYXZiYXJPZmZzZXQocHJldlNjcm9sbCA+IGN1cnJTY3JvbGwgPyAwIDogLW5hdmJhci5vZmZzZXRIZWlnaHQgKyAxKTtcbiAgICBwcmV2U2Nyb2xsID0gY3VyclNjcm9sbDtcbn0pO1xubmF2YmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICBpZiAoaGlkZGVuKVxuICAgICAgICBzZXROYXZiYXJPZmZzZXQoMCk7XG59KTtcbmZ1bmN0aW9uIHNldE5hdmJhck9mZnNldChvZmZzKSB7XG4gICAgaGlkZGVuID0gb2ZmcyAhPT0gMDtcbiAgICBpZiAoIW5hdmJhci5jbGFzc0xpc3QuY29udGFpbnMoJC5leHBhbmRlZCkpIHtcbiAgICAgICAgbmF2YmFyLnN0eWxlLnRvcCA9IGAke29mZnN9cHhgO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlc2l6ZU5hdmJhcigpIHtcbiAgICBuYXZiYXIuc3R5bGUuaGVpZ2h0ID0gbmF2bWVudS5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZiYXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xubGV0IHBhZ2VtZW51ID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInBhZ2VtZW51XCIpWzBdO1xuaWYgKHBhZ2VtZW51KSB7XG4gICAgbGV0IGhlYWRpbmdPZmZzZXRzID0gW107XG4gICAgbGV0IGNvbnRlbnRhcmVhID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJjb250ZW50YXJlYVwiKTtcbiAgICBsZXQgcGFnZXRyZWUgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcInBhZ2V0cmVlXCIsIHBhZ2VtZW51KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBjb250ZW50YXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiaDEsIGgyLCBoMywgaDQsIGg1XCIpO1xuICAgIGJ1aWxkVHJlZShwYWdldHJlZSwgbnVsbCwgMSwgaGVhZGluZ3MsIDApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgbGV0IHBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdPZmZzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaG8gPSBoZWFkaW5nT2Zmc2V0c1tpXTtcbiAgICAgICAgICAgIGhvLmxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgICAgIGlmICghZm91bmQgJiYgaG8uaGVhZGluZy5vZmZzZXRUb3AgPiAocG9zICsgaG8uaGVhZGluZy5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgKHByZXYgfHwgaG8pLmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2ID0gaG87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBwcmV2KVxuICAgICAgICAgICAgcHJldi5saW5rLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIik7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gYnVpbGRUcmVlKHBhcmVudExpc3QsIHByZXZJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIGluZGV4KSB7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGhlYWRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGhlYWRpbmcgPSBoZWFkaW5nc1tpbmRleF07XG4gICAgICAgICAgICBsZXQgY3VyckxldmVsID0gcGFyc2VJbnQoaGVhZGluZy50YWdOYW1lLnN1YnN0cmluZygxKSk7XG4gICAgICAgICAgICBpZiAoY3VyckxldmVsIDwgbGV2ZWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgaWYgKGN1cnJMZXZlbCA+IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWJMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5hcHBlbmRDaGlsZChzdWJMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUoc3ViTGlzdCwgbnVsbCwgY3VyckxldmVsLCBoZWFkaW5ncywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIG51bGwsIGN1cnJMZXZlbCwgaGVhZGluZ3MsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBsaW5rID0gJC5hdHRyKCQuY3JlYXRlKFwiYVwiLCBoZWFkaW5nLnRleHRDb250ZW50KSwgXCJocmVmXCIsIFwiI1wiICsgaGVhZGluZy5pZCk7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RJdGVtID0gJC5jcmVhdGUoXCJsaVwiLCBsaW5rKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBoZWFkaW5nT2Zmc2V0c1tpbmRleF0gPSB7IGhlYWRpbmcsIGxpbmsgfTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShwYXJlbnRMaXN0LCBsaXN0SXRlbSwgbGV2ZWwsIGhlYWRpbmdzLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlbWVudS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSB2b2lkIDA7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xubGV0IHRvY21lbnUgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcInRvY21lbnVcIik7XG5pZiAodG9jbWVudSkge1xuICAgIHNldFRpbWVvdXQoaW5pdEFjY29yZGlvbnMsIDEwMDApO1xufVxuZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMoKSB7XG4gICAgJC5lYWNoKCQuZWxlbWVudHNXaXRoU3R5bGUoJC5hY2NvcmRpb24sIHRvY21lbnUpLCBhY2MgPT4ge1xuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBvcGVuUGFuZWwoYWNjLCBwYW5lbCk7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoJC5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgdG9nZ2xlUGFuZWwoYWNjLCBwYW5lbCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmluaXRBY2NvcmRpb25zID0gaW5pdEFjY29yZGlvbnM7XG5mdW5jdGlvbiBvcGVuUGFuZWwoYWNjLCBwYW5lbCkge1xuICAgIGxldCBjbG9zZWQgPSBwYW5lbENsb3NlZChwYW5lbCk7XG4gICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgIGlmIChjbG9zZWQpXG4gICAgICAgIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCk7XG59XG5mdW5jdGlvbiB0b2dnbGVQYW5lbChhY2MsIHBhbmVsKSB7XG4gICAgbGV0IGNsb3NlZCA9IHBhbmVsQ2xvc2VkKHBhbmVsKTtcbiAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBjbG9zZWQgP1xuICAgICAgICBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCIgOiBcIjBweFwiO1xuICAgIGlmIChjbG9zZWQpXG4gICAgICAgIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCk7XG59XG5mdW5jdGlvbiBwYW5lbENsb3NlZChwYW5lbCkge1xuICAgIHJldHVybiBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPT0gXCIwcHhcIjtcbn1cbmZ1bmN0aW9uIHJlc2l6ZVBhcmVudHMoYWNjLCBwYW5lbCkge1xuICAgIGxldCBwYXJlbnQgPSBwYXJlbnRQYW5lbChhY2MpO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LnN0eWxlLm1heEhlaWdodCA9XG4gICAgICAgICAgICAocGFyZW50LnNjcm9sbEhlaWdodCArIHBhbmVsLnNjcm9sbEhlaWdodCkgKyBcInB4XCI7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudFBhbmVsKHBhcmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyZW50UGFuZWwoYWNjKSB7XG4gICAgbGV0IGVsZW0gPSBhY2MucGFyZW50RWxlbWVudDtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLnRhZ05hbWUgPT0gXCJVTFwiIHx8IGVsZW0udGFnTmFtZSA9PSBcIkxJXCIpIHtcbiAgICAgICAgaWYgKGVsZW0udGFnTmFtZSA9PSBcIlVMXCIgJiZcbiAgICAgICAgICAgIGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJC5hY2NvcmRpb24pKVxuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIGVsZW0gPSBlbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9jbWVudS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9vbHRpcCA9IHZvaWQgMDtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vY29tbW9uXCIpO1xuY29uc3QgaWQgPSBcInRvb2x0aXBcIjtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS5mb3JFYWNoKGVsZW0gPT4gdG9vbHRpcChlbGVtLCBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIikpKTtcbmZ1bmN0aW9uIHRvb2x0aXAoZWxlbSwgdGV4dCkge1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHNob3dUb29sdGlwKGVsZW0sIHRleHQpKTtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoaWRlVG9vbHRpcCk7XG59XG5leHBvcnRzLnRvb2x0aXAgPSB0b29sdGlwO1xuZnVuY3Rpb24gc2hvd1Rvb2x0aXAoZWxlbSwgY29udGVudHMpIHtcbiAgICBoaWRlVG9vbHRpcCgpO1xuICAgIGlmICghY29udGVudHMpXG4gICAgICAgIHJldHVybjtcbiAgICBsZXQgdHQgPSAkLmNyZWF0ZSgnbGVnZW5kJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0dCk7XG4gICAgdHQuaWQgPSBpZDtcbiAgICB0dC5pbm5lckhUTUwgPSBjb250ZW50cy5yZXBsYWNlKC89Pi9nLCBcIuKHklwiKTtcbiAgICBsZXQgYmIgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHR0LnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGJiLmxlZnQpICsgd2luZG93LnNjcm9sbFh9cHhgO1xuICAgIHR0LnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQoYmIudG9wKSArIHdpbmRvdy5zY3JvbGxZfXB4YDtcbiAgICB0dC5zdHlsZS5vcGFjaXR5ID0gXCI5NSVcIjtcbn1cbmZ1bmN0aW9uIGhpZGVUb29sdGlwKCkge1xuICAgIGxldCB0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAodHQpXG4gICAgICAgIHR0LnJlbW92ZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5jb25zdCB0b2NtZW51XzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy90b2NtZW51L3RvY21lbnVcIik7XG5jb25zdCB0b2NidXR0b24gPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwidG9jLWJ1dHRvblwiKVswXTtcbmNvbnN0IGxheW91dCA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJsYXlvdXRcIilbMF07XG5jb25zdCBjb250ZW50YXJlYSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJjb250ZW50YXJlYVwiKVswXTtcbmNvbnN0IHRvY29wZW4gPSBcInRvYy1vcGVuXCI7XG50b2NidXR0b24ub25tb3VzZWRvd24gPSAoKSA9PiB7XG4gICAgbGF5b3V0LmNsYXNzTGlzdC5hZGQodG9jb3Blbik7XG4gICAgbGF5b3V0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICAgICAgKDAsIHRvY21lbnVfMS5pbml0QWNjb3JkaW9ucykoKTtcbiAgICAgICAgbGF5b3V0Lm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgfTtcbn07XG5jb250ZW50YXJlYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICBsYXlvdXQuY2xhc3NMaXN0LnJlbW92ZSh0b2NvcGVuKTtcbn0sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbC5qcy5tYXAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9zdHlsZXMvdGhlbWUuY3NzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvc3R5bGVzL3N5bnRheC5jc3NcIik7XG5yZXF1aXJlKFwiLi4vcGFnZXMvbm9ybWFsL25vcm1hbC5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL3BhZ2VzL25vcm1hbC9ub3JtYWwuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oYW1idXJnZXIvaGFtYnVyZ2VyLmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy9oYW1idXJnZXIvaGFtYnVyZ2VyLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51LmNzc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvY29udGVudGFyZWEvY29udGVudGFyZWEuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL3BhZ2VtZW51L3BhZ2VtZW51LmNzc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jc3NcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=