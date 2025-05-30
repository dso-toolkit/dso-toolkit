import { DocumentComponentMarkFunction } from "@dso-toolkit/core/src/components";
import { isOdd } from "dso-toolkit";

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
      .should("have.length", 5)
      .then((calls) => calls.map((c) => c.args))
      .should("have.deep.members", [
        ["Artikel", "kop"],
        ["13.12c", "kop"],
        ["NootInKop III ", "kop"],
        ["Thomas en Eric test 3.", "kop"],
        ["Opschrift", "kop"],
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

  for (const wijzigactieState of states) {
    for (const annotationsWijzigactieState of states) {
      it(`matches image snapshot wijzigactie ${wijzigactieState} with annotationsWijzigactie ${annotationsWijzigactieState}`, () => {
        const wijzigactie = wijzigactieState === "default" ? null : wijzigactieState;
        const annotationsWijzigactie = annotationsWijzigactieState === "default" ? null : annotationsWijzigactieState;

        // this test uses args to set the initial state of the component because the argsMapper is needed for the annotations
        cy.visit(
          "http://localhost:45000/iframe.html?id=core-document-component--default&args=open:!true;openAnnotation:!true",
        )
          .get("dso-document-component.hydrated")
          .invoke("prop", "open", true)
          .invoke("prop", "openAnnotation", true)
          .invoke("prop", "wijzigactie", wijzigactie)
          .invoke("prop", "annotationsWijzigactie", annotationsWijzigactie);

        if (wijzigactie) {
          cy.get("dso-document-component.hydrated").should("have.attr", "wijzigactie", wijzigactie);
        } else {
          cy.get("dso-document-component.hydrated").should("not.have.attr", "wijzigactie");
        }

        if (annotationsWijzigactie) {
          cy.get("dso-document-component.hydrated").should(
            "have.attr",
            "annotations-wijzigactie",
            annotationsWijzigactie,
          );
        } else {
          cy.get("dso-document-component.hydrated").should("not.have.attr", "annotations-wijzigactie");
        }

        cy.get("dso-document-component.hydrated").matchImageSnapshot();
      });
    }
  }

  for (const state of ["default", "voegtoe", "verwijder"]) {
    it(`matches image snapshot ${state} - table-of-contents`, () => {
      const wijzigactie = state === "default" ? null : state;

      cy.visit("http://localhost:45000/iframe.html?id=core-document-component--default")
        .get("dso-document-component.hydrated")
        .invoke("prop", "wijzigactie", wijzigactie)
        .invoke("prop", "filtered", false)
        .invoke("prop", "mode", "table-of-contents");

      if (wijzigactie) {
        cy.get("dso-document-component.hydrated").should("have.attr", "wijzigactie", wijzigactie);
      } else {
        cy.get("dso-document-component.hydrated").should("not.have.attr", "wijzigactie");
      }

      cy.get("dso-document-component.hydrated").matchImageSnapshot();
    });
  }
});
