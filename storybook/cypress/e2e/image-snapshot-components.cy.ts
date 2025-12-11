import components from "../fixtures/image-snapshot-components.json";
import { waitForComponents } from "../support/wait-for-components";

interface Component {
  name: string;
  selector?: string;
  stories?: string[];
  type: string;
  failureThreshold?: number;
}

function checkA11y(component: Component) {
  if (component.type === "core") {
    cy.injectAxe();
    cy.dsoCheckA11y(component.selector);
  }
}

function matchImageSnapshot(id: string, component: Component) {
  const config = component.failureThreshold >= 0 ? { failureThreshold: component.failureThreshold } : undefined;
  if (component.selector) {
    cy.get(component.selector).matchImageSnapshot(id, config);
  } else {
    cy.matchImageSnapshot(id, config);
  }
}

function test(id: string, component: Component) {
  it(`take screenshot of ${id}`, () => {
    cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

    checkA11y(component);
    waitForComponents();
    matchImageSnapshot(id, component);
  });
}

describe("Components without e2e tests", () => {
  const stories: Component[] = components.filter((component) => component.stories);
  for (const component of stories) {
    for (const story of component.stories) {
      const id = `${component.type}-${component.name}--${story}`;

      test(id, component);
    }
  }
});
