import { readFileSync, readdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "node:path";

import minimist from "minimist";
import * as prettier from "prettier";
import { optimize } from "svgo";

import { setFillCurrentColor } from "./set-fill-current-color";

interface Args {
  dir: string | undefined;
  prefix: string | undefined;
}

const camelize = (s: string) => s.replace(/-./g, (x) => x[1].toUpperCase());

async function format(source: string, filepath: string) {
  return await prettier.format(source, {
    ...(await prettier.resolveConfig(filepath)),
    filepath,
  });
}

const getAliases = (icons: string[], prefix: string) => {
  const aliases = icons.map((icon) => path.basename(icon.replace(prefix, "").toLowerCase(), ".svg"));
  // TODO: Volgende regel verwijderen via #3525
  aliases.splice(aliases.indexOf("favicon"), 1);
  return aliases;
};

// spinner is een speciale svg met een animatie erin, die niet overschreven moet worden.
// favicon is voorlopig nog als icon in FIGMA aanwezig, maar willen we niet als icon aanbieden.
// favicon zal via issue #3525 worden verwijderd
// TODO: #3525
const ignoreIcons = ["favicon", "spinner"];

const args = minimist<Args>(process.argv.slice(2));

main(args.newIconsDir).catch((error) => {
  console.error(error);

  process.exit(1);
});

async function main(newIconsDir: string = "./packages/dso-toolkit/src/icons-new", prefix: string = "Icon=") {
  const iconsDir = "./packages/dso-toolkit/src/icons";
  const icons = readdirSync(newIconsDir);

  for (const icon of icons) {
    const newIconPath = `${newIconsDir}/${icon}`;
    const iconPath = `${iconsDir}/${icon.replace(prefix, "").toLowerCase()}`;
    const iconName = path.basename(iconPath, ".svg");

    if (!ignoreIcons.includes(iconName)) {
      const svgString = await readFile(newIconPath, "utf8");
      const result = optimize(svgString, {
        path: iconPath,
        js2svg: { indent: 4, pretty: true },
        multipass: true,
        plugins: [
          "removeDimensions",
          {
            name: "addAttributesToSVGElement",
            params: {
              attribute: {
                id: iconName,
              },
            },
          },
          {
            name: "sortAttrs",
            params: {
              order: ["fill", "id", "viewBox"],
              xmlnsOrder: "alphabetical",
            },
          },
          {
            name: "removeAttrs",
            params: {
              attrs: ["svg:fill"],
              elemSeparator: ":",
              preserveCurrentColor: true,
            },
          },
          setFillCurrentColor,
        ],
      });

      await writeFile(iconPath, result.data);
    }
  }

  await generateTypeIconAlias(icons, prefix);

  await updateIconTsx(icons, prefix);
}

async function generateTypeIconAlias(icons: string[], prefix: string) {
  const aliases = getAliases(icons, prefix);

  const contents = `export type IconAlias = "${aliases.join('"|"')}"`;

  // Start: Core icon.interfaces.ts
  let filepath = "packages/core/src/components/icon/icon.interfaces.ts";
  await writeFile(filepath, await format(contents, filepath));
  // End: Core icon.interfaces.ts

  // Start: DSO-Toolkit icon.models.ts
  filepath = "packages/dso-toolkit/src/components/icon/icon.models.ts";

  const iconModels = readFileSync(filepath, "utf-8");

  const iconModelsLines = iconModels.split("\r\n");
  const start = iconModelsLines.indexOf("// Start: type IconAlias") + 1;
  const deleteCount = iconModelsLines.indexOf("// End: type IconAlias") - start;
  iconModelsLines.splice(start, deleteCount, contents);

  await writeFile(filepath, await format(iconModelsLines.join("\r\n"), filepath));
  // End: DSO-Toolkit icon.models.ts
}

async function updateIconTsx(icons: string[], prefix: string) {
  const filepath = "packages/core/src/components/icon/icon.tsx";
  const aliases: string[] = getAliases(icons, prefix);

  const iconTsx = readFileSync(filepath, "utf-8");

  // Filter out svg import statements
  let iconTsxLines = iconTsx.split("\r\n").filter((line) => !(line.startsWith("import ") && line.endsWith('.svg";')));

  // Insert new svg import statements
  aliases.forEach((alias, index) => {
    iconTsxLines.splice(
      iconTsxLines.indexOf("// Start: import svg") + 1 + index,
      0,
      `import ${camelize(alias)} from "dso-toolkit/src/icons/${alias}.svg";`,
    );
  });

  // Filter out svg alias objects
  iconTsxLines = iconTsxLines.filter((line) => !(line.includes('{ alias: "') && line.endsWith(" },")));

  // Insert new svg alias objects
  aliases.forEach((alias, index) => {
    iconTsxLines.splice(
      iconTsxLines.findIndex((l) => l.includes("// Start: alias object")) + 1 + index,
      0,
      `{ alias: "${alias}", svg: ${camelize(alias)} },`,
    );
  });

  await writeFile(filepath, await format(iconTsxLines.join("\r\n"), filepath));
}
