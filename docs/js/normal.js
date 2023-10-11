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
        navbar.style.opacity = hidden ? "0" : "1";
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

/***/ "./lib/site/components/tooltip/tooltips.js":
/*!*************************************************!*\
  !*** ./lib/site/components/tooltip/tooltips.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tooltip = void 0;
const $ = __webpack_require__(/*! ../../components/common */ "./lib/site/components/common.js");
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
//# sourceMappingURL=tooltips.js.map

/***/ }),

/***/ "./lib/site/main/normal.css":
/*!**********************************!*\
  !*** ./lib/site/main/normal.css ***!
  \**********************************/
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
__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../styles/theme.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../styles/syntax.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__webpack_require__(/*! ../components/navbar/navbar */ "./lib/site/components/navbar/navbar.js");
__webpack_require__(/*! ../components/hamburger/hamburger */ "./lib/site/components/hamburger/hamburger.js");
__webpack_require__(/*! ../components/tooltip/tooltips */ "./lib/site/components/tooltip/tooltips.js");
__webpack_require__(/*! ../components/tocmenu/tocmenu */ "./lib/site/components/tocmenu/tocmenu.js");
__webpack_require__(/*! ../components/pagemenu/pagemenu */ "./lib/site/components/pagemenu/pagemenu.js");
__webpack_require__(/*! ./normal.css */ "./lib/site/main/normal.css");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2YsVUFBVSxtQkFBTyxDQUFDLGdFQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFDQUFxQztBQUM1RCxzQkFBc0Isb0NBQW9DO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7OztBQ05hO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFPLENBQUMsa0pBQXFCO0FBQzdCLG1CQUFPLENBQUMsbUpBQXNCO0FBQzlCLG1CQUFPLENBQUMsMkVBQTZCO0FBQ3JDLG1CQUFPLENBQUMsdUZBQW1DO0FBQzNDLG1CQUFPLENBQUMsaUZBQWdDO0FBQ3hDLG1CQUFPLENBQUMsK0VBQStCO0FBQ3ZDLG1CQUFPLENBQUMsbUZBQWlDO0FBQ3pDLG1CQUFPLENBQUMsZ0RBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9jb21wb25lbnRzL2hhbWJ1cmdlci9oYW1idXJnZXIuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL2NvbXBvbmVudHMvcGFnZW1lbnUvcGFnZW1lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b2NtZW51L3RvY21lbnUuanMiLCJ3ZWJwYWNrOi8vbGl0c2NyaXB0Ly4vbGliL3NpdGUvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXBzLmpzIiwid2VicGFjazovL2xpdHNjcmlwdC8uL2xpYi9zaXRlL21haW4vbm9ybWFsLmNzcz80MjEzIiwid2VicGFjazovL2xpdHNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saXRzY3JpcHQvLi9saWIvc2l0ZS9tYWluL25vcm1hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9nZ2xlQ2xhc3NPbkNsaWNrID0gZXhwb3J0cy5wb3B1cE9uQ2xpY2sgPSBleHBvcnRzLmluaXRBY2NvcmRpb25zID0gZXhwb3J0cy5hdHRyID0gZXhwb3J0cy5jcmVhdGUgPSBleHBvcnRzLmVhY2ggPSBleHBvcnRzLmlzSFRNTENvbGxlY3Rpb24gPSBleHBvcnRzLmVsZW1lbnRzV2l0aFN0eWxlID0gZXhwb3J0cy5maXJzdEVsZW1lbnRXaXRoU3R5bGUgPSBleHBvcnRzLmVsZW1lbnRXaXRoSWQgPSBleHBvcnRzLmluZm9ib3ggPSBleHBvcnRzLmNsb3NlcG9wdXBzID0gZXhwb3J0cy5zY3JvbGxpbmdhcmVhID0gZXhwb3J0cy5uYXZiYXIgPSBleHBvcnRzLmhhbWJ1cmdlciA9IGV4cG9ydHMuYWNjb3JkaW9uID0gZXhwb3J0cy5jb2xsYXBzZWQgPSBleHBvcnRzLmV4cGFuZGVkID0gdm9pZCAwO1xuZXhwb3J0cy5leHBhbmRlZCA9IFwiZXhwYW5kZWRcIjtcbmV4cG9ydHMuY29sbGFwc2VkID0gXCJjb2xsYXBzZWRcIjtcbmV4cG9ydHMuYWNjb3JkaW9uID0gXCJhY2NvcmRpb25cIjtcbmV4cG9ydHMuaGFtYnVyZ2VyID0gXCJoYW1idXJnZXJcIjtcbmV4cG9ydHMubmF2YmFyID0gXCJuYXZiYXJcIjtcbmV4cG9ydHMuc2Nyb2xsaW5nYXJlYSA9IFwic2Nyb2xsaW5nYXJlYVwiO1xuZXhwb3J0cy5jbG9zZXBvcHVwcyA9IFwiY2xvc2Vwb3B1cHNcIjtcbmV4cG9ydHMuaW5mb2JveCA9IFwiaW5mby1ib3hcIjtcbmZ1bmN0aW9uIGVsZW1lbnRXaXRoSWQoaWQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuZXhwb3J0cy5lbGVtZW50V2l0aElkID0gZWxlbWVudFdpdGhJZDtcbmZ1bmN0aW9uIGZpcnN0RWxlbWVudFdpdGhTdHlsZShjbGFzc05hbWUsIHBhcmVudCA9IGRvY3VtZW50KSB7XG4gICAgbGV0IHJlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gICAgaWYgKCFyZXMpXG4gICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggY2xhc3MgXCIke2NsYXNzTmFtZX1cIi5gKTtcbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5maXJzdEVsZW1lbnRXaXRoU3R5bGUgPSBmaXJzdEVsZW1lbnRXaXRoU3R5bGU7XG5mdW5jdGlvbiBlbGVtZW50c1dpdGhTdHlsZShjbGFzc05hbWUsIHBhcmVudCA9IGRvY3VtZW50KSB7XG4gICAgcmV0dXJuIHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG59XG5leHBvcnRzLmVsZW1lbnRzV2l0aFN0eWxlID0gZWxlbWVudHNXaXRoU3R5bGU7XG5mdW5jdGlvbiBpc0hUTUxDb2xsZWN0aW9uKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5sZW5ndGggIT09IHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMuaXNIVE1MQ29sbGVjdGlvbiA9IGlzSFRNTENvbGxlY3Rpb247XG5mdW5jdGlvbiBlYWNoKGVsZW0sIGFjdGlvbikge1xuICAgIGlmIChpc0hUTUxDb2xsZWN0aW9uKGVsZW0pKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBhY3Rpb24oZWxlbVtpXSk7XG4gICAgZWxzZVxuICAgICAgICBhY3Rpb24oZWxlbSk7XG59XG5leHBvcnRzLmVhY2ggPSBlYWNoO1xuZnVuY3Rpb24gY3JlYXRlKHRhZywgY2hpbGRyZW4gPSBudWxsKSB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGNoaWxkcmVuKSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGRyZW4pKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWFjaChjaGlsZHJlbiwgYyA9PiBlbGVtLmFwcGVuZENoaWxkKGMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW07XG59XG5leHBvcnRzLmNyZWF0ZSA9IGNyZWF0ZTtcbmZ1bmN0aW9uIGF0dHIoZWxlbSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGVhY2goZWxlbSwgZSA9PiBlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKSk7XG4gICAgcmV0dXJuIGVsZW07XG59XG5leHBvcnRzLmF0dHIgPSBhdHRyO1xuZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMoZWxlbWVudCkge1xuICAgIGxldCBhY2NvcmRpb25zID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGV4cG9ydHMuYWNjb3JkaW9uKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY29yZGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IGFjYyA9IGFjY29yZGlvbnNbaV07XG4gICAgICAgIGxldCBwYW5lbCA9IGFjYy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBpbml0SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBpbml0SGVpZ2h0O1xuICAgICAgICBhY2Mub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGFjYy5jbGFzc0xpc3QudG9nZ2xlKGV4cG9ydHMuY29sbGFwc2VkKTtcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnN0eWxlLm1heEhlaWdodCA9PT0gXCIwcHhcIiA/XG4gICAgICAgICAgICAgICAgaW5pdEhlaWdodCA6IFwiMHB4XCI7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5pbml0QWNjb3JkaW9ucyA9IGluaXRBY2NvcmRpb25zO1xuZnVuY3Rpb24gcG9wdXBPbkNsaWNrKGVsZW1lbnQsIHRvZ2dsZSwgaGlkZSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZSk7XG4gICAgbGV0IGNsb3NlRWxlbSA9IGZpcnN0RWxlbWVudFdpdGhTdHlsZShleHBvcnRzLmNsb3NlcG9wdXBzKTtcbiAgICBjbG9zZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGlkZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIilcbiAgICAgICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucG9wdXBPbkNsaWNrID0gcG9wdXBPbkNsaWNrO1xuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NPbkNsaWNrKGVsZW1lbnQsIGNscywgdGFyZ2V0ID0gZWxlbWVudCkge1xuICAgIHBvcHVwT25DbGljayhlbGVtZW50LCAoKSA9PiBlYWNoKHRhcmdldCwgZSA9PiBlLmNsYXNzTGlzdC50b2dnbGUoY2xzKSksICgpID0+IGVhY2godGFyZ2V0LCBlID0+IGUuY2xhc3NMaXN0LnJlbW92ZShjbHMpKSk7XG59XG5leHBvcnRzLnRvZ2dsZUNsYXNzT25DbGljayA9IHRvZ2dsZUNsYXNzT25DbGljaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1vbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG4kLmVhY2goJC5lbGVtZW50c1dpdGhTdHlsZSgkLmhhbWJ1cmdlciksIGhhbWIgPT4gJC50b2dnbGVDbGFzc09uQ2xpY2soaGFtYiwgXCJvcGVuXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhhbWJ1cmdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG4vLyBTZXQgdXAgcmVzcG9uc2l2ZSBtZW51LlxubGV0IG5hdmJhciA9ICQuZWxlbWVudFdpdGhJZCgkLm5hdmJhcik7XG5sZXQgaGFtYiA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKCQuaGFtYnVyZ2VyLCBuYXZiYXIpO1xubGV0IGhpZGRlbiA9IGZhbHNlO1xuJC50b2dnbGVDbGFzc09uQ2xpY2soaGFtYiwgJC5leHBhbmRlZCwgbmF2YmFyKTtcbi8vIEhpZGUgbmF2YmFyIHdoZW4gc2Nyb2xsaW5nIGRvd24uXG5sZXQgcHJldlNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgIHZhciBjdXJyU2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG4gICAgc2V0TmF2YmFyT2Zmc2V0KHByZXZTY3JvbGwgPiBjdXJyU2Nyb2xsID8gMCA6IC1uYXZiYXIub2Zmc2V0SGVpZ2h0ICsgMSk7XG4gICAgcHJldlNjcm9sbCA9IGN1cnJTY3JvbGw7XG59KTtcbm5hdmJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgaWYgKGhpZGRlbilcbiAgICAgICAgc2V0TmF2YmFyT2Zmc2V0KDApO1xufSk7XG5mdW5jdGlvbiBzZXROYXZiYXJPZmZzZXQob2Zmcykge1xuICAgIGhpZGRlbiA9IG9mZnMgIT09IDA7XG4gICAgaWYgKCFuYXZiYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCQuZXhwYW5kZWQpKSB7XG4gICAgICAgIG5hdmJhci5zdHlsZS50b3AgPSBgJHtvZmZzfXB4YDtcbiAgICAgICAgbmF2YmFyLnN0eWxlLm9wYWNpdHkgPSBoaWRkZW4gPyBcIjBcIiA6IFwiMVwiO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgcGFnZW1lbnUgPSAkLmVsZW1lbnRzV2l0aFN0eWxlKFwicGFnZW1lbnVcIilbMF07XG5pZiAocGFnZW1lbnUpIHtcbiAgICBsZXQgaGVhZGluZ09mZnNldHMgPSBbXTtcbiAgICBsZXQgY29udGVudGFyZWEgPSAkLmZpcnN0RWxlbWVudFdpdGhTdHlsZShcImNvbnRlbnRhcmVhXCIpO1xuICAgIGxldCBwYWdldHJlZSA9ICQuZmlyc3RFbGVtZW50V2l0aFN0eWxlKFwicGFnZXRyZWVcIiwgcGFnZW1lbnUpO1xuICAgIGxldCBoZWFkaW5ncyA9IGNvbnRlbnRhcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMSwgaDIsIGgzLCBoNCwgaDVcIik7XG4gICAgYnVpbGRUcmVlKHBhZ2V0cmVlLCBudWxsLCAxLCBoZWFkaW5ncywgMCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcG9zID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ09mZnNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBobyA9IGhlYWRpbmdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgaG8ubGluay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgaWYgKCFmb3VuZCAmJiBoby5oZWFkaW5nLm9mZnNldFRvcCA+IChwb3MgKyBoby5oZWFkaW5nLm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAocHJldiB8fCBobykubGluay5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSBobztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kICYmIHByZXYpXG4gICAgICAgICAgICBwcmV2LmxpbmsuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBidWlsZFRyZWUocGFyZW50TGlzdCwgcHJldkl0ZW0sIGxldmVsLCBoZWFkaW5ncywgaW5kZXgpIHtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgaGVhZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGluZyA9IGhlYWRpbmdzW2luZGV4XTtcbiAgICAgICAgICAgIGxldCBjdXJyTGV2ZWwgPSBwYXJzZUludChoZWFkaW5nLnRhZ05hbWUuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgIGlmIChjdXJyTGV2ZWwgPCBsZXZlbClcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICBpZiAoY3VyckxldmVsID4gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ykxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmFwcGVuZENoaWxkKHN1Ykxpc3QpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGJ1aWxkVHJlZShzdWJMaXN0LCBudWxsLCBjdXJyTGV2ZWwsIGhlYWRpbmdzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBidWlsZFRyZWUocGFyZW50TGlzdCwgbnVsbCwgY3VyckxldmVsLCBoZWFkaW5ncywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmsgPSAkLmF0dHIoJC5jcmVhdGUoXCJhXCIsIGhlYWRpbmcudGV4dENvbnRlbnQpLCBcImhyZWZcIiwgXCIjXCIgKyBoZWFkaW5nLmlkKTtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdEl0ZW0gPSAkLmNyZWF0ZShcImxpXCIsIGxpbmspO1xuICAgICAgICAgICAgICAgIHBhcmVudExpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIGhlYWRpbmdPZmZzZXRzW2luZGV4XSA9IHsgaGVhZGluZywgbGluayB9O1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVpbGRUcmVlKHBhcmVudExpc3QsIGxpc3RJdGVtLCBsZXZlbCwgaGVhZGluZ3MsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VtZW51LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0QWNjb3JkaW9ucyA9IHZvaWQgMDtcbmNvbnN0ICQgPSByZXF1aXJlKFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25cIik7XG5sZXQgdG9jbWVudSA9ICQuZWxlbWVudHNXaXRoU3R5bGUoXCJ0b2NtZW51XCIpWzBdO1xuaWYgKHRvY21lbnUpIHtcbiAgICBpZiAoIWRvY3VtZW50LmZvbnRzIHx8IGRvY3VtZW50LmZvbnRzLnN0YXR1cyA9PSBcImxvYWRlZFwiKVxuICAgICAgICBpbml0QWNjb3JkaW9ucyh0b2NtZW51KTtcbiAgICBlbHNlXG4gICAgICAgIGRvY3VtZW50LmZvbnRzLm9ubG9hZGluZ2RvbmUgPSAoKSA9PiBpbml0QWNjb3JkaW9ucyh0b2NtZW51KTtcbn1cbmZ1bmN0aW9uIGluaXRBY2NvcmRpb25zKGVsZW1lbnQpIHtcbiAgICBsZXQgYWNjb3JkaW9ucyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgkLmFjY29yZGlvbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2NvcmRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBhY2MgPSBhY2NvcmRpb25zW2ldO1xuICAgICAgICBsZXQgcGFuZWwgPSBhY2MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgaW5pdEhlaWdodCA9IHBhbmVsLnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gaW5pdEhlaWdodDtcbiAgICAgICAgYWNjLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBhY2MuY2xhc3NMaXN0LnRvZ2dsZSgkLmNvbGxhcHNlZCk7XG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPT09IFwiMHB4XCIgP1xuICAgICAgICAgICAgICAgIGluaXRIZWlnaHQgOiBcIjBweFwiO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuaW5pdEFjY29yZGlvbnMgPSBpbml0QWNjb3JkaW9ucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvY21lbnUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRvb2x0aXAgPSB2b2lkIDA7XG5jb25zdCAkID0gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvY29tbW9uXCIpO1xuY29uc3QgaWQgPSBcInRvb2x0aXBcIjtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS5mb3JFYWNoKGVsZW0gPT4gdG9vbHRpcChlbGVtLCBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIikpKTtcbmZ1bmN0aW9uIHRvb2x0aXAoZWxlbSwgdGV4dCkge1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHNob3dUb29sdGlwKGVsZW0sIHRleHQpKTtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoaWRlVG9vbHRpcCk7XG59XG5leHBvcnRzLnRvb2x0aXAgPSB0b29sdGlwO1xuZnVuY3Rpb24gc2hvd1Rvb2x0aXAoZWxlbSwgY29udGVudHMpIHtcbiAgICBoaWRlVG9vbHRpcCgpO1xuICAgIGlmICghY29udGVudHMpXG4gICAgICAgIHJldHVybjtcbiAgICBsZXQgdHQgPSAkLmNyZWF0ZSgnbGVnZW5kJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0dCk7XG4gICAgdHQuaWQgPSBpZDtcbiAgICB0dC5pbm5lckhUTUwgPSBjb250ZW50cy5yZXBsYWNlKC89Pi9nLCBcIuKHklwiKTtcbiAgICBsZXQgYmIgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHR0LnN0eWxlLmxlZnQgPSBgJHtNYXRoLnJvdW5kKGJiLmxlZnQpICsgd2luZG93LnNjcm9sbFh9cHhgO1xuICAgIHR0LnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQoYmIudG9wKSArIHdpbmRvdy5zY3JvbGxZfXB4YDtcbiAgICB0dC5zdHlsZS5vcGFjaXR5ID0gXCI5NSVcIjtcbn1cbmZ1bmN0aW9uIGhpZGVUb29sdGlwKCkge1xuICAgIGxldCB0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAodHQpXG4gICAgICAgIHR0LnJlbW92ZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcHMuanMubWFwIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4uL3N0eWxlcy90aGVtZS5jc3NcIik7XG5yZXF1aXJlKFwiLi4vc3R5bGVzL3N5bnRheC5jc3NcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyXCIpO1xucmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGFtYnVyZ2VyL2hhbWJ1cmdlclwiKTtcbnJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcHNcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy90b2NtZW51L3RvY21lbnVcIik7XG5yZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdlbWVudS9wYWdlbWVudVwiKTtcbnJlcXVpcmUoXCIuL25vcm1hbC5jc3NcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=