import { readFile, readdir, writeFile } from "fs/promises";
import { basename, extname } from "path";

import { load } from "cheerio";

(async () => {
  console.info("Running postbuild transform script...");

  const mediaFiles = await readdir("www/static/media", { recursive: true });
  const buffer = await readFile("www/iframe.html");

  const $ = load(buffer);

  $("[data-dt-postbuild-href]").each((_, element) => {
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
