/* eslint-env node */

import gulp from "gulp";
import { basename } from "path";
import { obj } from "list-stream";
import { parse } from "css";
import svgstore from "gulp-svgstore";
import cheerio from "gulp-cheerio";
import prettier from "gulp-prettier";
import rename from "gulp-rename";

import { sassTransformer } from "./transformers/sass.transformer.js";

const iconsPath = "src/icons";
const distPath = "dist";
const outPutNameIcons = "dso-icons.svg";
const outPutNameIconsWithVariants = "di.svg";
const canvasSize = 32;
const gutterSize = 10;

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
                if (!colorDeclaration) return [];

                const color = colorDeclaration.value;
                return rule.selectors
                  .map((selector) => {
                    if (selector === id) {
                      return { selector: "default", color }; // Mark as default variant
                    }

                    if (selector.startsWith(`${id}:`)) {
                      return { selector: selector.slice(id.length + 1), color }; // Extract the variant name
                    }

                    return null;
                  })
                  .filter(Boolean); // Remove null entries
              });

            return { id, variants };
          });

          resolve(parsedStyles);
        }),
      );
  });
}

async function buildDiSpritesheet() {
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
          const symbols = $("symbol").toArray();
          let position = 0;

          // Create a map for quick stylesheet lookup
          const stylesheetMap = Object.fromEntries(iconStylesheets.map((s) => [s.id, s]));

          for (const symbol of symbols) {
            const $symbol = $(symbol);
            const id = $symbol.attr("id");
            const stylesheet = stylesheetMap[id];

            if (!stylesheet) {
              $symbol.remove();
              continue;
            }

            const variants = [
              { selector: id, color: stylesheet.variants.find((v) => v.selector === "default")?.color },
              ...stylesheet.variants
                .filter((v) => v.selector !== "default")
                .map((v) => ({ selector: `${id}-${v.selector}`, color: v.color })),
            ];

            for (const [index, variant] of variants.entries()) {
              const x = (position + index) * (canvasSize + gutterSize) + gutterSize / 2;

              const view = $("<view>")
                .attr("id", `${variant.selector}`)
                .attr("viewBox", [x, 0, canvasSize, canvasSize].join(" "));

              const svgElement = $("<svg>").attr("id", variant.selector).attr("viewBox", $symbol.attr("viewBox"));

              // Convert children to an array and clone each child
              for (const child of $symbol.children().toArray()) {
                const clonedChild = $(child).clone();
                if (variant.color && clonedChild.attr("fill") === "currentColor") {
                  clonedChild.attr("fill", variant.color);
                }
                svgElement.append(clonedChild);
              }

              const group = $("<g>").attr("transform", `translate(${x})`).append(svgElement);

              $symbol.before(view).before(group);
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
    .pipe(prettier({ plugins: ["@prettier/plugin-xml"] }))
    .pipe(rename(outPutNameIconsWithVariants))
    .pipe(gulp.dest(distPath));
}

async function buildSvgSpritesheet() {
  return gulp
    .src(`${iconsPath}/*.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(prettier({ plugins: ["@prettier/plugin-xml"] }))
    .pipe(rename(outPutNameIcons))
    .pipe(gulp.dest(distPath));
}

export async function buildSvgSpritesheets() {
  // Generate both styled and unstyled spritesheets
  return Promise.all([buildDiSpritesheet(), buildSvgSpritesheet()]);
}
