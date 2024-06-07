import components from "../fixtures/image-snapshot-components.json";

interface StoryGroup {
  group: string;
  stories: string[];
  wait?: string;
}

interface Component {
  fix?: string;
  name: string;
  selector: string;
  stories?: string[];
  storyGroups?: StoryGroup[];
  type: string;
  wait?: string;
  shadowWait?: string;
}

function matchImageSnapshot(id: string, component: Component) {
  if (component.selector) {
    if (component.shadowWait) {
      cy.get(component.selector)
        .shadow()
        .find(component.shadowWait)
        .then(() => cy.get(component.selector).matchImageSnapshot(id));
    } else {
      cy.get(component.selector).matchImageSnapshot(id);
    }
  } else {
    cy.matchImageSnapshot(id);
  }
}

function test(id: string, component: Component, wait: string) {
  it(`take screenshot of ${id}`, () => {
    cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

    if (wait) {
      cy.get(wait).then(() => matchImageSnapshot(id, component));
    } else {
      matchImageSnapshot(id, component);
    }
  });
}

describe("Components without e2e tests", () => {
  const componentsWithStories: Component[] = components.filter((component) => component.stories);
  for (const component of componentsWithStories) {
    for (const story of component.stories) {
      const id = `${component.type}-${component.name}--${story}`;
      test(id, component, component.wait);
    }
  }

  const componentsWithStoryGroups: Component[] = components.filter((component) => component.storyGroups);
  for (const component of componentsWithStoryGroups) {
    for (const storyGroup of component.storyGroups) {
      for (const story of storyGroup.stories) {
        const id = `${component.type}-${component.name}-${storyGroup.group}--${story}`;
        test(id, component, storyGroup.wait);
      }
    }
  }
});
