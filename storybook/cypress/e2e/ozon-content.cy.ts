import { isOdd } from "dso-toolkit";

describe("Ozon Content", () => {
  it("should emit anchorClick on IntRef anchor click", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-ref");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content").then((c) => {
      c.get(0).addEventListener("dsoAnchorClick", cy.stub().as("anchorClick"));
    });

    cy.get("dso-ozon-content").shadow().find("a[href = '#longTitle_inst2']").click();

    cy.get("@anchorClick").should("have.been.calledOnce");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should open and close notes", () => {
    function button(n: string) {
      return cy.get("dso-ozon-content").shadow().find(`button[aria-describedby="dso-ozon-note-${n}"]`);
    }

    function tooltip(n: string) {
      return cy
        .get("dso-ozon-content")
        .shadow()
        .find(`sup:has(button[aria-describedby="dso-ozon-note-${n}"]) + dso-tooltip`);
    }

    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--inhoud-al-noot");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    button("N6").should("have.attr", "aria-expanded", "false");
    tooltip("N6").should("be.not.visible");
    button("N7").should("have.attr", "aria-expanded", "false");
    tooltip("N7").should("be.not.visible");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();

    button("N7").click();

    button("N6").should("have.attr", "aria-expanded", "false");
    tooltip("N6").should("be.not.visible");
    button("N7").should("have.attr", "aria-expanded", "true");
    tooltip("N7").should("be.visible");

    // The wait equals the tooltip transition-duration of 0.15s
    cy.get("dso-ozon-content.hydrated").wait(150).matchImageSnapshot(`${Cypress.currentTest.title} -- visible notes`);

    button("N7").click();

    button("N6").should("have.attr", "aria-expanded", "false");
    tooltip("N6").should("be.not.visible");
    button("N7").should("have.attr", "aria-expanded", "false");
    tooltip("N7").should("be.not.visible");
  });

  it("should render unknown element to span", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<aap>baviaan</aap>");
    });

    cy.get("dso-ozon-content").shadow().find("span.fallback.od-aap").should("exist").contains("baviaan");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render br element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<e><br /></e>");
    });

    cy.get("dso-ozon-content").shadow().find("span.fallback.od-e").children("br").should("exist").and("be.empty");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Al element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<Al>Tekst<Al>Meer tekst</Al></Al>");
    });

    cy.get("dso-ozon-content").shadow().find("p").should("exist").children('span[role="paragraph"]').should("exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render sub, sup, strong, b, i and u elements", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<outer><sub><sup><strong><b><i><u><inner>text</inner></u></i></b></strong></sup></sub></outer>",
      );
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("span.fallback.od-outer")
      .children("sub")
      .should("exist")
      .children("sup")
      .should("exist")
      .children("strong")
      .should("exist")
      .children("b")
      .should("exist")
      .children("i")
      .should("exist")
      .children("u")
      .should("exist")
      .children("span.fallback.od-inner")
      .contains("text");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Inhoud element and handle xml namespace", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<ns4:c xmlns:ns4='https://standaarden.overheid.nl/stop/imop/tekst/'><ns4:Inhoud><ns4:e>de inhoud</ns4:e></ns4:Inhoud></ns4:c>",
      );
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("span.fallback.od-c")
      .children("div.dso-rich-content")
      .should("exist")
      .children("span.od-e")
      .contains("de inhoud");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render IntRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<c><IntRef ref='doc'><e>document</e></IntRef></c>");
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("span.fallback.od-c")
      .children("a[href = '#doc']")
      .should("exist")
      .children("span.fallback.od-e")
      .contains("document");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render IntIoRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-io-ref");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .shadow()
      .find('a[href = "#gm0037_1__cmp_I__content_1__list_o_1__item_o_1__ref_o_1"]')
      .should("exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should emit anchorClick on IntIoRef anchor click", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-io-ref");

    cy.get("dso-ozon-content").then((c) => {
      c.get(0).addEventListener("dsoAnchorClick", cy.stub().as("anchorClick"));
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find('a[href = "#gm0037_1__cmp_I__content_1__list_o_1__item_o_1__ref_o_1"]')
      .click();

    cy.get("@anchorClick")
      .should("have.been.calledOnce")
      .invoke("getCall", 0)
      .its("args.0.detail.node")
      .should("equal", "IntIoRef");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render ExtRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<ExtRef ref='doc'>document</ExtRef>");
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("a[href='doc'][target='_blank'][rel='noopener noreferrer']")
      .should("have.text", "document")
      .and("have.attr", "title", "Opent andere website in nieuw tabblad");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render ExtIoRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--ext-io-ref");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .shadow()
      .contains("/join/id/regdata/pv25/2021/OKBebouwdEenOpHonderdWRIJ/nld@2021-11-14;1")
      .should("have.prop", "tagName", "A")
      .and(
        "have.attr",
        "href",
        "https://identifier-eto.overheid.nl//join/id/regdata/pv25/2021/OKBebouwdEenOpHonderdWRIJ/nld@2021-11-14;1",
      )
      .and("have.text", "/join/id/regdata/pv25/2021/OKBebouwdEenOpHonderdWRIJ/nld@2021-11-14;1");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Illustratie element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<Illustratie naam='afbeelding.jpg' hoogte='12' breedte='34' />");
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("img[src = 'afbeelding.jpg'][height = '12'][width = '34']")
      .should("exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render simple table", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with heading", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><thead><row><entry>een</entry><entry>twee</entry></row></thead><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content").shadow().find("table").should("exist").children("thead").as("head");
    cy.get("@head").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(1)").contains("een");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(2)").contains("twee");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with rowspan", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry morerows='1'>1</entry><entry>2</entry></row><row><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1").should("have.attr", "rowspan", "2");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with colspan", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup cols='2'><colspec colnum='1' colname='een' /><colspec colnum='2' colname='twee' /><tbody><row><entry namest='een' nameend='twee'>1</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });

    cy.get("dso-ozon-content").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1").should("have.attr", "colspan", "2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render inline paragraphs in Opschrift", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .shadow()
      .as("shadowRoot")
      .find('span[role="paragraph"]')
      .should("exist")
      .get("@shadowRoot")
      .find("p")
      .should("not.exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should have correct display", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.get("dso-ozon-content")
      .should("have.attr", "inline", "")
      .and("have.css", "display", "inline")
      .invoke("attr", "inline", null)
      .should("have.css", "display", "block");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Figuur as dso-image-overlay", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--figuur");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .invoke(
        "prop",
        "content",
        `
        <Figuur
          eId="chp_13__subsec_13.7__art_13.72__table_o_1__img_o_1"
          wId="gm1979_2__chp_13__subsec_13.7__art_13.72__table_o_1__img_o_1"
        >
          <Titel>Afbeelding Titel</Titel>
          <Illustratie
            naam="images/houtkachel-of-open-haard-infographic.jpg"
            breedte="720"
            hoogte="1124"
            alt="Afbeelding 1"
          />
          <Bijschrift locatie="onder">Bijschrift bij het figuur.</Bijschrift>
          <Bron>Bron waaruit het figuur is overgenomen</Bron>
        </Figuur>
      `,
      )
      .get("dso-ozon-content")
      .shadow()
      .find("dso-image-overlay > img")
      .should("have.attr", "src", "images/houtkachel-of-open-haard-infographic.jpg")
      .and("have.attr", "alt", "Afbeelding 1")
      .get("dso-ozon-content")
      .shadow()
      .find(".dso-ozon-figuur > .figuur-bijschrift")
      .should("have.text", "Bijschrift bij het figuur. (bron: Bron waaruit het figuur is overgenomen)");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Lijst element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--lijst");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .get("dso-ozon-content")
      .shadow()
      .find("> .dso-rich-content > .dso-ozon-lijst:first-child")
      .as("dsoOzonLijst")
      .find("> .od-Lijstaanhef")
      .should("have.text", "Deze afdeling is niet van toepassing op:")
      .get("@dsoOzonLijst")
      .find("> .od-Lijstsluiting")
      .should("have.text", "Dit is de plaats om een afsluitende zin onder de lijst te plaatsen.")
      .get("@dsoOzonLijst")
      .find("> ul")
      .children()
      .should("have.length", 6)
      .get("@dsoOzonLijst")
      .find("> ul");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  // Todo: #2853
  it.skip("should render renvooi-weergave elements", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--renvooi-weergave");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .shadow()
      .find("del")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content")
      .shadow()
      .find("ins")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content")
      .shadow()
      .find("table.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content")
      .shadow()
      .find("table.editaction-add")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content")
      .shadow()
      .find("del.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content")
      .shadow()
      .find("ins.editaction-add")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content")
      .shadow()
      .find(".dso-rich-content .dso-ozon-figuur dso-image-overlay")
      .shadow()
      .find("del.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .find(".editaction-label")
      .and("have.text", "Verwijderd:")
      .get("dso-ozon-content")
      .shadow()
      .find(".dso-rich-content .dso-ozon-figuur dso-image-overlay")
      .shadow()
      .find("ins.editaction-add")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .find(".editaction-label")
      .and("have.text", "Toegevoegd:");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("dso-image-overlay.hydrated")
      .should("exist")
      .get("dso-ozon-content.hydrated", { timeout: 10000 }) // Prevent flaky test, see #2789, we'll investigate further in #2853
      .matchImageSnapshot();
  });

  it("should show <Bron> at a table", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--table-met-bron");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content")
      .shadow()
      .find("> .dso-rich-content > p")
      .should("exist")
      .and("have.text", "Activiteiten die bomen aantasten. Zie de tabel hieronder.")
      .get("dso-ozon-content")
      .shadow()
      .find("dso-table > div > .dso-ozon-bron")
      .should("exist")
      .and("have.text", "bron: artikel 4.7 van de wet");
  });

  it("should accept XMLDocument", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al")
      .window()
      .then(($window) => {
        // eval() is needed because of instanceof differences. The cypress test runner does not run in the same window as the application under test, which means
        // the instanceof test in ozon-content.tsx will never pass.
        $window.eval(`document.querySelector("dso-ozon-content").content = new DOMParser().parseFromString(
          "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Inhoud><Al>De content wordt als <code>XMLDocument</code> aangeleverd.</Al></Inhoud>",
          "text/xml"
        )`);
      })
      .get("dso-ozon-content")
      .shadow()
      .invoke("text")
      .should("equal", "De content wordt als XMLDocument aangeleverd.");
  });

  it("should mark and highlight", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al")
      .get("dso-ozon-content")
      .invoke("prop", "content", "<Label>Dit is absoluut fantastisch gemaakt!</Label>")
      .get("dso-ozon-content")
      .then(
        ($ozonContent) =>
          ($ozonContent[0].mark = (text) =>
            text
              .split(new RegExp(`(is)`, "gi"))
              .map((item, index) => (isOdd(index) ? { text: item, highlight: index === 1 } : item))),
      )
      .get("dso-ozon-content")
      .shadow()
      .find("mark")
      .should("have.length", 2)
      .each((element, index) => {
        cy.wrap(element).should(index === 0 ? "have.class" : "not.have.class", "dso-highlight");
      });
  });

  it("renders <abbr> with title between parentheses", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--abbr");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<abbr title='Alfa Beta Gamma'>ABG</abbr>");
    });

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");
    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("span.od-abbr")
      .should("exist")
      .and("have.text", "ABG (Alfa Beta Gamma)");
    cy.get("dso-ozon-content.hydrated").shadow().find("abbr").should("exist").and("have.text", "ABG");
  });

  it("renders <abbr> without title between parentheses", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--abbr");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<abbr>XYZ</abbr>");
    });

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");
    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();

    cy.get("dso-ozon-content.hydrated").shadow().find("span.od-abbr").should("exist").and("not.have.text");
    cy.get("dso-ozon-content.hydrated").shadow().find("abbr").should("exist").and("have.text", "XYZ");
  });
});
