describe("Progress Indicator", () => {
  const sizes = [
    {
      size: "small",
      iconSize: 24,
    },
    {
      size: "medium",
      iconSize: 32,
    },
    {
      size: "large",
      iconSize: 48,
    },
  ];

  for (const { size, iconSize } of sizes) {
    it(`should show ${size} spinner (Core)`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-progress-indicator--${size}`)
        .get("dso-progress-indicator")
        .should("have.attr", "size", size)
        .shadow()
        .as("dsoProgressIndicator")
        .get("@dsoProgressIndicator")
        .find(".dso-progress-indicator-spinner")
        .as("spinner")
        .should("have.attr", "role", "progressbar")
        .and("have.attr", "aria-labelledby", "progress-indicator-label")
        .and("be.visible")
        .get("@spinner")
        .and("have.css", "height")
        .then((height) => typeof height === "string" && parseInt(height, 10))
        .should("eq", iconSize)
        .get("@spinner")
        .and("have.css", "width")
        .then((height) => typeof height === "string" && parseInt(height, 10))
        .should("eq", iconSize)
        .get("@dsoProgressIndicator")
        .find(".dso-progress-indicator-label")
        .should("have.text", "Resultaten laden: een moment geduld alstublieft.")
        .get("@spinner")
        .invoke("attr", "style", "visibility: hidden;") // hide the spinner to prevent false negatives
        .get("@dsoProgressIndicator")
        .matchImageSnapshot(`core-progress-indicator--${size}`);
    });
  }

  for (const { size } of sizes) {
    it(`should show ${size} spinner (HTML/CSS)`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=html-css-progress-indicator--${size}`);

      cy.get(".dso-progress-indicator").matchImageSnapshot(`html-css-progress-indicator--${size}`);
    });
  }
});
