// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

import { cypressStyling } from "./cypress-styling";
import * as axe from "axe-core";
import { Options } from "cypress-axe";

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- De namespace wordt opgelegd vanuit Cypress
  namespace Cypress {
    interface Chainable {
      /**
       * Checks if element is within the viewport. Useful for scrollIntoView testing.
       */
      isWithinViewport(): Chainable<Element>;

      /**
       * Executes cypress-axe checkA11y only after hydrated web-components exist in the Dom
       */
      dsoCheckA11y(context?: string, options?: Options): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("isWithinViewport", { prevSubject: true }, (subject) => {
  const windowInnerWidth = Cypress.config(`viewportWidth`);
  const windowInnerHeight = Cypress.config(`viewportHeight`);

  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.within(0, windowInnerHeight);
  expect(rect.right).to.be.within(0, windowInnerWidth);
  expect(rect.bottom).to.be.within(0, windowInnerHeight);
  expect(rect.left).to.be.within(0, windowInnerWidth);

  return subject;
});

// Automatically apply styles after visiting a new page
Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  // @ts-expect-error -- https://github.com/cypress-io/cypress/issues/19564
  return originalFn(url, options).then(() => {
    cypressStyling();
  });
});

/**
 * This overwrite waits for the DOM to stabilise before taking the screenshot.
 *
 * See https://github.com/narinluangrath/cypress-wait-for-stable-dom.
 */
Cypress.Commands.overwrite("screenshot", (originalFn, ...args) => {
  return cy.waitForStableDOM().then(() => originalFn(...args));
});

/**
 * violationCallback function to show details on accessibility violations
 */
function terminalLog(violations: axe.Result[]) {
  cy.task(
    "error",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(({ id, impact, description, nodes }) => ({
    id,
    impact,
    description,
    nodes: nodes.length,
  }));

  cy.task("table", violationData);
}

Cypress.Commands.add("dsoCheckA11y", (context, options) => {
  return cy.get(context).should("exist", { log: false }).checkA11y(context, options, terminalLog);
});
