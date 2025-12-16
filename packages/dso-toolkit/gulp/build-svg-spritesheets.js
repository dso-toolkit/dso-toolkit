import { basename } from "path";

import { parse } from "css";
import gulp from "gulp";
import cheerio from "gulp-cheerio";
import gulpPrettier from "gulp-prettier";
import rename from "gulp-rename";
import svgstore from "gulp-svgstore";
import { obj } from "list-stream";

import { sassTransformer } from "./transformers/sass.transformer.js";

const iconsPath = "src/icons";
const distPath = "dist";
const diSpritesheetFilename = "di.svg";
const canvasSize = 32;
const gutterSize = 10;

function prettier() {
  return gulpPrettier({
    plugins: ["@prettier/plugin-xml"],
    xmlWhitespaceSensitivity: "ignore",
  });
}

async function parseStylesheets() {
  return new Promise((resolve, reject) => {
    gulp
      .src(`${iconsPath}/*.scss`) // Read all SCSS files in the icons directory
      .pipe(sassTransformer()) // Transform SCSS into plain CSS
      .pipe(
        obj((error, data) => {
          if (error) {
            return reject(error);
          }

          // Process each transformed SCSS file
          const parsedStyles = data.map(({ relative, extname, contents }) => {
            const id = basename(relative, extname); // Extract the file name without the extension
            const style = contents.toString();
            const ast = parse(style); // Parse the CSS into an abstract syntax tree (AST)

            // Extract color variants for each CSS rule
            const variants = ast.stylesheet.rules
              .filter((rule) => rule.type === "rule") // Keep only CSS rules (ignore comments, etc.)
              .flatMap((rule) => {
                const colorDeclaration = rule.declarations.find((d) => d.property === "color");
                if (!colorDeclaration) {
                  return [];
                }

                const color = colorDeclaration.value;
                return rule.selectors.reduce((result, selector) => {
                  // Mark as default variant
                  if (selector === id) {
                    result.push({
                      selector: "default",
                      color,
                    });
                  }

                  // Extract the variant name
                  else if (selector.startsWith(`${id}:`)) {
                    result.push({
                      selector: selector.slice(id.length + 1),
                      color,
                    });
                  }

                  return result;
                }, []);
              });

            return { id, variants };
          });

          resolve(parsedStyles);
        }),
      );
  });
}

export async function buildDiSvgSpritesheet() {
  const iconStylesheets = await parseStylesheets(); // Parse stylesheets within the function

  if (!iconStylesheets || iconStylesheets.length === 0) {
    throw new Error("No icon stylesheets found. Pipeline terminated.");
  }

  return gulp
    .src(`${iconsPath}/*.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(
      cheerio({
        run($) {
          $(":root").removeAttr("xmlns:xlink");

          const symbols = $("symbol").toArray();
          let position = 0;

          for (const symbol of symbols) {
            const $symbol = $(symbol);
            const id = $symbol.attr("id");
            const stylesheet = iconStylesheets.find((s) => s.id === id);

            if (!stylesheet) {
              $symbol.remove();
              continue;
            }

            const variants = [
              {
                selector: id,
                color: stylesheet.variants.find((v) => v.selector === "default")?.color,
              },
              ...stylesheet.variants
                .filter((v) => v.selector !== "default")
                .map((v) => ({
                  selector: `${id}-${v.selector}`,
                  color: v.color,
                })),
            ];

            for (const [index, variant] of variants.entries()) {
              const x = (position + index) * (canvasSize + gutterSize) + gutterSize / 2;

              const $view = $("<view>")
                .attr("id", variant.selector)
                .attr("viewBox", [x, 0, canvasSize, canvasSize].join(" "));

              const $svgElement = $symbol
                .clone()
                .removeAttr("id")
                .each((_index, element) => (element.tagName = "svg"));

              if (variant.color) {
                $svgElement.find('[fill="currentColor"]').attr("fill", variant.color);
              }

              const $group = $("<g>").attr("transform", `translate(${x})`).append($svgElement);

              $symbol.before($view).before($group);
            }

            $symbol.remove();
            position += variants.length;
          }

          // Calculate and set the parent SVG viewBox
          const totalWidth = position * (canvasSize + gutterSize) + gutterSize;
          $(":root").attr("viewBox", `0 0 ${totalWidth} ${canvasSize}`);
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe(prettier())
    .pipe(rename(diSpritesheetFilename))
    .pipe(gulp.dest(distPath));
}
