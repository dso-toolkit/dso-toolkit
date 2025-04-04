/**
 * Original source: https://github.com/narinluangrath/cypress-wait-for-stable-dom/blob/9f4abdc/src/wait-for-stable-dom.js
 *
 * Improvements:
 * - Single MutationObserver for all elements and intervals, instead of a new MutationObserver per interval.
 * - Added support for Shadow DOM.
 * - Disconnects MutationObserver when stable DOM is detected.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- De namespace wordt opgelegd vanuit Cypress
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for stable DOM. This is useful for web-components that are not yet finished rendering.
       */
      waitForStableDOM(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export function getWaitForStableDOM() {
  return function waitForStableDOM(subject: JQuery<HTMLElement> | undefined) {
    cy.log(`Waiting for stable DOM...`);
    const options = {
      poll: 75,
      timeout: 6000,
    };

    return cy.window({ log: false }).then((win) => {
      const doc = win.document;

      const target = subject?.[0] ?? doc.body;
      let mutations = 0;
      const observing = [];

      const mutationObserver = new MutationObserver(() => {
        observe(target);

        mutations++;
      });

      function observe(element: Element | ShadowRoot) {
        if (observing.includes(element)) {
          return;
        }

        if (element instanceof win.ShadowRoot) {
          cy.log(`Observing ShadowRoot of ${element.host.tagName}`);
        } else if (element instanceof win.Document) {
          cy.log(`Observing document`);
        } else if (element instanceof win.Element) {
          cy.log(`Observing ${element.tagName}`);
        }

        observing.push(element);

        mutationObserver.observe(element, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeOldValue: true,
          characterData: true,
          characterDataOldValue: true,
        });

        if (element instanceof win.Element && element.shadowRoot) {
          observe(element.shadowRoot);
        }

        element.querySelectorAll("*").forEach((el) => {
          if (el.shadowRoot) {
            observe(el.shadowRoot);
          }
        });
      }

      observe(target);

      function wait(iteration = 0) {
        return cy.wait(options.poll).then(() => {
          if (mutations === iteration) {
            cy.log(`Stable DOM`);

            mutationObserver.disconnect();

            return cy.wrap(target, { log: false });
          }

          if (iteration * options.poll < options.timeout) {
            cy.log(`DOM Mutation detected`);

            return wait(iteration + 1);
          }

          throw Error("Timed out waiting for stable DOM");
        });
      }

      return wait();
    });
  };
}
