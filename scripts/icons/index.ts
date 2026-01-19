import { readdirSync, renameSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "node:path";

import minimist from "minimist";
import { optimize } from "svgo";

import { setFillCurrentColor } from "./set-fill-current-color";

interface Args {
  dir: string | undefined;
  prefix: string | undefined;
}

// spinner is een speciale svg met een animatie erin, die niet overschreven moet worden.
const ignoreIcons = ["spinner"];

const args = minimist<Args>(process.argv.slice(2));

main(args.dir).catch((error) => {
  console.error(error);

  process.exit(1);
});

async function main(newIconsDir: string = "./packages/dso-toolkit/src/icons-new", prefix: string = "Icon=") {
  const iconsDir = "./packages/dso-toolkit/src/icons";
  const icons = readdirSync(newIconsDir);

  for (const icon of icons) {
    const oldPath = `${newIconsDir}/${icon}`;
    const newPath = `${iconsDir}/${icon.replace(prefix, "").toLowerCase()}`;
    const iconName = path.basename(newPath, ".svg");

    if (icon.startsWith(prefix)) {
      renameSync(oldPath, newPath);
    }

    if (!ignoreIcons.includes(iconName)) {
      const svgString = await readFile(newPath, "utf8");
      const result = optimize(svgString, {
        path: newPath,
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

      await writeFile(newPath, result.data);
    }
  }
}
