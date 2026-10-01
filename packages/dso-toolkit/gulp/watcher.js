import gulp from "gulp";

import { buildStyling } from "./build-styling.js";

export function watcher() {
  gulp.watch(
    ["components/**/*.scss", "global/**/*.scss", "legacy/**/*.scss", "variables/**/*.scss", "*.scss", "icons/**/*.svg"],
    {
      cwd: "src",
    },
    buildStyling,
  );
}
