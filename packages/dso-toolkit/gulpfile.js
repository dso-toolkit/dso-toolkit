import gulp from "gulp";

import { buildScripting } from "./gulp/build-scripting.js";
import { buildStyling } from "./gulp/build-styling.js";
import { buildSvgSpritesheets } from "./gulp/build-svg-spritesheets.js";
import { cleanDist } from "./gulp/clean-dist.js";
import { copyMiscellaneous } from "./gulp/copy-miscellaneous.js";
import { watcher } from "./gulp/watcher.js";

gulp.task(
  "build",
  gulp.series(cleanDist, gulp.parallel(copyMiscellaneous, buildScripting, buildStyling, buildSvgSpritesheets)),
);
gulp.task("default", gulp.series("build", watcher));
