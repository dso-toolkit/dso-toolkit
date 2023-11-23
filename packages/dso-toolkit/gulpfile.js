import gulp from "gulp";

import { buildScripting } from "./gulp/build-scripting.js";
import { buildStyling } from "./gulp/build-styling.js";
import { buildSvgSpritesheet } from "./gulp/build-svg-spritesheet.js";
import { cleanDist } from "./gulp/clean-dist.js";
import { copyMiscellaneous } from "./gulp/copy-miscellaneous.js";
import { watcher } from "./gulp/watcher.js";

gulp.task(
  "build",
  gulp.series(cleanDist, gulp.parallel(copyMiscellaneous, buildScripting, buildStyling, buildSvgSpritesheet)),
);
gulp.task("default", gulp.series("build", watcher));
