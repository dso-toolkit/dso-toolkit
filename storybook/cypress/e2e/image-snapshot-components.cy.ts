import components from "../fixtures/image-snapshot-components.json";

interface Component {
  name: string;
  selector: string;
  stories?: string[];
  type: string;
  wait?: string | string[];
  shadowWait?: string;
}

function checkA11y(component: Component) {
  if (component.type === "core") {
    cy.injectAxe();
    cy.dsoCheckA11y(`dso-${component.name}.hydrated`);
  }
}

function matchImageSnapshot(id: string, component: Component) {
  if (component.selector) {
    if (component.shadowWait) {
      cy.get(component.selector)
        .shadow()
        .find(component.shadowWait)
        .should("exist")
        .get(component.selector)
        .matchImageSnapshot(id);
    } else {
      cy.get(component.selector).matchImageSnapshot(id);
    }
  } else {
    cy.matchImageSnapshot(id);
  }
}

function waitForExist(id: string, component: Component, wait: string[]) {
  cy.get(wait.pop())
    .should("exist")
    .then(() => {
      if (wait.length) {
        waitForExist(id, component, wait);
      } else {
        matchImageSnapshot(id, component);
        checkA11y(component);
      }
    });
}

function test(id: string, component: Component, wait: string | string[]) {
  it(`take screenshot of ${id}`, () => {
    cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

    if (wait) {
      if (Array.isArray(wait)) {
        waitForExist(id, component, wait);
      } else {
        cy.get(wait)
          .should("exist")
          .then(() => {
            matchImageSnapshot(id, component);
            checkA11y(component);
          });
      }
    } else {
      matchImageSnapshot(id, component);
      checkA11y(component);
    }
  });
}

describe("Components without e2e tests", () => {
  const stories: Component[] = components.filter((component) => component.stories);
  for (const component of stories) {
    for (const story of component.stories) {
      const id = `${component.type}-${component.name}--${story}`;
      test(id, component, component.wait);
    }
  }
});
