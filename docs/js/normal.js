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
        initAccordions(tocmenu);
    else
        document.fonts.onloadingdone = () => initAccordions(tocmenu);
}
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

/***/ "./site/pages/normal.css":
/*!*******************************!*\
  !*** ./site/pages/normal.css ***!
  \*******************************/
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
__webpack_require__(/*! ../../../site/pages/normal.css */ "./site/pages/normal.css");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL2NvbnRlbnRhcmVhL2NvbnRlbnRhcmVhLmNzcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9zaXRlL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlci5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL3RvY21lbnUvdG9jbWVudS5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9wYWdlcy9ub3JtYWwuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL3NpdGUvc3R5bGVzL3N5bnRheC5jc3MiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vc2l0ZS9zdHlsZXMvdGhlbWUuY3NzIiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9tYWluL25vcm1hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9nZ2xlQ2xhc3NPbkNsaWNrID0gZXhwb3J0cy5wb3B1cE9uQ2xpY2sgPSBleHBvcnRzLmluaXRBY2NvcmRpb25zID0gZXhwb3J0cy5hdHRyID0gZXhwb3J0cy5jcmVhdGUgPSBleHBvcnRzLmVhY2ggPSBleHBvcnRzLmlzSFRNTENvbGxlY3Rpb24gPSBleHBvcnRzLmVsZW1lbnRzV2l0aFN0eWxlID0gZXhwb3J0cy5maXJzdEVsZW1lbnRXaXRoU3R5bGUgPSBleHBvcnRzLmVsZW1lbnRXaXRoSWQgPSBleHBvcnRzLmluZm9ib3ggPSBleHBvcnRzLmNsb3NlcG9wdXBzID0gZXhwb3J0cy5zY3JvbGxpbmdhcmVhID0gZXhwb3J0cy5uYXZiYXIgPSBleHBvcnRzLmhhbWJ1cmdlciA9IGV4cG9ydHMuYWNjb3JkaW9uID0gZXhwb3J0cy5jb2xsYXBzZWQgPSBleHBvcnRzLmV4cGFuZGVkID0gdm9pZCAwO1xuZXhwb3J0cy5leHBhbmRlZCA9IFwiZXhwYW5kZWRcIjtcbmV4cG9ydHMuY29sbGFwc2VkID0gXCJjb2xsYXBzZWRcIjtcbmV4cG9ydHMuYWNjb3JkaW9uID0gXCJhY2NvcmRpb25cIjtcbmV4cG9ydHMuaGFtYnVyZ2VyID0gXCJoYW1idXJnZXJcIjtcbmV4cG9ydHMubmF2YmFyID0gXCJuYXZiYXJcIjtcbmV4cG9ydHMuc2Nyb2xsaW5nYXJlYSA9IFwic2Nyb2xsaW5nYXJlYVwiO1xuZXhwb3J0cy5jbG9zZXBvcHVwcyA9IFwiY2xvc2Vwb3B1cHNcIjtcbmV4cG9ydHMuaW5mb2JveCA9IFwiaW5mby1ib3hcIjtcbmZ1bmN0aW9uIGVsZW1lbnRXaXRoSWQoaWQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuZXhwb3J0cy5lbGVtZW50V2l0aElkID0gZWxlbWVudFdpdGhJZDtcbmZ1bmN0aW9uIGZpcnN0RWxlbWVudFdpdGhTdHlsZShjbGFzc05hbWUsIHBhcmVudCA9IGRvY3VtZW50KSB7XG4gICAgbGV0IHJlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gICAgaWYgKCFyZXMpXG4gICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggY2xhc3MgXCIke2NsYXNzTmFtZX1cIi5gKTtcbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5maXJzdEVsZW1lbnRXaXRoU3R5bGUgPSBmaXJzdEVsZW1lbnRXaXRoU3R5bGU7XG5mdW5jdGlvbiBlbGVtZW50c1dpdGhTdHlsZShjbGFzc05hbWUsIHBhcmVudCA9IGRvY3VtZW50KSB7XG4gICAgcmV0dXJuIHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG59XG5leHBvcnRzLmVsZW1lbnRzV2l0aFN0eWxlID0gZWxlbWVudHNXaXRoU3R5bGU7XG5mdW5jdGlvbiBpc0hUTUxDb2xsZWN0aW9uKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5sZW5ndGggIT09IHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMuaXNIVE1MQ29sbGVjdGlvbiA9IGlzSFRNTENvbGxlY3Rpb247XG5mdW5jdGlvbiBlYWNoKGVsZW0sIGFjdGlvbikge1xuICAgIGlmIChpc0hUTUxDb2xsZWN0aW9uKGVsZW0pKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBhY3Rpb24oZWxlbVtpXSk7XG4gICAgZWxzZVxuICAgICAgICBhY3Rpb24oZWxlbSk7XG59XG5leHBvcnRzLmVhY2ggPSBlYWNoO1xuZnVuY3Rpb24gY3JlYXRlKHRhZywgY2hpbGRyZW4gPSBudWxsKSB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGNoaWxkcmVuKSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGRyZW4pKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWFjaChjaGlsZHJlbiwgYyA9PiBlbGVtLmFwcGVuZENoaWxkKGMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW07XG59XG5leHBvcnRzLmNyZWF0ZSA9IGNyZWF0ZTtcbmZ1bmN0aW9uIGF0dHIoZWxlbSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGVhY2goZWxlbSwgZSA9PiBlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKSk7XG4gICAgcmV0dXJuIGVsZW07XG59XG5leHBvcnRzLmF0dHIgPSBhdHRyO1xuZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMoZWxlbWVudCkge1xuICAgIGxldCBhY2NvcmRpb25zID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGV4cG9ydHMuYWNjb3JkaW9uKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY29yZGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IGFjYyA9IGFjY29yZGlvbnNbaV07XG4gICAgICAgIGxldCBwYW5lbCA9IGFjYy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBpbml0SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBpbml0SGVpZ2h0O1xuICAgICAgICBhY2Mub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGFjYy5jbGFzc0xpc3QudG9nZ2xlKGV4cG9ydHMuY29sbGFwc2VkKTtcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnN0eWxlLm1heEhlaWdodCA9PT0gXCIwcHhcIiA/XG4gICAgICAgICAgICAgICAgaW5pdEhlaWdodCA6IFwiMHB4XCI7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5pbml0QWNjb3JkaW9ucyA9IGluaXRBY2NvcmRpb25zO1xuZnVuY3Rpb24gcG9wdXBPbkNsaWNrKGVsZW1lbnQsIHRvZ2dsZSwgaGlkZSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZSk7XG4gICAgbGV0IGNsb3NlRWxlbSA9IGZpcnN0RWxlbWVudFdpdGhTdHlsZShleHBvcnRzLmNsb3NlcG9wdXBzKTtcbiAgICBjbG9zZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGlkZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIilcbiAgICAgICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucG9wdXBPbkNsaWNrID0gcG9wdXBPbkNsaWNrO1xuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NPbkNsaWNrKGVsZW1lbnQsIGNscywgdGFyZ2V0ID0gZWxlbWVudCkge1xuICAgIHBvcHVwT25DbGljayhlbGVtZW50LCAoKSA9PiBlYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC50b2dnbGUoY2xzKSksICgpID0+IGVhY2godGFyZ2V0LCBlID0+IGUuY2xhc3NMaXN0LnJlbW92ZShjbHMpKSk7XG59XG5leHBvcnRzLnRvZ2dsZUNsYXNzT25DbGljayA9IHRvZ2dsZUNsYXNzT25DbGljaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1vbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG4kLmVhY2goJC5lbGVtZW50c1dpdGhTdHlsZSgkLmhhbWJ1cmdlciksIGhhbWIgPT4gJC50b2dnbGVDbGFzc09uQ2xpY2soaGFtYiwgXCJvcGVuXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhhbWJ1cmdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG4vLyBTZXQgdXAgcmVzcG9uc2l2ZSBtZW51LlxubGV0IG5hdmJhciA9ICQuZWxlbWVudFdpdGhJZCgkLm5hdmJhcik7XG5sZXQgaGFtYiA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKCQuaGFtYnVyZ2VyLCBuYXZiYXIpO1xubGV0IGhpZGRlbiA9IGZhbHNlO1xuJC50b2dnbGVDbGFzc09uQ2xpY2soaGFtYiwgJC5leHBhbmRlZCwgbmF2YmFyKTtcbi8vIEhpZGUgbmF2YmFyIHdoZW4gc2Nyb2xsaW5nIGRvd24uXG5sZXQgcHJldlNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgIHZhciBjdXJyU2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgc2V0TmF2YmFyT2Zmc2V0KHByZXZTY3JvbGwgPiBjdXJyU2Nyb2xsID8gMCA6IC1uYXZiYXIub2Zmc2V0SGVpZ2h0ICsgMSk7XG4gICAgcHJldlNjcm9sbCA9IGN1cnJTY3JvbGw7XG59KTtcbm5hdmJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgaWYgKGhpZGRlbilcbiAgICAgICAgc2V0TmF2YmFyT2Zmc2V0KDApO1xufSk7XG5mdW5jdGlvbiBzZXROYXZiYXJPZmZzZXQob2Zmcykge1xuICAgIGhpZGRlbiA9IG9mZnMgIT09IDA7XG4gICAgaWYgKCFuYXZiYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCQuZXhwYW5kZWQpKSB7XG4gICAgICAgIG5hdmJhci5zdHlsZS50b3AgPSBgJHtvZmZzfXB4YDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZiYXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xubGV0IHBhZ2VtZW51ID0gJC5lbGVtZW50c1dpdGhTdHlsZShcInBhZ2VtZW51XCIpWzBdO1xuaWYgKHBhZ2VtZW51KSB7XG4gICAgbGV0IGhlYWRpbmdPZmZzZXRzID0gW107XG4gICAgbGV0IGNvbnRlbnRhcmVhID0gJC5maXJzdEVsZW1lbnRXaXRoU3R5bGUoXCJjb250ZW50YXJlYVwiKTtcbiAgICBsZXQgcGFnZXRyZWUgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcInBhZ2V0cmVlXCIsIHBhZ2VtZW51KTtcbiAgICBsZXQgaGVhZGluZ3MgPSBjb250ZW50YXJlYS5xdWVyeVNlbGVjdG9yQWxsKFwiaDEsIGgyLCBoMywgaDQsIGg1XCIpO1xuICAgIGJ1aWxkVHJlZShwYWdldHJlZSwgbnVsbCwgMSwgaGVhZGluZ3MsIDApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgbGV0IHBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdPZmZzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaG8gPSBoZWFkaW5nT2Zmc2V0c1tpXTtcbiAgICAgICAgICAgIGhvLmxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgICAgIGlmICghZm91bmQgJiYgaG8uaGVhZGluZy5vZmZzZXRUb3AgPiAocG9zICsgaG8uaGVhZGluZy5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgKHByZXYgfHwgaG8pLmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2ID0gaG87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCAmJiBwcmV2KVxuICAgICAgICAgICAgcHJldi5saW5rLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIik7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gYnVpbGRUcmVlKHBhcmVudExpc3QsIHByZXZJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIGluZGV4KSB7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGhlYWRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGhlYWRpbmcgPSBoZWFkaW5nc1tpbmRleF07XG4gICAgICAgICAgICBsZXQgY3VyckxldmVsID0gcGFyc2VJbnQoaGVhZGluZy50YWdOYW1lLnN1YnN0cmluZygxKSk7XG4gICAgICAgICAgICBpZiAoY3VyckxldmVsIDwgbGV2ZWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgaWYgKGN1cnJMZXZlbCA+IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWJMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5hcHBlbmRDaGlsZChzdWJMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUoc3ViTGlzdCwgbnVsbCwgY3VyckxldmVsLCBoZWFkaW5ncywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIG51bGwsIGN1cnJMZXZlbCwgaGVhZGluZ3MsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBsaW5rID0gJC5hdHRyKCQuY3JlYXRlKFwiYVwiLCBoZWFkaW5nLnRleHRDb250ZW50KSwgXCJocmVmXCIsIFwiI1wiICsgaGVhZGluZy5pZCk7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RJdGVtID0gJC5jcmVhdGUoXCJsaVwiLCBsaW5rKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBoZWFkaW5nT2Zmc2V0c1tpbmRleF0gPSB7IGhlYWRpbmcsIGxpbmsgfTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShwYXJlbnRMaXN0LCBsaXN0SXRlbSwgbGV2ZWwsIGhlYWRpbmdzLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlbWVudS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSB2b2lkIDA7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xubGV0IHRvY21lbnUgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwidG9jbWVudVwiKVswXTtcbmlmICh0b2NtZW51KSB7XG4gICAgaWYgKCFkb2N1bWVudC5mb250cyB8fCBkb2N1bWVudC5mb250cy5zdGF0dXMgPT0gXCJsb2FkZWRcIilcbiAgICAgICAgaW5pdEFjY29yZGlvbnModG9jbWVudSk7XG4gICAgZWxzZVxuICAgICAgICBkb2N1bWVudC5mb250cy5vbmxvYWRpbmdkb25lID0gKCkgPT4gaW5pdEFjY29yZGlvbnModG9jbWVudSk7XG59XG5mdW5jdGlvbiBpbml0QWNjb3JkaW9ucyhlbGVtZW50KSB7XG4gICAgbGV0IGFjY29yZGlvbnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJC5hY2NvcmRpb24pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjb3JkaW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgYWNjID0gYWNjb3JkaW9uc1tpXTtcbiAgICAgICAgbGV0IHBhbmVsID0gYWNjLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IGluaXRIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IGluaXRIZWlnaHQ7XG4gICAgICAgIGFjYy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWNjLmNsYXNzTGlzdC50b2dnbGUoJC5jb2xsYXBzZWQpO1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID09PSBcIjBweFwiID9cbiAgICAgICAgICAgICAgICBpbml0SGVpZ2h0IDogXCIwcHhcIjtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmluaXRBY2NvcmRpb25zID0gaW5pdEFjY29yZGlvbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2NtZW51LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b29sdGlwID0gdm9pZCAwO1xuY29uc3QgJCA9IHJlcXVpcmUoXCIuLi9jb21tb25cIik7XG5jb25zdCBpZCA9IFwidG9vbHRpcFwiO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLmZvckVhY2goZWxlbSA9PiB0b29sdGlwKGVsZW0sIGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS10aXRsZVwiKSkpO1xuZnVuY3Rpb24gdG9vbHRpcChlbGVtLCB0ZXh0KSB7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gc2hvd1Rvb2x0aXAoZWxlbSwgdGV4dCkpO1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhpZGVUb29sdGlwKTtcbn1cbmV4cG9ydHMudG9vbHRpcCA9IHRvb2x0aXA7XG5mdW5jdGlvbiBzaG93VG9vbHRpcChlbGVtLCBjb250ZW50cykge1xuICAgIGhpZGVUb29sdGlwKCk7XG4gICAgaWYgKCFjb250ZW50cylcbiAgICAgICAgcmV0dXJuO1xuICAgIGxldCB0dCA9ICQuY3JlYXRlKCdsZWdlbmQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHR0KTtcbiAgICB0dC5pZCA9IGlkO1xuICAgIHR0LmlubmVySFRNTCA9IGNvbnRlbnRzLnJlcGxhY2UoLz0+L2csIFwi4oeSXCIpO1xuICAgIGxldCBiYiA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdHQuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQoYmIubGVmdCkgKyB3aW5kb3cuc2Nyb2xsWH1weGA7XG4gICAgdHQuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZChiYi50b3ApICsgd2luZG93LnNjcm9sbFl9cHhgO1xuICAgIHR0LnN0eWxlLm9wYWNpdHkgPSBcIjk1JVwiO1xufVxuZnVuY3Rpb24gaGlkZVRvb2x0aXAoKSB7XG4gICAgbGV0IHR0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICh0dClcbiAgICAgICAgdHQucmVtb3ZlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b29sdGlwLmpzLm1hcCIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL3N0eWxlcy90aGVtZS5jc3NcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9zdHlsZXMvc3ludGF4LmNzc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL3BhZ2VzL25vcm1hbC5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuanNcIik7XG5yZXF1aXJlKFwiLi4vLi4vLi4vc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuY3NzXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvdG9jbWVudS90b2NtZW51LmpzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuY3NzXCIpO1xucmVxdWlyZShcIi4uLy4uLy4uL3NpdGUvY29tcG9uZW50cy9jb250ZW50YXJlYS9jb250ZW50YXJlYS5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudS5qc1wiKTtcbnJlcXVpcmUoXCIuLi8uLi8uLi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuY3NzXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9