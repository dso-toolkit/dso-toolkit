describe("Percy", () => {
  before(() => {
    cy.visit("http://localhost:45000/")
      .get('button[title="Shortcuts"]')
      .click()
      .get("#collapse")
      .click()
      .get("button.sidebar-subheading-action")
      .click({ multiple: true })
      .get("#storybook-explorer-menu a.sidebar-item")
      .then((a) => Array.from(a).map((e) => e.id))
      .as("stories");

    cy.task("getAllComponentsWithSpecs").as("componentsWithSpecs");
  });

  it("take screenshot of all components without cypress tests", () => {
    cy.get<string[]>("@stories").then((stories) => {
      cy.get<string[]>("@componentsWithSpecs").then((componentsWithSpecs) => {
        const filteredStories = stories.filter((s) => !componentsWithSpecs.some((c) => s.includes(`${c}--`)));

        for (const story of filteredStories) {
          cy.visit(`http://localhost:45000/iframe.html?id=${story}`);

          cy.percySnapshot(story);
        }
      });
    });
  });
});
