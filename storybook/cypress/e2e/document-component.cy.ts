import { DocumentComponentMarkFunction } from "@dso-toolkit/core/src/components";

describe("Document Component", () => {
  it("should mark and highlight", () => {
    const marker: DocumentComponentMarkFunction = (text, source) =>
      text
        .split(new RegExp(`(k)`, "gi"))
        .map((item, index) => (isOdd(index) ? { text: item, highlight: source === "label" && index === 1 } : item));

    cy.visit("http://localhost:45000/iframe.html?id=core-document-component--default")
      .get("dso-document-component")
      .should("have.class", "hydrated")
      .then(($documentComponent) => ($documentComponent[0].mark = cy.spy(marker).as("marker")))
      .get("@marker")
      .invoke("getCalls")
      .should("have.length", 3)
      .then((calls) => calls.map((c) => c.args))
      .should("have.deep.members", [
        ["Overgangsrecht: rijksbeschermde stads- en dorpsgezichten", "opschrift"],
        ["Artikel", "label"],
        ["3.3", "nummer"],
      ]);
  });

  it("shows a badge with an exclamationmark with tooltip", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-component--default")
      .get("dso-document-component")
      .invoke("attr", "geneste-ontwerp-informatie", true)
      .invoke("attr", "bevat-ontwerp-informatie", false)
      .shadow()
      .as("dsoDocumentComponent")
      .find("dso-badge[aria-describedby='nested-draft-description'].hydrated")
      .should("have.text", "!")
      .get("@dsoDocumentComponent")
      .find("dso-tooltip#nested-draft-description.hydrated")
      .should("have.text", "Er zijn onderliggende onderdelen die veranderen binnen dit ontwerp.");
  });

  const states = ["default", "voegtoe", "verwijder"];

  for (const wijzigactie of states) {
    for (const annotationsWijzigactie of states) {
      // Test uitgezet ivm flakyness. Gaan we weer aanzetten in #2934
      it.skip(`matches image snapshot wijzigactie ${wijzigactie} with annotationsWijzigactie ${annotationsWijzigactie}`, () => {
        // this test uses args to set the initial state of the component because the argsMapper is needed for the annotations
        cy.visit(
          "http://localhost:45000/iframe.html?id=core-document-component--default&args=open:!true;openAnnotation:!true",
        )
          .get("dso-document-component.hydrated")
          .invoke("prop", "wijzigactie", wijzigactie === "default" ? null : wijzigactie)
          .invoke(
            "prop",
            "annotationsWijzigactie",
            annotationsWijzigactie === "default" ? null : annotationsWijzigactie,
          )
          .matchImageSnapshot();
      });
    }
  }

  for (const state of ["default", "voegtoe", "verwijder"]) {
    // Test uitgezet ivm flakyness. Gaan we weer aanzetten in #2934
    it.skip(`matches image snapshot ${state} - table-of-contents`, () => {
      cy.visit(
        "http://localhost:45000/iframe.html?id=core-document-component--default&args=filtered:!false;mode:table-of-contents",
      )
        .get("dso-document-component.hydrated")
        .invoke("prop", "wijzigactie", state === "default" ? null : state)
        .matchImageSnapshot();
    });
  }
});

function isOdd(n: number): boolean {
  return Math.abs(n % 2) === 1;
}
