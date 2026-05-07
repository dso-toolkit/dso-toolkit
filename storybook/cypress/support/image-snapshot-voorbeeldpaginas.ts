import { waitForComponents } from "./wait-for-components";

interface Viewport {
  width: number;
  height: number;
}

interface ExamplePage {
  id: string;
  viewport?: Viewport;
}

export function voorbeeldpaginaImageSnapshots(label: string, voorbeeldpaginas: ExamplePage[], args?: string) {
  describe(`Voorbeeldpagina image snapshots (${label})`, () => {
    for (const voorbeelpagina of voorbeeldpaginas) {
      it(`matches image snapshot of ${voorbeelpagina.id} (${label})`, () => {
        if (voorbeelpagina.viewport) {
          cy.viewport(voorbeelpagina.viewport.width, voorbeelpagina.viewport.height);
        }

        cy.visit(`http://localhost:45000/iframe.html?id=${voorbeelpagina.id}${args ? `&args=${args}` : ""}`);

        waitForComponents();

        cy.matchImageSnapshot();
      });
    }
  });
}
