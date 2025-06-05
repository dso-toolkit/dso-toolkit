/**
 * Postbuild transform script
 *
 * Dit script draait na de build van het main Storybook project en vervangt alle <link> elementen met een data-dt-postbuild-href attribuut.
 *
 * Storybook biedt assets uit node_modules via twee verschillende manieren aan, afhankelijk van de modus:
 *
 * - storybook dev: assets worden ontsloten via `/static/packages`
 * - storybook build: assets worden gebundeld in de build output en ontsloten via `/static/media`
 *
 * Als het project lokaal wordt opgestart, worden de `<link>` elementen zoals ze in `main.ts` zijn gedefinieerd, gebruikt. Als het project
 * wordt gebouwd, worden deze `<link>` elementen aangepast naar de gebundelde versie in de build output. De gebundelde versie wordt
 * gebruikt bij `yarn e2e` en op dso-toolkit.nl
 */

import { readFile, readdir, writeFile } from "fs/promises";
import { basename, extname } from "path";

import { load } from "cheerio";

(async () => {
  console.info("Running postbuild transform script...");

  const mediaFiles = await readdir("www/static/media", { recursive: true });
  const buffer = await readFile("www/iframe.html");

  const $ = load(buffer);

  $("link[href][data-dt-postbuild-href]").each((_, element) => {
    const $element = $(element);
    const href = $element.attr("href");

    const extension = extname(href);
    const filename = basename(href, extension);

    const bundledFile = mediaFiles.find((file) => file.startsWith(filename) && extname(file) === extension);

    if (!bundledFile) {
      throw new Error(`No bundled file found for ${href}`);
    }

    $element.attr("href", `static/media/${bundledFile}`);
    $element.removeAttr("data-dt-postbuild-href");

    console.info(`Replaced ${href} with static/media/${bundledFile}`);
  });

  await writeFile("www/iframe.html", $.html(), "utf8");

  console.info("Postbuild transform script completed successfully.");
})();
