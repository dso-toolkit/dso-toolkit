describe("Annotation - Activiteit", () => {
  setupAnnotation("activiteit");

  it("sets naam as title", () => {
    cy.get("@annotation")
      .invoke("prop", "naam", "De naam")
      .get("@annotation")
      .shadow()
      .find("p.annotation-title dso-renvooi.hydrated")
      .shadow()
      .should("have.text", "De naam");
  });

  it("sets regelKwalificatie, regelKwalificatieVoorzetsel and locatieNoemers as data", () => {
    cy.get("@annotation")
      .invoke("prop", "gewijzigdeLocatie", false)
      .invoke("prop", "regelKwalificatie", "toegestaan")
      .invoke("prop", "regelKwalificatieVoorzetsel", "in")
      .invoke("prop", "locatieNoemers", ["locatie 1", "locatie 2"])
      .get("@annotation")
      .shadow()
      .find("p.annotation-data")
      .should("always.have.text", " in: ") // testing ' in: ' -> "toegestaan__ in: __locatie 1, locatie 2"
      .find("dso-renvooi.hydrated:nth-of-type(1)")
      .shadow()
      .should("have.text", "toegestaan")
      .get("@annotation")
      .invoke("prop", "regelKwalificatieVoorzetsel", "")
      .get("@annotation")
      .shadow()
      .find("p.annotation-data")
      .should("have.text", " ") // testing: ' ' -> "toegestaan__ __locatie 1, locatie 2"
      .find("dso-renvooi.hydrated:nth-of-type(2)")
      .shadow()
      .as("locatieNoemers")
      .should("have.text", "locatie 1, locatie 2");
  });
});

describe("Annotation - Gebiedsaanwijzing", () => {
  setupAnnotation("gebiedsaanwijzing");

  it("sets naam as title", () => {
    cy.get("@annotation")
      .invoke("prop", "gewijzigdeLocatie", false)
      .invoke("prop", "naam", "De naam")
      .get("@annotation")
      .shadow()
      .find("p.annotation-title dso-renvooi.hydrated")
      .shadow()
      .should("have.text", "De naam");
  });
});

describe("Annotation - Omgevingsnormwaarde", () => {
  setupAnnotation("omgevingsnormwaarde");

  it("sets naam and eenheid as title", () => {
    cy.get("@annotation")
      .invoke("prop", "naam", "De naam")
      .invoke("prop", "eenheid", "De eenheid")
      .get("@annotation")
      .shadow()
      .find("p.annotation-title")
      .should("have.text", " (in )")
      .find("dso-renvooi.hydrated:nth-of-type(1)")
      .shadow()
      .should("have.text", "De naam")
      .get("@annotation")
      .shadow()
      .find("p.annotation-title dso-renvooi.hydrated:nth-of-type(2)")
      .shadow()
      .should("have.text", "De eenheid");
  });

  it("sets waardes as data", () => {
    cy.get("@annotation")
      .invoke("prop", "gewijzigdeLocatie", false)
      .invoke("prop", "waardes", ["waarde 1", "waarde 2"])
      .get("@annotation")
      .shadow()
      .find("p.annotation-data")
      .should("have.text", "Waardes worden weergegeven op de kaart: ")
      .find("dso-renvooi.hydrated")
      .shadow()
      .as("waardes")
      .should("have.text", "waarde 1, waarde 2");
  });
});

describe("Annotation - Kaart", () => {
  setupAnnotation("kaart");

  it('sets "naam" as title', () => {
    cy.get("@annotation")
      .invoke("prop", "naam", "De naam")
      .get("@annotation")
      .shadow()
      .find("a.content dso-renvooi.hydrated")
      .shadow()
      .should("have.text", "De naam");
  });

  it("sets href and emits dsoClick event", () => {
    cy.get("dso-annotation-kaart")
      .then(($annotation) => {
        $annotation[0].addEventListener("dsoClick", (e) => {
          e.detail.originalEvent.preventDefault();
          cy.stub().as("dsoClick")(e);
        });

        return $annotation;
      })
      .invoke("prop", "href", "#")
      .shadow()
      .find("a")
      .should("have.attr", "href", "#")
      .click()
      .get("@dsoClick")
      .should("have.been.calledOnce");
  });

  it("does not render anchor without href", () => {
    cy.get("dso-annotation-kaart")
      .invoke("prop", "href", "")
      .get("dso-annotation-kaart")
      .shadow()
      .find("span.content")
      .should("exist");
  });
});

describe("Annotation - Locatie", () => {
  setupAnnotation("locatie");

  it("sets locatieNoemers as title", () => {
    cy.get("@annotation")
      .invoke("prop", "gewijzigdeLocatie", false)
      .invoke("prop", "locatieNoemer", "De locatie")
      .get("@annotation")
      .shadow()
      .find("p.annotation-title dso-renvooi.hydrated")
      .shadow()
      .should("have.text", "De locatie");
  });
});

function setupAnnotation(type: "activiteit" | "gebiedsaanwijzing" | "omgevingsnormwaarde" | "kaart" | "locatie") {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-annotation--${type}`);

    cy.get(`dso-annotation-${type}.hydrated`).as("annotation");
  });

  it("is accessible", () => {
    cy.injectAxe();
    cy.get(`@annotation`).dsoCheckA11y("#root-inner");
  });

  it("matches snapshot", () => {
    cy.get(`@annotation`).matchImageSnapshot();
  });

  it("reflects wijzigactie", () => {
    cy.get(`@annotation`)
      .invoke("removeProp", "wijzigactie")
      .should("not.have.attr", "wijzigactie")
      .get(`@annotation`)
      .invoke("prop", "wijzigactie", "voegtoe")
      .should("have.attr", "wijzigactie", "voegtoe");
  });

  if (type !== "kaart") {
    it("reflects active", () => {
      cy.get(`@annotation`)
        .invoke("prop", "active", false)
        .should("not.have.attr", "active")
        .get(`@annotation`)
        .invoke("prop", "active", true)
        .should("have.attr", "active");
    });

    it('emits "dsoActiveChange" event', () => {
      cy.get(`@annotation`)
        .then(($annotation) => $annotation.on("dsoActiveChange", cy.stub().as("dsoActiveChange")))
        .invoke("prop", "active", false)
        .should("not.have.attr", "active")
        .get(`@annotation`)
        .shadow()
        .find("dso-slide-toggle")
        .click()
        .get(`@dsoActiveChange`)
        .should("have.been.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail")
        .as("detail")
        .its("current")
        .should("eq", false)
        .get("@detail")
        .its("next")
        .should("eq", true)
        .get("@detail")
        .its("originalEvent")
        .should("exist");
    });

    it("shows gewijzigde locatie", () => {
      cy.get(`@annotation`)
        .invoke("prop", "gewijzigdeLocatie", false)
        .should("not.have.attr", "gewijzigde-locatie")
        .get(`@annotation`)
        .shadow()
        .find("dso-label.hydrated:contains('gewijzigde locatie')")
        .should("not.exist")
        .get(`@annotation`)
        .invoke("prop", "gewijzigdeLocatie", true)
        .get(`@annotation`)
        .should("have.attr", "gewijzigde-locatie")
        .get(`@annotation`)
        .shadow()
        .find("dso-label.hydrated:contains('gewijzigde locatie')")
        .should("exist");
    });
  }
}
