// In CI zet packages/core/scripts/readme.ts de Types-sectie vóór het deel van Stencil, dus die marker gaat voor.
const markers = ["<!-- Auto Generated dso-toolkit -->", "<!-- Auto Generated Below -->"];

// De handmatige documentatie staat in de MDX. De koppen schuiven een niveau op, omdat de MDX er een API-kop boven zet.
export function generatedReadme(readme: string): string {
  const start = markers.map((marker) => readme.indexOf(marker)).find((index) => index >= 0);

  if (start === undefined) {
    throw new Error("Readme zonder gegenereerd deel");
  }

  let inCodeBlock = false;

  return readme
    .slice(start)
    .split(/\r?\n/)
    .map((line) => {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
      }

      if (!inCodeBlock && /^#{1,5} /.test(line)) {
        return `#${line}`;
      }

      return line;
    })
    .join("\n");
}
