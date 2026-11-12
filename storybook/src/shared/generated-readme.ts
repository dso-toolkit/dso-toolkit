// In CI zet packages/core/scripts/readme.ts de Types-sectie vóór het deel van Stencil, dus die marker gaat voor.
const markers = ["<!-- Auto Generated dso-toolkit -->", "<!-- Auto Generated Below -->"];

// De handmatige documentatie staat in de MDX. Stencil begint bij h2. Staat de API van een subcomponent onder een eigen
// kop in de MDX, dan schuiven de koppen een niveau op.
export function generatedReadme(readme: string, { headingLevel = 2 }: { headingLevel?: number } = {}): string {
  const start = markers.map((marker) => readme.indexOf(marker)).find((index) => index >= 0);

  if (start === undefined) {
    throw new Error("Readme zonder gegenereerd deel");
  }

  const prefix = "#".repeat(headingLevel - 2);
  let inCodeBlock = false;

  return readme
    .slice(start)
    .split(/\r?\n/)
    .map((line) => {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
      }

      if (!inCodeBlock && /^#{1,6} /.test(line)) {
        return `${prefix}${line}`;
      }

      return line;
    })
    .join("\n");
}
