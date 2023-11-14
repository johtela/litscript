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

  // lib/site/main/landing.js
  var require_landing2 = __commonJS({
    "lib/site/main/landing.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      require_theme();
      require_syntax();
      require_landing();
    }
  });
  require_landing2();
})();
//# sourceMappingURL=landing.js.map
