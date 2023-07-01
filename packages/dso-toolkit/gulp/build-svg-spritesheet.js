/* eslint-env node */

import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import { basename } from "path";
import { obj } from "list-stream";
import { parse } from "css";
import svgstore from "gulp-svgstore";
import cheerio from "gulp-cheerio";
import prettier from "gulp-prettier";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

const iconsPath = "src/icons";
const distPath = "dist";

export async function buildSvgSpritesheet() {
  const sassCompiler = sass().on("error", sass.logError);

  const stylesheets = await new Promise((resolve, reject) => {
    gulp
      .src(`${iconsPath}/*.scss`)
      .pipe(sassCompiler)
      .pipe(
        obj((error, data) => {
          if (error) {
            reject(error);
          }

          resolve(
            data.map(({ relative, extname, contents }) => {
              const id = basename(relative, extname);
              const style = contents.toString();
              const ast = parse(style);
              const variants = ast.stylesheet.rules
                .filter((r) => r.type === "rule")
                .reduce((v, rule) => {
                  const variantColors = rule.selectors.reduce((current, s) => {
                    const color = rule.declarations.find((d) => d.property === "color")?.value;

                    if (s === id && !v.some((variantColor) => variantColor.selector === s)) {
                      return current.concat({
                        color,
                        selector: "default",
                      });
                    }

                    if (
                      s.startsWith(`${id}:`) &&
                      !v.some((variantColor) => variantColor.selector === s.substr(`${id}:`.length))
                    ) {
                      return current.concat({
                        color,
                        selector: s.substr(`${id}:`.length),
                      });
                    }

                    return current;
                  }, []);

                  v.push(...variantColors);

                  return v;
                }, []);

              return { id, variants };
            })
          );
        })
      );
  });

  return new Promise((resolve, reject) => {
    gulp
      .src(`${iconsPath}/*.svg`)
      .pipe(prettier())
      .pipe(
        svgstore({
          inlineSvg: true,
        })
      )
      .pipe(
        cheerio({
          run($) {
            const canvas = 32;
            const gutter = 10;
            const symbols = $("symbol").toArray();
            const positions = symbols.reduce((position, element) => {
              const symbol = $(element);
              const id = symbol.attr("id");

              const stylesheet = stylesheets.find((s) => s.id === id);

              const variants = [
                { selector: id, color: stylesheet?.variants.find((v) => v.selector === "default")?.color },
                ...(stylesheet?.variants
                  .filter((v) => v.selector !== "default")
                  .map((v) => ({ selector: `${id}-${v.selector}`, color: v.color })) ?? []),
              ];

              const iconIds = variants.map((v) => v.selector);

              symbol.before(`<!-- START: ${iconIds.join(", ")} -->`).after(`<!-- END: ${iconIds.join(", ")} -->`);

              variants.forEach((variant, index) => {
                const x = (position + index) * (canvas + gutter) + gutter / 2;
                const svg = symbol.clone().removeAttr("id");
                $(svg).each((_index, element) => (element.tagName = "svg"));

                if (variant.color) {
                  svg.find('[fill="currentColor"]').attr("fill", variant.color);
                }

                const view = $("<view>")
                  .attr("id", `img-${variant.selector}`)
                  .attr("viewBox", [x, 0, canvas, canvas].join(" "));

                symbol.before(view);

                const g = $("<g>").attr("transform", `translate(${x})`).append(svg);

                symbol.before(g);
              });

              return position + variants.length;
            }, 0);

            $(":root").attr(
              "viewBox",
              [
                (positions * (canvas + gutter)) / 2 - (canvas + gutter) / 2 + gutter / 2,
                0,
                positions * (canvas + gutter) + gutter,
                canvas,
              ].join(" ")
            );
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(prettier())
      .pipe(rename("dso-icons.svg"))
      .pipe(gulp.dest(distPath))
      .on("end", resolve)
      .on("error", reject);
  });
}
