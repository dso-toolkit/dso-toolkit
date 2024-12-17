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
const viewBoxChildSvg = 24;

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

async function buildSprite(spriteName, iconsWithStyles = false) {
  const stylesheets = await parseStylesheets(); // Parse stylesheets within the function

  return gulp
    .src(`${iconsPath}/*.svg`)
    .pipe(prettier({ plugins: ["@prettier/plugin-xml"] }))
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

          symbols.forEach((symbol) => {
            const id = $(symbol).attr("id");
            const stylesheet = stylesheets.find((s) => s.id === id);

            if (iconsWithStyles) {
              if (!stylesheet) {
                $(symbol).remove();
                return;
              }

              const variants = [
                { selector: id, color: stylesheet.variants.find((v) => v.selector === "default")?.color },
                ...stylesheet.variants
                  .filter((v) => v.selector !== "default")
                  .map((v) => ({ selector: `${id}-${v.selector}`, color: v.color })),
              ];

              variants.forEach((variant, index) => {
                const x = (position + index) * (canvasSize + gutterSize) + gutterSize / 2;

                const view = $("<view>")
                  .attr("id", `${variant.selector}`)
                  .attr("viewBox", [x, 0, canvasSize, canvasSize].join(" "));

                const svgElement = $("<svg>").attr("id", variant.selector).attr("viewBox", $(symbol).attr("viewBox"));

                $(symbol)
                  .children()
                  .clone()
                  .each((_, child) => {
                    if (variant.color && $(child).attr("fill") === "currentColor") {
                      $(child).attr("fill", variant.color);
                    }
                    svgElement.append(child);
                  });

                const group = $("<g>").attr("transform", `translate(${x})`).append(svgElement);

                $(symbol).before(view).before(group);
              });

              $(symbol).remove();
              position += variants.length;
            }
          });

          // Calculate viewBox based on total width and height
          const width = position * (canvasSize + gutterSize) + gutterSize;
          $("svg:first-child").attr("viewBox", `0 0 ${width} ${canvasSize}`);
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe(rename(spriteName))
    .pipe(gulp.dest(distPath));
}

export async function buildSvgSpritesheet() {
  // Generate both styled and unstyled spritesheets
  await Promise.all([buildSprite(outPutNameIcons, false), buildSprite(outPutNameIconsWithVariants, true)]);
}
