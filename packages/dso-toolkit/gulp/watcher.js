import gulp from "gulp";
import log from "fancy-log";

import { buildStyling } from "./build-styling.js";
import { buildSvgSpritesheet } from "./build-svg-spritesheet.js";
import { buildScripting } from "./build-scripting.js";

export function watcher() {
  gulp
    .watch(["components/**/*.scss", "global/**/*.scss", "legacy/**/*.scss", "variables/**/*.scss", "*.scss"], {
      cwd: "src",
    })
    .on("change", (event) => {
      log("scss", event);

      return buildStyling();
    });

  gulp
    .watch(["icons/**/*.(scss|svg)", "variables/**/*.scss"], {
      cwd: "src",
    })
    .on("all", function (event, _path, _stats) {
      log("icons", event);

      return buildSvgSpritesheet();
    });

  gulp.watch("**/*.ts", { cwd: "src" }).on("change", (event) => {
    log("typescript", event);

    return buildScripting();
  });
}
