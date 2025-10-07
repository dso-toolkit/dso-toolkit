import { DocumentComponentMarkFunction } from "@dso-toolkit/core/src/components";
import { DocumentComponent } from "dso-toolkit";
import { TemplateResult } from "lit-html";

import { isOdd } from "../support/is-odd";

function setProps(props: Partial<DocumentComponent<TemplateResult>>) {
  return cy.get("@document-component").then(($el) => {
    Object.entries(props).forEach(([key, value]) => {
      cy.wrap($el).invoke("prop", key, value);
    });
  });
}

function expectAlert(text: string | undefined = undefined) {
  cy.get("@document-component")
    .shadow()
    .find("dso-alert.hydrated")
    .should(text ? "have.text" : "not.exist", text);
}

describe("Document Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-component--default");
    cy.get("dso-document-component").as("document-component").should("have.class", "hydrated");
  });

  it("should mark and highlight", () => {
    const marker: DocumentComponentMarkFunction = (text, source) =>
      text
        .split(new RegExp(`(k)`, "gi"))
        .map((item, index) => (isOdd(index) ? { text: item, highlight: source === "kop" && index === 1 } : item));

    cy.get("@document-component")
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
    cy.get("@document-component")
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
        cy.get("@document-component")
          .invoke("prop", "open", true)
          .invoke("prop", "openAnnotation", true)
          .invoke("prop", "wijzigactie", wijzigactie)
          .invoke("prop", "annotationsWijzigactie", annotationsWijzigactie);

        if (wijzigactie) {
          cy.get("@document-component").should("have.attr", "wijzigactie", wijzigactie);
        } else {
          cy.get("@document-component").should("not.have.attr", "wijzigactie");
        }

        if (annotationsWijzigactie) {
          cy.get("@document-component").should("have.attr", "annotations-wijzigactie", annotationsWijzigactie);
        } else {
          cy.get("@document-component").should("not.have.attr", "annotations-wijzigactie");
        }

        cy.get("@document-component").matchImageSnapshot();
      });
    }
  }

  for (const state of ["default", "voegtoe", "verwijder"]) {
    it(`matches image snapshot ${state} - table-of-contents`, () => {
      const wijzigactie = state === "default" ? null : state;

      cy.get("@document-component")
        .invoke("prop", "wijzigactie", wijzigactie)
        .invoke("prop", "filtered", false)
        .invoke("prop", "mode", "table-of-contents");

      if (wijzigactie) {
        cy.get("@document-component").should("have.attr", "wijzigactie", wijzigactie);
      } else {
        cy.get("@document-component").should("not.have.attr", "wijzigactie");
      }

      cy.get("@document-component").should("have.attr", "mode", "table-of-contents").and("not.have.attr", "filtered");

      cy.get("@document-component").matchImageSnapshot();
    });
  }

  it("shows reserved alert when gereserveerd prop is set with XML", () => {
    setProps({ open: true, gereserveerd: `<Gereserveerd wijzigactie=''></Gereserveerd>`, vervallen: "" });

    cy.get("@document-component").shadow().find(".heading-element dso-label").should("have.text", "gereserveerd");

    expectAlert("Dit onderdeel is gereserveerd voor toekomstige toevoeging.");
  });

  it("shows label with status verwijder when gereserveerd prop is set with verwijder XML", () => {
    setProps({ open: true, gereserveerd: `<Gereserveerd wijzigactie='verwijder'></Gereserveerd>`, vervallen: "" });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element dso-label")
      .should("have.text", "gereserveerd")
      .should("have.attr", "status", "verwijderd");

    expectAlert();
  });

  it("shows label with a verwijderd status and vervallen label with toegevoegd status when gereserveerd and vervallen props are set", () => {
    setProps({
      open: true,
      gereserveerd: `<Gereserveerd wijzigactie='verwijder'></Gereserveerd>`,
      vervallen: `<Vervallen wijzigactie='voegtoe'></Vervallen>`,
    });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element")
      .within(() => {
        cy.get("dso-label[status='verwijderd']").should("exist");
        cy.get("dso-label[status='toegevoegd']").should("exist");
      });

    cy.get("@document-component").shadow().find("dso-alert.hydrated").should("not.exist");
  });

  it("shows vervallen label with status toegevoegd when vervallen prop is set with XML", () => {
    setProps({
      open: true,
      gereserveerd: "",
      vervallen: `<Vervallen wijzigactie='voegtoe'></Vervallen>`,
    });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element dso-label")
      .should("have.attr", "status", "toegevoegd");

    expectAlert();
  });

  it("shows vervallen label with when vervallen prop is set with XML", () => {
    setProps({
      open: true,
      gereserveerd: "",
      vervallen: `<Vervallen></Vervallen>`,
    });

    cy.get("@document-component").shadow().find(".heading-element dso-label").should("have.text", "vervallen");

    expectAlert("Dit onderdeel is vervallen.");
  });
});
