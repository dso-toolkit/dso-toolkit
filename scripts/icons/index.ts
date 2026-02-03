import { readdirSync } from "fs";
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

  // await updateIconTsx(icons, prefix);

  await generateTypeIconAlias(icons, prefix);
}

// async function updateIconTsx(icons: string[], prefix: string) {
//   const iconTsx = readFileSync("packages/core/src/components/icon/icon.tsx", "utf-8");
//   const iconTsxLines = iconTsx.split("\r\n");
//   for (const line of iconTsxLines) {
//     console.log(line);
//   }
// }

async function generateTypeIconAlias(icons: string[], prefix: string) {
  const filepath = "packages/core/src/components/icon/icon.interfaces.ts";
  const aliases: string[] = icons.map((icon) => path.basename(icon.replace(prefix, "").toLowerCase(), ".svg"));
  const contents = prettier.format(`export type IconAlias = "${aliases.join('"|"')}"`, {
    ...(await prettier.resolveConfig(filepath)),
    filepath,
  });

  await writeFile(filepath, await contents);
}
