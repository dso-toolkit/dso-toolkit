describe("Survey Rating", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-survey-rating--default")
      .get("dso-survey-rating")
      .then(($surveyRating) => {
        $surveyRating.on("dsoSubmit", cy.stub().as("dsoSubmitListener"));
        $surveyRating.on("dsoClose", cy.stub().as("dsoCloseListener"));
      });
  });

  it("is accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-survey-rating.hydrated");

    cy.get("dso-survey-rating.hydrated").should("exist").get("dso-survey-rating.hydrated").matchImageSnapshot();

    cy.viewport(320, 720)
      .get("dso-survey-rating.hydrated")
      .should("exist")
      .get("dso-survey-rating.hydrated")
      .matchImageSnapshot(`${Cypress.currentTest.titlePath.join(" -- ")} -- small viewport`);
  });

  it("emits dsoSubmitEvent with rating undefined", () => {
    cy.get("dso-survey-rating")
      .shadow()
      .find("button")
      .click()
      .get("@dsoSubmitListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.rating")
      .should("be.undefined");
  });

  it("emits dsoSubmitEvent with rating as per checked radio input", () => {
    cy.get("dso-survey-rating")
      .shadow()
      .as("dsoSurveyRating")
      .find("label.survey-rating-2")
      .click()
      .get("@dsoSurveyRating")
      .find("button")
      .click()
      .get("@dsoSubmitListener")
      .should("have.been.calledOnce")
      .its("lastCall.args.0.detail")
      .should("deep.include", { rating: 2 });
  });

  it("emits dsoCloseEvent", () => {
    cy.get("dso-survey-rating")
      .shadow()
      .find("dso-panel")
      .shadow()
      .find("dso-icon-button.panel-close")
      .click()
      .get("@dsoCloseListener");
  });
});
