import gulp from "gulp";

import { buildStyling } from "./build-styling.js";
import { buildSvgSpritesheet } from "./build-svg-spritesheet.js";
import { buildScripting } from "./build-scripting.js";

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
    buildSvgSpritesheet,
  );

  gulp.watch(
    "**/*.ts",
    {
      cwd: "src",
    },
    buildScripting,
  );
}
