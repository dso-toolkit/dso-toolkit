import components from "../fixtures/image-snapshot-components.json";
import { waitForHydration } from "../support/wait-for-hydration";

interface Component {
  name: string;
  selector?: string;
  stories?: string[];
  type: string;
}

function checkA11y(component: Component) {
  if (component.type === "core") {
    cy.injectAxe();
    cy.dsoCheckA11y(`dso-${component.name}.hydrated`);
  }
}

function matchImageSnapshot(id: string, component: Component) {
  if (component.selector) {
    cy.get(component.selector).matchImageSnapshot(id);
  } else {
    cy.matchImageSnapshot(id);
  }
}

function test(id: string, component: Component) {
  it(`take screenshot of ${id}`, () => {
    cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

    checkA11y(component);
    waitForHydration();
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
