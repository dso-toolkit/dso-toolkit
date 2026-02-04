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

  await updateIconTsx(icons, prefix);

  await generateTypeIconAlias(icons, prefix);
}

async function updateIconTsx(icons: string[], prefix: string) {
  const filepath = "packages/core/src/components/icon/icon.tsx";
  const aliases: string[] = icons.map((icon) => path.basename(icon.replace(prefix, "").toLowerCase(), ".svg"));
  // TODO: Volgende regel verwijderen via #3525
  aliases.splice(aliases.indexOf("favicon"), 1);

  const iconTsx = readFileSync(filepath, "utf-8");

  // Filter out old import statements
  let iconTsxLines = iconTsx.split("\r\n").filter((line) => !(line.startsWith("import ") && line.endsWith('.svg";')));

  // Insert new import statements
  aliases.forEach((alias, index) => {
    iconTsxLines.splice(
      iconTsxLines.indexOf("// Start: import svg") + 1 + index,
      0,
      `import ${camelize(alias)} from "dso-toolkit/src/icons/${alias}.svg";`,
    );
  });

  // Filter out old alias objects
  iconTsxLines = iconTsxLines.filter((line) => !(line.includes('{ alias: "') && line.endsWith(" },")));

  // Insert new alias objects
  aliases.forEach((alias, index) => {
    iconTsxLines.splice(
      iconTsxLines.findIndex((l) => l.includes("// Start: alias object")) + 1 + index,
      0,
      `{ alias: "${alias}", svg: ${camelize(alias)} },`,
    );
  });

  const contents = prettier.format(iconTsxLines.join("\r\n"), {
    ...(await prettier.resolveConfig(filepath)),
    filepath,
  });

  await writeFile(filepath, await contents);
}

async function generateTypeIconAlias(icons: string[], prefix: string) {
  const filepath = "packages/core/src/components/icon/icon.interfaces.ts";
  const aliases: string[] = icons.map((icon) => path.basename(icon.replace(prefix, "").toLowerCase(), ".svg"));
  const contents = prettier.format(`export type IconAlias = "${aliases.join('"|"')}"`, {
    ...(await prettier.resolveConfig(filepath)),
    filepath,
  });

  await writeFile(filepath, await contents);
}
