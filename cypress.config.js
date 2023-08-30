const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    trashAssetsBeforeRuns: true,
    supportFile: "Assignment-2/cypress/support/commands.js",
    specPattern:
      "/Users/bdedea/spiral-both-assignments/Assignment-2/cypress/e2e",
    setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures) {
            // deleting any videos if the test passed & no retries
            fs.unlinkSync(results.video);
          }
        }
      });
      const version = config.env.VERSION || "test";

      // If needing to swap between different environments
      const urls = {
        // local: "",
        test: "https://jsonplaceholder.typicode.com",
        // prod: "",
      };

      // choosing a URL from above
      config.baseUrl = urls[version];

      return config;
    },
    env: {
      snapshotOnly: true,
    },
  },
});
