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
      .then(
        ($documentComponent: JQuery<HTMLDsoDocumentComponentElement>) =>
          ($documentComponent[0].mark = cy.spy(marker).as("marker")),
      )
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

        cy.visit(
          "http://localhost:45000/iframe.html?id=core-document-component--default&args=open:!true;openAnnotation:!true",
        );

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
        .invoke("prop", "mode", "table-of-contents")
        .invoke("prop", "gereserveerd", "")
        .invoke("prop", "vervallen", "");

      if (wijzigactie) {
        cy.get("@document-component").should("have.attr", "wijzigactie", wijzigactie);
      } else {
        cy.get("@document-component").should("not.have.attr", "wijzigactie");
      }

      cy.get("@document-component").should("have.attr", "mode", "table-of-contents").and("not.have.attr", "filtered");

      cy.get("@document-component").matchImageSnapshot();
    });
  }

  it("shows a gereserveerd alert when gereserveerd prop is set and the wijzigactie is 'voegtoe'", () => {
    setProps({ open: true, gereserveerd: `<Gereserveerd></Gereserveerd>`, vervallen: "", inhoud: "" });

    cy.get("@document-component").shadow().find(".heading-element dso-label").should("have.text", "Gereserveerd");

    expectAlert("Dit onderdeel is gereserveerd voor toekomstige toevoeging.");

    cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- gereserveerd`);
  });

  it("shows a gereserveerd alert when gereserveerd prop is set", () => {
    setProps({
      wijzigactie: null,
      open: true,
      gereserveerd: `<Gereserveerd></Gereserveerd>`,
      vervallen: "",
      inhoud: "",
      bevatOntwerpInformatie: false,
      filtered: false,
    });

    cy.get("@document-component").shadow().find(".heading-element dso-label").should("have.text", "Gereserveerd");

    expectAlert("Dit onderdeel is gereserveerd voor toekomstige toevoeging.");

    cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- gereserveerd`);
  });

  it("shows a gereserveerd label with status verwijder when gereserveerd prop is set with wijzigactie='verwijder'", () => {
    setProps({
      wijzigactie: null,
      open: true,
      filtered: false,
      gereserveerd: `<Gereserveerd wijzigactie='verwijder'></Gereserveerd>`,
      vervallen: "",
      inhoud:
        "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' wijzigactie='voegtoe'><Al>Deze afdeling is van toepassing op gasverbrandingsinstallaties als bedoeld in artikel 6.45 van het Besluit bouwwerken leefomgeving</Al></Inhoud>",
    });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element dso-label")
      .should("have.text", "Gereserveerd")
      .should("have.attr", "status", "verwijderd");

    expectAlert();

    cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- gereserveerd verwijderd`);
  });

  it("shows a gereserveerd label with a verwijderd status (set with wijzigactie='verwijder') and a vervallen label with toegevoegd status (set with wijzigactie='voegtoe')", () => {
    setProps({
      wijzigactie: null,
      open: true,
      filtered: false,
      gereserveerd: `<Gereserveerd wijzigactie='verwijder'></Gereserveerd>`,
      vervallen: `<Vervallen wijzigactie='voegtoe'></Vervallen>`,
      inhoud: "",
    });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element")
      .within(() => {
        cy.get("dso-label[status='verwijderd']").should("exist");
        cy.get("dso-label[status='toegevoegd']").should("exist");
      });

    expectAlert();

    cy.get("@document-component").matchImageSnapshot(
      `${Cypress.currentTest.title} -- gereserveerd verwijderd & vervallen voegtoe`,
    );
  });

  it("shows a vervallen label with status toegevoegd when vervallen prop is set with wijzigactie='voegtoe'", () => {
    setProps({
      wijzigactie: null,
      open: true,
      filtered: false,
      gereserveerd: "",
      vervallen: `<Vervallen wijzigactie='voegtoe'></Vervallen>`,
      inhoud:
        "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/' wijzigactie='verwijder'><Al>Deze afdeling is van toepassing op gasverbrandingsinstallaties als bedoeld in artikel 6.45 van het Besluit bouwwerken leefomgeving</Al></Inhoud>",
    });

    cy.get("@document-component")
      .shadow()
      .find(".heading-element dso-label")
      .should("have.attr", "status", "toegevoegd");

    expectAlert();

    cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- vervallen voegtoe`);
  });

  it("shows a vervallen label with when vervallen prop is set", () => {
    setProps({
      wijzigactie: null,
      filtered: false,
      open: true,
      gereserveerd: "",
      vervallen: `<Vervallen></Vervallen>`,
      inhoud: "",
    });

    cy.get("@document-component").shadow().find(".heading-element dso-label").should("have.text", "Vervallen");

    expectAlert("Dit onderdeel is vervallen.");

    cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- vervallen`);
  });

  function testRenvooiInKop(element: "Label" | "Nummer" | "Opschrift") {
    it(`should show a kop with renvooi 'voegtoe' and 'verwijder' in the ${element}`, () => {
      const baseXml = (wijzigactieElement: string, wijzigactie: "voegtoe" | "verwijder") =>
        `<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Kop xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Label ${wijzigactieElement === "Label" ? `wijzigactie='${wijzigactie}'` : ""}>Artikel</Label><Nummer ${wijzigactieElement === "Nummer" ? `wijzigactie='${wijzigactie}'` : ""}>13.12c</Nummer><Opschrift ${wijzigactieElement === "Opschrift" ? `wijzigactie='${wijzigactie}'` : ""}>NootInKop III</Opschrift></Kop>`;
      setProps({ kop: baseXml(element, "verwijder") });
      cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- verwijder`);

      setProps({ kop: baseXml(element, "voegtoe") });
      cy.get("@document-component").matchImageSnapshot(`${Cypress.currentTest.title} -- voegtoe`);
    });
  }

  testRenvooiInKop("Label");
  testRenvooiInKop("Nummer");
  testRenvooiInKop("Opschrift");
});
