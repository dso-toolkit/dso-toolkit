import concurrently from "concurrently";
import minimist from "minimist";
import { rimraf } from "rimraf";

const argv = minimist(process.argv.slice(2));

rimraf.sync("packages/dso-toolkit/dist");
rimraf.sync("packages/core/dist");
rimraf.sync("packages/core/loader");
rimraf.sync("storybook/www");
rimraf.sync("packages/react/src/components.ts");
rimraf.sync("packages/react/src/react-component-lib");
rimraf.sync("packages/react/dist");
rimraf.sync("packages/react/www");
rimraf.sync("angular-workspace/.angular");
rimraf.sync("angular-workspace/www");
rimraf.sync("angular-workspace/projects/component-library/src/lib/stencil-generated");

const startStorybook = {
  command: "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace dso-storybook start",
  name: "storybook",
  prefixColor: "bgMagenta",
};

const watchCore = {
  command:
    "wait-on file:./packages/dso-toolkit/dist/index.js file:./packages/dso-toolkit/dist/dso.css && yarn workspace @dso-toolkit/core watch",
  name: "core",
};

const startCypress = {
  command: "wait-on http://localhost:45000 && yarn workspace dso-storybook cypress open",
  name: "cypress",
  prefixColor: "bgGreen",
};

const watchToolkit = {
  command: "yarn workspace dso-toolkit watch",
  name: "toolkit",
};

const startReact = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/react storybook:start",
  name: "react",
};

const startAngular = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace angular-workspace storybook:start",
  name: "angular",
};

if (!argv.mode) {
  if (argv.all) {
    // --all
    concurrently([watchToolkit, watchCore, startStorybook, startReact, startAngular, startCypress], {
      killOthers: ["failure", "success"],
    });
  } else if (argv.react) {
    // --react
    concurrently([watchToolkit, watchCore, startReact], {
      killOthers: ["failure", "success"],
    });
  } else if (argv.angular) {
    // --angular
    concurrently([watchToolkit, watchCore, startAngular], {
      killOthers: ["failure", "success"],
    });
  } else {
    // normal
    concurrently([watchToolkit, watchCore, startStorybook, startCypress], {
      killOthers: ["failure", "success"],
    });
  }
} else {
  // nothing
}
