import { isOdd } from "../support/is-odd";

describe("Ozon Content", () => {
  it("emits click with node='IntRef' on click of IntRef Link", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-ref");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.get(0).addEventListener("dsoClick", cy.stub().as("click"));
    });

    cy.get("dso-ozon-content.hydrated").shadow().find("a[href='longTitle_inst2']").realClick();

    cy.get("@click").should("have.been.calledOnce");

    cy.get("@click")
      .invoke("getCall", 0)
      .then((call) => {
        expect(call.args[0].detail.type).to.equal("IntRef");
        expect(call.args[0].detail.node.nodeName).to.equal("IntRef");
      });

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it('shows a toggletip on IntRef[@scope="begrip"]', () => {
    cy.viewport(650, 650).visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-ref-begrip");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("dso-ozon-content-toggletip")
      .shadow()
      .find(".toggletip-button")
      .realClick();

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should open and close notes", () => {
    function button(n: string) {
      return cy.get("dso-ozon-content.hydrated").shadow().find(`button[aria-describedby="dso-ozon-note-${n}"]`);
    }

    function tooltip(n: string) {
      return cy
        .get("dso-ozon-content.hydrated")
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

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop("content", "<aap>baviaan</aap>");
    });

    cy.get("dso-ozon-content.hydrated").shadow().find("span.fallback.od-aap").should("exist").contains("baviaan");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render br element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop("content", "<e><br /></e>");
    });

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("span.fallback.od-e")
      .children("br")
      .should("exist")
      .and("be.empty");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Al element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content.hydrated").invoke("prop", "content", "<Al>Tekst<Al>Meer tekst</Al></Al>");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("p > span[role='paragraph']")
      .should("exist")
      .and("have.text", "Meer tekst");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render sub, sup, strong, b, i and u elements", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<outer><sub><sup><strong><b><i><u><inner>text</inner></u></i></b></strong></sup></sub></outer>",
      );
    });

    cy.get("dso-ozon-content.hydrated")
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

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<ns4:c xmlns:ns4='https://standaarden.overheid.nl/stop/imop/tekst/'><ns4:Inhoud><ns4:e>de inhoud</ns4:e></ns4:Inhoud></ns4:c>",
      );
    });

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("span.fallback.od-c")
      .children("div.dso-rich-content")
      .should("exist")
      .children("span.od-e")
      .contains("de inhoud");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  describe("IntIoRef", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--int-io-ref");

      cy.get("dso-ozon-content.hydrated").then((c) => {
        c.get(0).addEventListener("dsoClick", cy.stub().as("click"));
      });
    });

    it("shows a toggletip", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-ozon-content.hydrated");

      cy.get("dso-ozon-content.hydrated")
        .shadow()
        .find("dso-ozon-content-toggletip")
        .shadow()
        .find(".toggletip-button")
        .realClick();

      cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
    });

    it("renders the 'Officiële publicaties' Link as ExtIoRef", () => {
      cy.get("dso-ozon-content.hydrated")
        .shadow()
        .find("dso-ozon-content-toggletip")
        .shadow()
        .find(".toggletip-button")
        .realClick();

      cy.get("dso-ozon-content.hydrated")
        .shadow()
        .find("dso-ozon-content-toggletip")
        .find("a")
        .should("have.attr", "target", "_blank")
        .and("have.attr", "href", "#gm0037_1__cmp_I__content_1__list_o_1__item_o_1__ref_o_1")
        .and("have.text", "Bedrijf categorie 2");
    });

    it("emits click with node='IntIoRef' on clicking the 'Gebieden op de kaart tonen' Button ", () => {
      cy.get("dso-ozon-content.hydrated")
        .shadow()
        .find("dso-ozon-content-toggletip")
        .shadow()
        .find(".toggletip-button")
        .realClick();

      cy.get("dso-ozon-content.hydrated").shadow().find("dso-ozon-content-toggletip").find("button").click();

      cy.get("@click").should("have.been.calledOnce");

      cy.get("@click")
        .invoke("getCall", 0)
        .then((call) => {
          expect(call.args[0].detail.type).to.equal("IntIoRef");
          expect(call.args[0].detail.node.nodeName).to.equal("IntIoRef");
        });
    });
  });

  it("should render ExtRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop("content", "<ExtRef ref='doc'>document</ExtRef>");
    });

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("a[href='https://wetten.overheid.nl/doc'][target='_blank'][rel='noopener noreferrer']")
      .should("have.text", "document")
      .and("have.attr", "title", "Opent andere website in nieuw tabblad");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render ExtIoRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--ext-io-ref");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
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

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop("content", "<Illustratie naam='afbeelding.jpg' hoogte='12' breedte='34' />");
    });

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("img[src = 'images/afbeelding.jpg'][height = '12'][width = '34']")
      .should("exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render simple table", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content.hydrated").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with heading", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><thead><row><entry>een</entry><entry>twee</entry></row></thead><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content.hydrated").shadow().find("table").should("exist").children("thead").as("head");
    cy.get("@head").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(1)").contains("een");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(2)").contains("twee");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with rowspan", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry morerows='1'>1</entry><entry>2</entry></row><row><entry>4</entry></row></tbody></tgroup></table>",
      );
    });
    cy.get("dso-ozon-content.hydrated").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1").should("have.attr", "rowspan", "2");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with colspan", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop(
        "content",
        "<table><tgroup cols='2'><colspec colnum='1' colname='een' /><colspec colnum='2' colname='twee' /><tbody><row><entry namest='een' nameend='twee'>1</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>",
      );
    });

    cy.get("dso-ozon-content.hydrated").shadow().find("table").should("exist").children("tbody").as("body");
    cy.get("@body").should("exist").children("tr").should("exist").children("td").should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1").should("have.attr", "colspan", "2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render table with a removed and added row", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--table");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");
    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Kop with inline paragraphs in Opschrift", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--kop");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .as("shadowRoot")
      .find('span[role="paragraph"]')
      .should("exist")
      .get("@shadowRoot")
      .find("p")
      .should("not.exist");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Kop with multiple Subtitels with renvooi", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--kop-met-renvooi");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should have correct display", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--kop");

    cy.get("dso-ozon-content.hydrated")
      .should("have.attr", "inline", "")
      .and("have.css", "display", "inline")
      .invoke("attr", "inline", null)
      .should("have.css", "display", "block");
  });

  it("should render Figuur as dso-image-overlay", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--figuur");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
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
            naam="houtkachel-of-open-haard-infographic.jpg"
            breedte="720"
            hoogte="1124"
            dpi="400"
            alt="Afbeelding 1"
            uitlijning="center"
          />
          <Bijschrift locatie="onder">Bijschrift bij het figuur.</Bijschrift>
          <Bron>Bron waaruit het figuur is overgenomen</Bron>
        </Figuur>
      `,
      )
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("dso-image-overlay.hydrated > img")
      .should("have.attr", "src", "images/houtkachel-of-open-haard-infographic.jpg")
      .and("have.attr", "alt", "Afbeelding 1")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find(".dso-ozon-figuur")
      .should("have.css", "--_dso-ozon-content-illustratie-aspect-ratio", "0.6405693950177936")
      .and("have.css", "--_dso-ozon-content-illustratie-width", "29.519999999999996%")
      .and("have.css", "--_dso-ozon-content-illustratie-uitlijning", "center")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find(".dso-ozon-figuur > .figuur-bijschrift")
      .should("have.text", "Bijschrift bij het figuur. (bron: Bron waaruit het figuur is overgenomen)");

    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();
  });

  it("should render Lijst element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--lijst");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
      .get("dso-ozon-content.hydrated")
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

  it("should render renvooi-weergave elements", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--renvooi-weergave");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("del")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("ins")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("table.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("table.editaction-add")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("del.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("ins.editaction-add")
      .should("have.css", "background-color", "rgb(228, 241, 212)")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find(".dso-rich-content .dso-ozon-figuur dso-image-overlay")
      .shadow()
      .find("del.editaction-remove")
      .should("have.css", "background-color", "rgb(245, 216, 220)")
      .find(".editaction-label")
      .and("have.text", "Verwijderd:")
      .get("dso-ozon-content.hydrated")
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
      .get("dso-ozon-content.hydrated")
      .matchImageSnapshot();
  });

  it("should show <Bron> at a table", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--table-met-bron");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");

    cy.get("dso-ozon-content.hydrated")
      .shadow()
      .find("> .dso-rich-content > p")
      .should("exist")
      .and("have.text", "Activiteiten die bomen aantasten. Zie de tabel hieronder.")
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("dso-table > div > .dso-ozon-bron")
      .should("exist")
      .and("have.text", "bron: artikel 4.7 van de wet");
  });

  it("should accept XMLDocument", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al")
      .get("body")
      .should("have.class", "sb-show-main")
      .get("#root-inner")
      .should("exist")
      .and("be.visible")
      .window()
      .then(($window) => {
        // eval() is needed because of instanceof differences. The cypress test runner does not run in the same window as the application under test, which means
        // the instanceof test in ozon-content.tsx will never pass.
        $window.eval(`document.querySelector("dso-ozon-content").content = new DOMParser().parseFromString(
          "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Inhoud><Al>De content wordt als <code>XMLDocument</code> aangeleverd.</Al></Inhoud>",
          "text/xml"
        )`);
      })
      .get("dso-ozon-content.hydrated")
      .shadow()
      .invoke("text")
      .should("equal", "De content wordt als XMLDocument aangeleverd.");
  });

  it("should mark and highlight", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al")
      .get("dso-ozon-content.hydrated")
      .invoke("prop", "content", "<Kop><Label>Dit is absoluut fantastisch gemaakt!</Label></Kop>")
      .get("dso-ozon-content")
      .should("have.class", "hydrated")
      .then(
        ($ozonContent) =>
          ($ozonContent[0].mark = (text) =>
            text
              .split(new RegExp(`(is)`, "gi"))
              .map((item, index) => (isOdd(index) ? { text: item, highlight: index === 1 } : item))),
      )
      .get("dso-ozon-content.hydrated")
      .shadow()
      .find("mark")
      .should("have.length", 2)
      .each((element, index) => {
        cy.wrap(element).should(index === 0 ? "have.class" : "not.have.class", "dso-highlight");
      });
  });

  it("renders <abbr> with title between parentheses", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--abbr");

    cy.get("dso-ozon-content.hydrated").then((c) => {
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

    cy.get("dso-ozon-content.hydrated").then((c) => {
      c.prop("content", "<abbr>XYZ</abbr>");
    });

    cy.injectAxe();
    cy.dsoCheckA11y("dso-ozon-content.hydrated");
    cy.get("dso-ozon-content.hydrated").matchImageSnapshot();

    cy.get("dso-ozon-content.hydrated").shadow().find("span.od-abbr").should("exist").and("not.have.text");
    cy.get("dso-ozon-content.hydrated").shadow().find("abbr").should("exist").and("have.text", "XYZ");
  });

  function testRenvooiInKop(element: "Label" | "Nummer" | "Opschrift") {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--kop");

    const baseXml = (wijzigactieElement: string, wijzigactie: "voegtoe" | "verwijder") =>
      `<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Kop xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Label ${wijzigactieElement === "Label" ? `wijzigactie='${wijzigactie}'` : ""}>Artikel</Label><Nummer ${wijzigactieElement === "Nummer" ? `wijzigactie='${wijzigactie}'` : ""}>13.12c</Nummer><Opschrift ${wijzigactieElement === "Opschrift" ? `wijzigactie='${wijzigactie}'` : ""}>NootInKop III</Opschrift></Kop>`;
    cy.get("dso-ozon-content.hydrated")
      .then((c) => {
        c.prop("content", baseXml(element, "verwijder"));
      })
      .matchImageSnapshot(`${Cypress.currentTest.title} -- verwijder`);

    cy.get("dso-ozon-content.hydrated")
      .then((c) => {
        c.prop("content", baseXml(element, "voegtoe"));
      })
      .matchImageSnapshot(`${Cypress.currentTest.title} -- voegtoe`);
  }

  it(`should show a kop with renvooi 'wijzigactie="voegtoe | verwijder"' in the Label`, () => {
    testRenvooiInKop("Label");
  });

  it(`should show a kop with renvooi 'wijzigactie="voegtoe | verwijder"' in the Nummer`, () => {
    testRenvooiInKop("Nummer");
  });

  it(`should show a kop with renvooi 'wijzigactie="voegtoe | verwijder"' in the Opschrift`, () => {
    testRenvooiInKop("Opschrift");
  });
});
