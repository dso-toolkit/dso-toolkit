import gulp from "gulp";
import typescript from "gulp-typescript";

const typescriptProject = typescript.createProject("tsconfig.json");

export function buildScripting() {
  return typescriptProject
    .src()
    .pipe(typescriptProject())
    .pipe(gulp.dest(typescriptProject.config.compilerOptions.outDir));
}
