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
  command: "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && pnpm --filter dso-storybook start",
  name: "storybook",
  prefixColor: "bgMagenta",
};

const watchCore = {
  command:
    "wait-on file:./packages/dso-toolkit/dist/index.js file:./packages/dso-toolkit/dist/dso.css && pnpm --filter @dso-toolkit/core watch",
  name: "core",
};

const startCypress = {
  command: "wait-on http://localhost:45000 && pnpm --filter dso-storybook exec cypress open",
  name: "cypress",
  prefixColor: "bgGreen",
};

const watchToolkit = {
  command: "pnpm --filter dso-toolkit watch",
  name: "toolkit",
};

const startReact = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && pnpm --filter @dso-toolkit/react storybook:start",
  name: "react",
};

const startAngular = {
  command:
    "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && pnpm --filter angular-workspace storybook:start",
  name: "angular",
};

const runProcesses = (processes: Parameters<typeof concurrently>[0]) => {
  try {
    concurrently(processes, {
      killOthersOn: ["failure", "success"],
    });
  } catch (error) {
    console.error("Failed to start development processes:", error);
    process.exitCode = 1;
  }
};

if (!argv.mode) {
  if (argv.all) {
    // --all
    runProcesses([watchToolkit, watchCore, startStorybook, startReact, startAngular, startCypress]);
  } else if (argv.react) {
    // --react
    runProcesses([watchToolkit, watchCore, startReact]);
  } else if (argv.angular) {
    // --angular
    runProcesses([watchToolkit, watchCore, startAngular]);
  } else {
    // normal
    runProcesses([watchToolkit, watchCore, startStorybook, startCypress]);
  }
} else {
  // nothing
}
