const concurrently = require("concurrently");
const rimraf = require("rimraf");
const argv = require("minimist")(process.argv.slice(2));

rimraf.sync("packages/core/dist");
rimraf.sync("packages/core/loader");
rimraf.sync("packages/css/dist");
rimraf.sync("packages/storybook/www");
rimraf.sync("packages/react/src/components.ts");
rimraf.sync("packages/react/src/react-component-lib");
rimraf.sync("packages/react/dist");
rimraf.sync("packages/react/www");
rimraf.sync("packages/leaflet/dist");
rimraf.sync("packages/react-leaflet/dist");

const startStorybook = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/storybook start",
  name: "storybook",
  prefixColor: "bgMagenta",
};

const watchCore = {
  command: "yarn workspace @dso-toolkit/core watch",
  name: "core",
};

const startCypress = {
  command: `wait-on http://localhost:45000 && yarn cypress open"`,
  name: "cypress",
  prefixColor: "bgGreen",
};

const watchCss = {
  command: "yarn workspace @dso-toolkit/css watch",
  name: "css",
};

const startReact = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/react start",
  name: "react",
};

const startLeaflet = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/leaflet start",
  name: "leaflet",
  prefixColor: "green",
};

const buildLeaflet = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/leaflet build",
  name: "leaflet",
  prefixColor: "green",
};

const startReactLeaflet = {
  command: "wait-on file:./packages/leaflet/dist/leaflet.js && yarn workspace @dso-toolkit/react-leaflet start",
  name: "leaflet",
  prefixColor: "green",
};

if (!argv.mode) {
  if (argv.all) {
    // --all
    concurrently([watchCss, watchCore, startStorybook, startReact], {
      killOthers: ["failure", "success"],
    });
  } else if (argv.react) {
    // --react
    concurrently([watchCss, watchCore, startReact], {
      killOthers: ["failure", "success"],
    });
  } else {
    // normal
    concurrently([watchCss, watchCore, startStorybook, startCypress], {
      killOthers: ["failure", "success"],
    });
  }
} else if (argv.mode === "leaflet") {
  concurrently([watchCss, watchCore, startLeaflet], {
    killOthers: ["failure", "success"],
  });
} else if (argv.mode === "react-leaflet") {
  concurrently([watchCss, watchCore, buildLeaflet, startReactLeaflet], {
    killOthers: ["failure"],
  });
} else {
  // nothing
}
