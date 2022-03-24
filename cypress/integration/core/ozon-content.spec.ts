// STOPTPOD website

describe("Ozon content", () => {
  it("should emit anchorClick on IntRef anchor click", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--intref");
    cy.get("dso-ozon-content").then((c) => {
      c.get(0).addEventListener("anchorClick", cy.stub().as("anchorClick"));
    });

    cy.get("dso-ozon-content")
      .shadow()
      .find("a[href = '#longTitle_inst2']")
      .click();

    cy.get("@anchorClick").should("have.been.calledOnce");
  });

  it("should open and close notes", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--noot");
    const a = (n: number) =>
      cy
        .get("dso-ozon-content")
        .shadow()
        .find(`a[aria-controls = 'dso-ozon-note-${n}']`);
    const div = (n: number) =>
      cy
        .get("dso-ozon-content")
        .shadow()
        .find(`div[id = 'dso-ozon-note-${n}']`);

    a(0).should("have.attr", "aria-expanded", "false");
    div(0).should("be.not.visible");
    a(1).should("have.attr", "aria-expanded", "false");
    div(1).should("be.not.visible");

    a(1).click();

    a(0).should("have.attr", "aria-expanded", "false");
    div(0).should("be.not.visible");
    a(1).should("have.attr", "aria-expanded", "true");
    div(1).should("be.visible");

    a(1).click();

    a(0).should("have.attr", "aria-expanded", "false");
    div(0).should("be.not.visible");
    a(1).should("have.attr", "aria-expanded", "false");
    div(1).should("be.not.visible");
  });

  it("should render unknown element to div", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr("content", "<aap>baviaan</aap>");
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-aap")
      .should("exist")
      .contains("baviaan");
  });

  it("should render br element", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr("content", "<e><br /></e>");
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-e")
      .children("br")
      .should("exist")
      .children()
      .should("not.exist");
  });

  it("should render Al element", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr("content", "<e><Al><c>de tekst</c></Al></e>");
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-e")
      .children("span.paragraph")
      .should("exist")
      .children("div.od-c")
      .should("exist")
      .contains("de tekst");
  });

  it("should render sub, sup, strong, b, i and u elements", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<outer><sub><sup><strong><b><i><u><inner>text</inner></u></i></b></strong></sup></sub></outer>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-outer")
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
      .children("div.od-inner")
      .contains("text");
  });

  it("should render Inhoud element and handle xml namespace", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<ns4:c xmlns:ns4='https://standaarden.overheid.nl/stop/imop/tekst/'><ns4:Inhoud><ns4:e>de inhoud</ns4:e></ns4:Inhoud></ns4:c>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-c")
      .children("div.dso-rich-content")
      .should("exist")
      .children("div.od-e")
      .contains("de inhoud");
  });

  it("should render IntRef element", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr("content", "<c><IntRef ref='doc'><e>document</e></IntRef></c>");
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-c")
      .children("a[href = '#doc']")
      .should("exist")
      .children("div.od-e")
      .contains("document");
  });

  it("should render ExtRef element", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr("content", "<c><ExtRef ref='doc'><e>document</e></ExtRef></c>");
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("div.od-c")
      .children(
        "a[href = 'doc'][target = '_blank'][rel = 'noopener noreferrer']"
      )
      .should("exist")
      .children("span.sr-only")
      .contains("opent in nieuw venster")
      .parent()
      .children("div.od-e")
      .contains("document");
  });

  it("should render Illustratie element", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<Illustratie naam='afbeelding.jpg' hoogte='12' breedte='34' />"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("img[src = 'afbeelding.jpg'][height = '12'][width = '34']")
      .should("exist");
  });

  it("should render simple table", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("table")
      .should("exist")
      .children("tbody")
      .as("body");
    cy.get("@body")
      .should("exist")
      .children("tr")
      .should("exist")
      .children("td")
      .should("exist");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(1)").contains("1");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");
  });

  it("should render table with heading", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><thead><row><entry>een</entry><entry>twee</entry></row></thead><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("table")
      .should("exist")
      .children("thead")
      .as("head");
    cy.get("@head")
      .should("exist")
      .children("tr")
      .should("exist")
      .children("th")
      .should("exist");
    cy.get("@head").find("tr:nth-child(1) th:nth-child(1)").contains("een");
    cy.get("@head").find("tr:nth-child(1) th:nth-child(2)").contains("twee");
  });

  it("should render table with rowspan", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry morerows='1'>1</entry><entry>2</entry></row><row><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("table")
      .should("exist")
      .children("tbody")
      .as("body");
    cy.get("@body")
      .should("exist")
      .children("tr")
      .should("exist")
      .children("td")
      .should("exist");
    cy.get("@body")
      .find("tr:nth-child(1) td:nth-child(1)")
      .contains("1")
      .should("have.attr", "rowspan", "2");
    cy.get("@body").find("tr:nth-child(1) td:nth-child(2)").contains("2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("4");
  });

  it("should render table with colspan", () => {
    cy.visit("http://localhost:56106/iframe.html?id=ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.attr(
        "content",
        "<table><tgroup><colspec colnum='1' colname='een' /><colspec colnum='2' colname='twee' /><tbody><row><entry namest='een' nameend='twee'>1</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
      .shadow()
      .find("table")
      .should("exist")
      .children("tbody")
      .as("body");
    cy.get("@body")
      .should("exist")
      .children("tr")
      .should("exist")
      .children("td")
      .should("exist");
    cy.get("@body")
      .find("tr:nth-child(1) td:nth-child(1)")
      .contains("1")
      .should("have.attr", "colspan", "2");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(1)").contains("3");
    cy.get("@body").find("tr:nth-child(2) td:nth-child(2)").contains("4");
  });
});
