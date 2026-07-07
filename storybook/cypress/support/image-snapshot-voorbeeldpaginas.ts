import { waitForComponents } from "./wait-for-components";

interface Viewport {
  width: number;
  height: number;
}

interface ExamplePage {
  id: string;
  viewport?: Viewport;
  args?: string;
}

export function voorbeeldpaginaImageSnapshots(
  label: string,
  voorbeeldpaginas: ExamplePage[],
  preferredImplementation?: string,
) {
  describe(`Voorbeeldpagina image snapshots (${label})`, () => {
    for (const voorbeelpagina of voorbeeldpaginas) {
      it(`matches image snapshot of ${voorbeelpagina.id} (${label})`, () => {
        if (voorbeelpagina.viewport) {
          cy.viewport(voorbeelpagina.viewport.width, voorbeelpagina.viewport.height);
        }

        const argsParts: string[] = [];
        if (preferredImplementation) {
          argsParts.push(`preferredImplementation:${preferredImplementation}`);
        }
        if (voorbeelpagina.args) {
          argsParts.push(voorbeelpagina.args);
        }
        const args = argsParts.length > 0 ? argsParts.join(";") : "";

        cy.visit(`http://localhost:45000/iframe.html?id=${voorbeelpagina.id}${args ? `&args=${args}` : ""}`);

        waitForComponents();

        if (voorbeelpagina.args) {
          cy.matchImageSnapshot(
            `Voorbeeldpagina image snapshots (${label}) -- ${Cypress.currentTest.title} (${voorbeelpagina.args})`,
          );
        } else {
          cy.matchImageSnapshot();
        }
      });
    }
  });
}
