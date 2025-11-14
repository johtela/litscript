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

  // lib/site/components/tocmenu/tocmenu.js
  var require_tocmenu = __commonJS({
    "lib/site/components/tocmenu/tocmenu.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initAccordions = initAccordions;
      var $ = require_common();
      var tocmenu = $.firstElementWithClass("tocmenu");
      if (tocmenu) {
        setTimeout(initAccordions, 1e3);
      }
      function initAccordions() {
        var _a;
        $.each($.elementsWithClass($.accordion, tocmenu), (acc) => {
          let panel = acc.nextElementSibling;
          openPanel(acc, panel);
          acc.onclick = () => {
            acc.classList.toggle($.collapsed);
            togglePanel(acc, panel);
          };
        });
        (_a = tocmenu.querySelector(".highlight")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
      function openPanel(acc, panel) {
        let closed = panelClosed(panel);
        panel.style.maxHeight = panel.scrollHeight + "px";
        if (closed)
          resizeParents(acc, panel);
      }
      function togglePanel(acc, panel) {
        let closed = panelClosed(panel);
        panel.style.maxHeight = closed ? panel.scrollHeight + "px" : "0px";
        if (closed)
          resizeParents(acc, panel);
      }
      function panelClosed(panel) {
        return panel.style.maxHeight == "0px";
      }
      function resizeParents(acc, panel) {
        let parent = parentPanel(acc);
        while (parent) {
          parent.style.maxHeight = parent.scrollHeight + panel.scrollHeight + "px";
          parent = parentPanel(parent);
        }
      }
      function parentPanel(acc) {
        let elem = acc.parentElement;
        while (elem && elem.tagName == "UL" || elem.tagName == "LI") {
          if (elem.tagName == "UL" && elem.previousElementSibling.classList.contains($.accordion))
            return elem;
          elem = elem.parentElement;
        }
        return null;
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

  // lib/site/pages/normal/normal.js
  var require_normal = __commonJS({
    "lib/site/pages/normal/normal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var $ = require_common();
      var tocmenu_1 = require_tocmenu();
      var theming_1 = require_theming();
      (0, theming_1.initializeTheme)();
      var tocbutton = $.elementsWithClass("toc-button")[0];
      var layout = $.elementsWithClass("layout")[0];
      var contentarea = $.elementsWithClass("contentarea")[0];
      var tocopen = "toc-open";
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
    }
  });

  // site/pages/normal/normal.css
  var require_normal2 = __commonJS({
    "site/pages/normal/normal.css"(exports, module) {
      module.exports = {};
    }
  });

  // site/components/navbar/navbar.css
  var require_navbar2 = __commonJS({
    "site/components/navbar/navbar.css"(exports, module) {
      module.exports = {};
    }
  });

  // lib/site/components/hamburger/hamburger.js
  var require_hamburger = __commonJS({
    "lib/site/components/hamburger/hamburger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var $ = require_common();
      $.each($.elementsWithClass($.hamburger), (hamb) => $.toggleClassOnClick(hamb, "open"));
    }
  });

  // site/components/hamburger/hamburger.css
  var require_hamburger2 = __commonJS({
    "site/components/hamburger/hamburger.css"(exports, module) {
      module.exports = {};
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

  // site/components/tocmenu/tocmenu.css
  var require_tocmenu2 = __commonJS({
    "site/components/tocmenu/tocmenu.css"(exports, module) {
      module.exports = {};
    }
  });

  // site/components/contentarea/contentarea.css
  var require_contentarea = __commonJS({
    "site/components/contentarea/contentarea.css"(exports, module) {
      module.exports = {};
    }
  });

  // lib/site/components/pagemenu/pagemenu.js
  var require_pagemenu = __commonJS({
    "lib/site/components/pagemenu/pagemenu.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var $ = require_common();
      var pagemenu = $.elementsWithClass("pagemenu")[0];
      if (pagemenu) {
        let buildTree = function(parentList, prevItem, level, headings2, index) {
          while (index < headings2.length) {
            let heading = headings2[index];
            let currLevel = parseInt(heading.tagName.substring(1));
            if (currLevel < level)
              return index;
            if (currLevel > level) {
              if (prevItem) {
                let subList = document.createElement("ul");
                prevItem.appendChild(subList);
                index = buildTree(subList, null, currLevel, headings2, index);
              } else
                index = buildTree(parentList, null, currLevel, headings2, index);
            } else {
              let link = $.attr($.create("a", heading.textContent), "href", "#" + heading.id);
              let listItem = $.create("li", link);
              parentList.appendChild(listItem);
              headingOffsets[index] = { heading, link };
              index = buildTree(parentList, listItem, level, headings2, index + 1);
            }
          }
          return index;
        };
        let headingOffsets = [];
        let contentarea = $.firstElementWithClass("contentarea");
        let pagetree = $.firstElementWithClass("pagetree", pagemenu);
        let headings = contentarea.querySelectorAll("h1, h2, h3, h4, h5");
        buildTree(pagetree, null, 1, headings, 0);
        window.addEventListener("scroll", () => {
          let pos = window.scrollY;
          let found = false;
          let prev = null;
          for (let i = 0; i < headingOffsets.length; i++) {
            let ho = headingOffsets[i];
            ho.link.classList.remove("highlight");
            if (!found && ho.heading.offsetTop > pos + ho.heading.offsetHeight) {
              (prev || ho).link.classList.add("highlight");
              found = true;
            }
            prev = ho;
          }
          if (!found && prev)
            prev.link.classList.add("highlight");
        });
      }
    }
  });

  // site/components/pagemenu/pagemenu.css
  var require_pagemenu2 = __commonJS({
    "site/components/pagemenu/pagemenu.css"(exports, module) {
      module.exports = {};
    }
  });

  // site/components/footer/footer.css
  var require_footer = __commonJS({
    "site/components/footer/footer.css"(exports, module) {
      module.exports = {};
    }
  });

  // lib/site/main/normal.js
  var require_normal3 = __commonJS({
    "lib/site/main/normal.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      require_theme();
      require_syntax();
      require_normal();
      require_normal2();
      require_navbar();
      require_navbar2();
      require_hamburger();
      require_hamburger2();
      require_tooltip();
      require_tooltip2();
      require_tocmenu();
      require_tocmenu2();
      require_contentarea();
      require_pagemenu();
      require_pagemenu2();
      require_footer();
    }
  });
  require_normal3();
})();
//# sourceMappingURL=normal.js.map
