import gulp from "gulp";

import { buildScripting } from "./build-scripting.js";
import { buildStyling } from "./build-styling.js";
import { buildDiSvgSpritesheet } from "./build-svg-spritesheets.js";

export function watcher() {
  gulp.watch(
    ["components/**/*.scss", "global/**/*.scss", "legacy/**/*.scss", "variables/**/*.scss", "*.scss"],
    {
      cwd: "src",
    },
    buildStyling,
  );

  gulp.watch(
    ["icons/**/*.(scss|svg)", "variables/**/*.scss"],
    {
      cwd: "src",
    },
    buildDiSvgSpritesheet,
  );

  gulp.watch(
    "**/*.ts",
    {
      cwd: "src",
    },
    buildScripting,
  );
}
