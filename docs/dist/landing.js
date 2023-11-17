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
      exports.toggleClassOnClick = exports.popupOnClick = exports.initAccordions = exports.attr = exports.create = exports.each = exports.isHTMLCollection = exports.elementsWithTag = exports.elementsWithClass = exports.firstElementWithClass = exports.elementWithId = exports.infobox = exports.closepopups = exports.contentarea = exports.navmenu = exports.navbar = exports.hamburger = exports.accordion = exports.collapsed = exports.expanded = void 0;
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
      exports.elementWithId = elementWithId;
      function firstElementWithClass(className, parent = document) {
        let res = parent.getElementsByClassName(className)[0];
        if (!res)
          throw ReferenceError(`Cannot find element with class "${className}".`);
        return res;
      }
      exports.firstElementWithClass = firstElementWithClass;
      function elementsWithClass(className, parent = document) {
        return parent.getElementsByClassName(className);
      }
      exports.elementsWithClass = elementsWithClass;
      function elementsWithTag(tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
      }
      exports.elementsWithTag = elementsWithTag;
      function isHTMLCollection(elem) {
        return elem.length !== void 0;
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
          if (typeof children === "string")
            elem.appendChild(document.createTextNode(children));
          else
            each(children, (c) => elem.appendChild(c));
        }
        return elem;
      }
      exports.create = create;
      function attr(elem, attrName, attrValue) {
        each(elem, (e) => e.setAttribute(attrName, attrValue));
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
            panel.style.maxHeight = panel.style.maxHeight === "0px" ? initHeight : "0px";
          };
        }
      }
      exports.initAccordions = initAccordions;
      function popupOnClick(element, toggle, hide) {
        element.addEventListener("click", toggle);
        let closeElem = firstElementWithClass(exports.closepopups);
        closeElem.addEventListener("mouseup", hide);
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape")
            hide();
        });
      }
      exports.popupOnClick = popupOnClick;
      function toggleClassOnClick(element, cls, target = element, update) {
        popupOnClick(element, () => {
          each(target, (e) => e.classList.toggle(cls));
          update === null || update === void 0 ? void 0 : update();
        }, () => {
          each(target, (e) => e.classList.remove(cls));
          update === null || update === void 0 ? void 0 : update();
        });
      }
      exports.toggleClassOnClick = toggleClassOnClick;
    }
  });

  // lib/site/components/navbar/navbar.js
  var require_navbar = __commonJS({
    "lib/site/components/navbar/navbar.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.activateItem = void 0;
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
      exports.activateItem = activateItem;
    }
  });

  // lib/site/styles/theming.js
  var require_theming = __commonJS({
    "lib/site/styles/theming.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initializeTheme = void 0;
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
      exports.initializeTheme = initializeTheme;
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
      updateSections();
      initButtons();
      function getTransform(sectionNo) {
        let even = (sectionNo & 1) == 0;
        let flipped = sectionNo < currentSection;
        return even ? flipped ? "rotateY(-180deg)" : "" : flipped ? "translateX(-100%) rotateY(-360deg)" : "translateX(-100%) rotateY(-180deg)";
      }
      function updateSections(animate = false, dir = 0) {
        for (let i = 0; i < sections.length; ++i) {
          let style = sections[i].style;
          style.zIndex = (100 - Math.abs(currentSection - dir - i)).toString();
          style.transform = getTransform(i);
          style.backgroundPositionX = i <= currentSection ? "0%" : "100%";
          if (animate)
            style.transition = "transform 1s ease, background-position 1s ease, left 1s ease";
          if (currentSection >= sections.length)
            style.left = "70%";
          else if (currentSection > 0)
            style.left = "50%";
          else
            style.left = "";
        }
      }
      function initButtons() {
        $.elementWithId("prev-button").onclick = (e) => {
          if (currentSection > 1) {
            currentSection -= 2;
            updateSections(true);
          }
        };
        $.elementWithId("next-button").onclick = (e) => {
          if (currentSection < sections.length - 1) {
            currentSection += 2;
            updateSections(true, 2);
          }
        };
      }
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
    }
  });
  require_landing3();
})();
//# sourceMappingURL=landing.js.map
