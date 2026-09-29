import gulp from "gulp";

import { buildStyling } from "./gulp/build-styling.js";
import { cleanDist } from "./gulp/clean-dist.js";
import { copyMiscellaneous } from "./gulp/copy-miscellaneous.js";
import { watcher } from "./gulp/watcher.js";

gulp.task("build", gulp.series(cleanDist, gulp.parallel(copyMiscellaneous, buildStyling)));
gulp.task("default", gulp.series("build", watcher));
