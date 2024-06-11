export function voorbeeldpaginaImageSnapshots(label: string, voorbeeldpaginas: string[], args?: string) {
  describe.skip(`Voorbeeldpagina image snapshots (${label})`, () => {
    for (const id of voorbeeldpaginas) {
      it(`matches image snapshot of ${id} (${label})`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=${id}${args ? `&args=${args}` : ""}`);

        cy.get("#root-inner .hydrated").should(pauze(($subject) => $subject.length > 0));

        cy.matchImageSnapshot();
      });
    }
  });
}

/**
 * Pauze until the given assertion is true or the timeout is reached.
 *
 * The timeout in this function is a different (and lower) timeout than the Cypress should() timeout.
 * pauze() works because Cypress will catch any errors thrown in the callback and retry the assertion command.
 * If the assertion is still false after pauze()'s timeout, the test will continue because pauze() will stop
 * throwing errors.
 */
function pauze<T extends JQuery<HTMLElement>>(assert: (subject: T) => boolean, { timeout = 1500 }: PauzeOptions = {}) {
  let start: number;

  return ($subject: T) => {
    start ??= Date.now();

    const elapsed = Date.now() - start;
    if (elapsed < timeout && !assert($subject)) {
      throw new Error("Pauze");
    }
  };
}

interface PauzeOptions {
  timeout?: number;
}
