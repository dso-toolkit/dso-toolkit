import imageSnapshotVoorbeeldpaginas from "../fixtures/image-snapshot-voorbeeldpaginas.json";
import { waitForComponents } from "../support/wait-for-components";

interface Viewport {
  width: number;
  height: number;
}

interface ExamplePage {
  id: string;
  viewport?: Viewport;
  args?: string;
}

describe(`Voorbeeldpagina image snapshots`, () => {
  const voorbeeldpaginas: ExamplePage[] = imageSnapshotVoorbeeldpaginas;
  for (const voorbeelpagina of voorbeeldpaginas) {
    it(`matches image snapshot of ${voorbeelpagina.id}`, () => {
      if (voorbeelpagina.viewport) {
        cy.viewport(voorbeelpagina.viewport.width, voorbeelpagina.viewport.height);
      }

      const argsParts: string[] = [];
      if (voorbeelpagina.args) {
        argsParts.push(voorbeelpagina.args);
      }
      const args = argsParts.length > 0 ? argsParts.join(";") : "";

      cy.visit(`http://localhost:45000/iframe.html?id=${voorbeelpagina.id}${args ? `&args=${args}` : ""}`);

      waitForComponents();

      if (voorbeelpagina.args) {
        cy.matchImageSnapshot(
          `Voorbeeldpagina image snapshots -- ${Cypress.currentTest.title} (${voorbeelpagina.args})`,
        );
      } else {
        cy.matchImageSnapshot();
      }
    });
  }
});
