"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // site/styles/theme.css
  var require_theme = __commonJS({
    "site/styles/theme.css"(exports, module) {
      module.exports = {};
    }
  });

  // site/styles/syntax.css
  var require_syntax = __commonJS({
    "site/styles/syntax.css"(exports, module) {
      module.exports = {};
    }
  });

  // site/pages/landing/landing.css
  var require_landing = __commonJS({
    "site/pages/landing/landing.css"(exports, module) {
      module.exports = {};
    }
  });

  // lib/site/components/common.js
  var require_common = __commonJS({
    "lib/site/components/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.infobox = exports.closepopups = exports.contentarea = exports.navmenu = exports.navbar = exports.hamburger = exports.accordion = exports.collapsed = exports.expanded = void 0;
      exports.elementWithId = elementWithId;
      exports.firstElementWithClass = firstElementWithClass;
      exports.elementsWithClass = elementsWithClass;
      exports.elementsWithTag = elementsWithTag;
      exports.isHTMLCollection = isHTMLCollection;
      exports.each = each;
      exports.create = create;
      exports.attr = attr;
      exports.initAccordions = initAccordions;
      exports.popupOnClick = popupOnClick;
      exports.toggleClassOnClick = toggleClassOnClick;
      exports.expanded = "expanded";
      exports.collapsed = "collapsed";
      exports.accordion = "accordion";
      exports.hamburger = "hamburger";
      exports.navbar = "navbar";
      exports.navmenu = "navmenu";
      exports.contentarea = "contentarea";
      exports.closepopups = "closepopups";
      exports.infobox = "info-box";
      function elementWithId(id) {
        return document.getElementById(id);
      }
      function firstElementWithClass(className, parent = document) {
        let res = parent.getElementsByClassName(className)[0];
        if (!res)
          throw ReferenceError(`Cannot find element with class "${className}".`);
        return res;
      }
      function elementsWithClass(className, parent = document) {
        return parent.getElementsByClassName(className);
      }
      function elementsWithTag(tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
      }
      function isHTMLCollection(elem) {
        return elem.length !== void 0;
      }
      function each(elem, action) {
        if (isHTMLCollection(elem))
          for (let i = 0; i < elem.length; ++i)
            action(elem[i]);
        else
          action(elem);
      }
      function create(tag, children = null) {
        let elem = document.createElement(tag);
        if (children) {
          if (typeof children === "string")
            elem.appendChild(document.createTextNode(children));
          else
            each(children, (c) => elem.appendChild(c));
        }
        return elem;
      }
      function attr(elem, attrName, attrValue) {
        each(elem, (e) => e.setAttribute(attrName, attrValue));
        return elem;
      }
      function initAccordions(element) {
        let accordions = element.getElementsByClassName(exports.accordion);
        for (let i = 0; i < accordions.length; ++i) {
          let acc = accordions[i];
          let panel = acc.nextElementSibling;
          let initHeight = panel.scrollHeight + "px";
          panel.style.maxHeight = initHeight;
          acc.onclick = () => {
            acc.classList.toggle(exports.collapsed);
            panel.style.maxHeight = panel.style.maxHeight === "0px" ? initHeight : "0px";
          };
        }
      }
      function popupOnClick(element, toggle, hide) {
        element.addEventListener("click", toggle);
        let closeElem = firstElementWithClass(exports.closepopups);
        closeElem.addEventListener("mouseup", hide);
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape")
            hide();
        });
      }
      function toggleClassOnClick(element, cls, target = element, update) {
        popupOnClick(element, () => {
          each(target, (e) => e.classList.toggle(cls));
          update === null || update === void 0 ? void 0 : update();
        }, () => {
          each(target, (e) => e.classList.remove(cls));
          update === null || update === void 0 ? void 0 : update();
        });
      }
    }
  });

  // lib/site/components/navbar/navbar.js
  var require_navbar = __commonJS({
    "lib/site/components/navbar/navbar.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.activateItem = activateItem;
      var $ = require_common();
      initializeNavbar();
      function initializeNavbar() {
        let navbar = $.elementWithId($.navbar);
        if (!navbar)
          return;
        let navmenu = $.firstElementWithClass($.navmenu, navbar);
        let hamb = $.firstElementWithClass($.hamburger, navbar);
        let hidden = false;
        $.toggleClassOnClick(hamb, $.expanded, navbar, resizeNavbar);
        resizeNavbar();
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
      }
      function activateItem(menuItem, storKey) {
        $.each($.elementsWithClass("navitem", menuItem.parentElement), (item) => item.classList.remove("active"));
        menuItem.classList.add("active");
        window.localStorage.setItem(storKey, menuItem.id);
      }
    }
  });

  // lib/site/styles/theming.js
  var require_theming = __commonJS({
    "lib/site/styles/theming.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initializeTheme = initializeTheme;
      var $ = require_common();
      var navbar_1 = require_navbar();
      var syntaxKey = "syntaxHighlight";
      var themeKey = "theme";
      function setSyntax(name) {
        document.body.setAttribute("data-syntax-highlight", name);
        let menuItem = $.elementWithId(name);
        if (menuItem)
          (0, navbar_1.activateItem)(menuItem, syntaxKey);
      }
      function setTheme(name) {
        document.body.setAttribute("data-theme", name);
        let menuItem = $.elementWithId(name);
        if (menuItem)
          (0, navbar_1.activateItem)(menuItem, themeKey);
      }
      function initializeTheme() {
        document.body["syntaxHighlight"] = setSyntax;
        let sh = window.localStorage.getItem(syntaxKey);
        if (sh)
          setSyntax(sh);
        document.body["theme"] = setTheme;
        let th = window.localStorage.getItem(themeKey);
        if (th)
          setTheme(th);
      }
    }
  });

  // lib/site/pages/landing/landing.js
  var require_landing2 = __commonJS({
    "lib/site/pages/landing/landing.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var theming_1 = require_theming();
      var $ = require_common();
      (0, theming_1.initializeTheme)();
      var sections = $.elementsWithTag("section");
      var currentSection = 0;
      var prevButton = $.elementWithId("prev-button");
      var nextButton = $.elementWithId("next-button");
      updateSections();
      initNavigation();
      moveToPageInUrl();
      function getTransform(sectionNo, curr) {
        let even = (sectionNo & 1) == 0;
        let flipped = sectionNo < curr;
        return even ? flipped ? "rotateY(-180deg)" : "" : flipped ? "translateX(-100%) rotateY(-360deg)" : "translateX(-100%) rotateY(-180deg)";
      }
      function updateSections(animate = false, dir = 0) {
        let smallScr = smallScreen();
        if (!smallScr)
          currentSection &= ~1;
        let curr = currentSection + 1 & ~1;
        for (let i = 0; i < sections.length; ++i) {
          let style = sections[i].style;
          style.zIndex = (100 - Math.abs(curr - dir - i)).toString();
          style.transform = getTransform(i, curr);
          style.backgroundPositionX = i <= curr ? "0%" : "100%";
          if (animate)
            style.transition = "transform 1s ease, background-position 1s ease, left 1s ease";
          if (curr >= sections.length)
            style.left = smallScr ? "95%" : mediumScreen() ? "75%" : "70%";
          else if (curr > 0)
            style.left = smallScr ? (currentSection & 1) == 0 ? "5%" : "95%" : "50%";
          else
            style.left = "";
        }
      }
      function smallScreen() {
        return getComputedStyle(document.body).getPropertyValue("--screen-size") == "small";
      }
      function mediumScreen() {
        return getComputedStyle(document.body).getPropertyValue("--screen-size") == "medium";
      }
      function updateButtonStates() {
        if (currentSection <= 0)
          prevButton.classList.add("disabled");
        else
          prevButton.classList.remove("disabled");
        if (currentSection >= sections.length - 1)
          nextButton.classList.add("disabled");
        else
          nextButton.classList.remove("disabled");
      }
      function pushToPageHistory() {
        window.history.pushState(currentSection, "Page " + currentSection, "#" + currentSection);
        document.title = "LiTScript - Home - Page " + currentSection;
      }
      function moveToPageInUrl() {
        let prevCurrent = currentSection;
        currentSection = Number.parseInt(window.location.hash.substring(1)) || 0;
        if (prevCurrent != currentSection)
          updateSections(true, currentSection > prevCurrent ? 2 : 0);
        updateButtonStates();
      }
      function moveToPreviousPage(e) {
        if (currentSection > 0) {
          currentSection -= smallScreen() ? 1 : 2;
          updateSections(true);
          pushToPageHistory();
        }
        e.preventDefault();
        updateButtonStates();
      }
      function moveToNextPage(e) {
        if (currentSection < sections.length - 1) {
          currentSection += smallScreen() ? 1 : 2;
          updateSections(true, 2);
          pushToPageHistory();
        }
        e.preventDefault();
        updateButtonStates();
      }
      function initNavigation() {
        prevButton.onclick = moveToPreviousPage;
        nextButton.onclick = moveToNextPage;
        document.body.addEventListener("keydown", (e) => {
          if (e.key == "ArrowLeft")
            moveToPreviousPage(e);
          else if (e.key == "ArrowRight")
            moveToNextPage(e);
        });
        window.addEventListener("popstate", moveToPageInUrl);
      }
    }
  });

  // lib/site/components/tooltip/tooltip.js
  var require_tooltip = __commonJS({
    "lib/site/components/tooltip/tooltip.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tooltip = tooltip;
      var $ = require_common();
      var id = "tooltip";
      var hoverElem;
      document.querySelectorAll('[data-toggle="tooltip"]').forEach((elem) => tooltip(elem, elem.getAttribute("data-title")));
      function tooltip(elem, text) {
        elem.addEventListener("mouseenter", () => showTooltip(elem, text));
        elem.addEventListener("mouseleave", hideTooltip);
      }
      function showTooltip(elem, contents) {
        hideTooltip();
        if (!contents)
          return;
        hoverElem = elem;
        setTimeout(() => createTooltip(contents, elem), 500);
      }
      function createTooltip(contents, elem) {
        if (hoverElem != elem)
          return;
        let tt = $.create("legend");
        document.body.appendChild(tt);
        tt.id = id;
        tt.innerHTML = contents.replace(/=>/g, "\u21D2");
        let bb = elem.getBoundingClientRect();
        tt.style.left = `${Math.round(bb.left) + window.scrollX}px`;
        tt.style.top = `${Math.round(bb.top) + window.scrollY}px`;
        tt.style.opacity = "95%";
      }
      function hideTooltip() {
        let tt = document.getElementById(id);
        if (tt)
          tt.remove();
        hoverElem = void 0;
      }
    }
  });

  // site/components/tooltip/tooltip.css
  var require_tooltip2 = __commonJS({
    "site/components/tooltip/tooltip.css"(exports, module) {
      module.exports = {};
    }
  });

  // lib/site/main/landing.js
  var require_landing3 = __commonJS({
    "lib/site/main/landing.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      require_theme();
      require_syntax();
      require_landing();
      require_landing2();
      require_tooltip();
      require_tooltip2();
    }
  });
  require_landing3();
})();
//# sourceMappingURL=landing.js.map
