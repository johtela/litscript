(() => {
  // src/backend.ts
  var Backend = class {
    /**
     * Construct the backend. 
     */
    constructor(app) {
      this.app = app;
      this.setup();
    }
    /**
     * Register a method to listen a specified path.
     */
    get(path, method) {
      this.app.get(path, (req, res) => {
        res.json(method.apply(this));
      });
    }
  };

  // src/tests/test-backend.ts
  var TestBackend = class extends Backend {
    setup() {
      this.get("/test", this.test);
    }
    teardown() {
    }
    test() {
      return "Hello!";
    }
  };
  global.backend = TestBackend;
})();
//# sourceMappingURL=test-backend.js.map
