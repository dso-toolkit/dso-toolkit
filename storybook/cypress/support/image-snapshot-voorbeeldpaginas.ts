import { waitForComponents } from "./wait-for-components";

export function voorbeeldpaginaImageSnapshots(label: string, voorbeeldpaginas: string[], args?: string) {
  describe(`Voorbeeldpagina image snapshots (${label})`, () => {
    for (const id of voorbeeldpaginas) {
      it(`matches image snapshot of ${id} (${label})`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=${id}${args ? `&args=${args}` : ""}`);

        waitForComponents();

        cy.matchImageSnapshot();
      });
    }
  });
}
