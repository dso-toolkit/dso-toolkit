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

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- De namespace wordt opgelegd vanuit Cypress
  namespace Cypress {
    interface Chainable {
      /**
       * Checks if element is within the viewport. Useful for scrollIntoView testing.
       */
      isWithinViewport(): Chainable<Element>;
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
 * This overwrite tries to wait for all fonts to load before taking the screenshot.
 *
 * See #2748 for more information.
 */
Cypress.Commands.overwrite("screenshot", (originalFn, ...args) => {
  return cy
    .document()
    .its("fonts.status")
    .should("equal", "loaded")
    .then(() => originalFn(...args));
});
