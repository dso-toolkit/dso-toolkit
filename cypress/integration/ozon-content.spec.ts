describe("Ozon Content", () => {
  it("should emit anchorClick on IntRef anchor click", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--intref");
    cy.get("dso-ozon-content").then((c) => {
      c.get(0).addEventListener("dsoAnchorClick", cy.stub().as("anchorClick"));
    });

    cy.get("dso-ozon-content")
      .find("a[href = '#longTitle_inst2']")
      .click();

    cy.get("@anchorClick").should("have.been.calledOnce");
  });

  it("should open and close notes", () => {
    function button(n: string) {
      return cy
        .get("dso-ozon-content")
        .find(`button#dso-ozon-note-${n}`);
    }

    function tooltip(n: string) {
      return cy
        .get("dso-ozon-content")
        .find(`sup:has(button#dso-ozon-note-${n}) + dso-tooltip`);
    }

    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--inhoud-al-noot");

    button('N6').should("have.attr", "aria-expanded", "false");
    tooltip('N6').should("be.not.visible");
    button('N7').should("have.attr", "aria-expanded", "false");
    tooltip('N7').should("be.not.visible");

    button('N7').click();

    button('N6').should("have.attr", "aria-expanded", "false");
    tooltip('N6').should("be.not.visible");
    button('N7').should("have.attr", "aria-expanded", "true");
    tooltip('N7').should("be.visible");

    button('N7').click();

    button('N6').should("have.attr", "aria-expanded", "false");
    tooltip('N6').should("be.not.visible");
    button('N7').should("have.attr", "aria-expanded", "false");
    tooltip('N7').should("be.not.visible");
  });

  it("should render unknown element to span", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<aap>baviaan</aap>");
    });

    cy.get("dso-ozon-content")
      .find("span.fallback.od-aap")
      .should("exist")
      .contains("baviaan");
  });

  it("should render br element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<e><br /></e>");
    });

    cy.get("dso-ozon-content")
      .find("span.fallback.od-e")
      .children("br")
      .should("exist").and('be.empty');
  });

  it("should render Al element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<Al>Tekst<Al>Meer tekst</Al></Al>");
    });

    cy.get("dso-ozon-content")
      .find("p")
      .should("exist")
      .children('span[role="paragraph"]')
      .should("exist");
  });

  it("should render sub, sup, strong, b, i and u elements", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<outer><sub><sup><strong><b><i><u><inner>text</inner></u></i></b></strong></sup></sub></outer>"
      );
    });

    cy.get("dso-ozon-content")
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
  });

  it("should render Inhoud element and handle xml namespace", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<ns4:c xmlns:ns4='https://standaarden.overheid.nl/stop/imop/tekst/'><ns4:Inhoud><ns4:e>de inhoud</ns4:e></ns4:Inhoud></ns4:c>"
      );
    });

    cy.get("dso-ozon-content")
      .find("span.fallback.od-c")
      .children("div.dso-rich-content")
      .should("exist")
      .children("span.od-e")
      .contains("de inhoud");
  });

  it("should render IntRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<c><IntRef ref='doc'><e>document</e></IntRef></c>");
    });

    cy.get("dso-ozon-content")
      .find("span.fallback.od-c")
      .children("a[href = '#doc']")
      .should("exist")
      .children("span.fallback.od-e")
      .contains("document");
  });

  it('should render IntIoRef element', () => {
    cy.visit('http://localhost:45000/iframe.html?id=core-ozon-content--intioref');

    cy.get('dso-ozon-content')
      .find('a[href = "#gm0037_1__cmp_I__content_1__list_o_1__item_o_1__ref_o_1"]')
      .should('exist');
  });

  it('should emit anchorClick on IntIoRef anchor click', () => {
    cy.visit('http://localhost:45000/iframe.html?id=core-ozon-content--intioref');

    cy.get('dso-ozon-content').then((c) => {
      c.get(0).addEventListener('dsoAnchorClick', cy.stub().as('anchorClick'));
    });

    cy.get('dso-ozon-content')
      .find('a[href = "#gm0037_1__cmp_I__content_1__list_o_1__item_o_1__ref_o_1"]')
      .click();

    cy.get('@anchorClick')
      .should('have.been.calledOnce')
      .invoke('getCall', 0)
      .its('args.0.detail.node')
      .should('equal', 'IntIoRef');
  });

  it("should render ExtRef element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop("content", "<c><ExtRef ref='doc'><e>document</e></ExtRef></c>");
    });

    cy.get("dso-ozon-content")
      .find("span.fallback.od-c")
      .children("a[href = 'doc'][target = '_blank'][rel = 'noopener noreferrer']")
      .should("exist")
      .children("span.sr-only")
      .contains("opent in nieuw venster")
      .parent()
      .children("span.fallback.od-e")
      .contains("document");
  });

  it('should render ExtIoRef element', () => {
    cy.visit('http://localhost:45000/iframe.html?id=core-ozon-content--extioref');

    cy.get("dso-ozon-content")
      .contains("/join/id/regdata/pv25/2021/OKBebouwdEenOpHonderdWRIJ/nld@2021-11-14;1")
      .should('have.prop', 'tagName', 'A')
      .and('have.attr', 'href', 'https://identifier-eto.overheid.nl//join/id/regdata/pv25/2021/OKBebouwdEenOpHonderdWRIJ/nld@2021-11-14;1')
      .contains('opent in nieuw venster')
      .should("exist");
  });

  it("should render Illustratie element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<Illustratie naam='afbeelding.jpg' hoogte='12' breedte='34' />"
      );
    });

    cy.get("dso-ozon-content")
      .find("img[src = 'afbeelding.jpg'][height = '12'][width = '34']")
      .should("exist");
  });

  it("should render simple table", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
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
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><thead><row><entry>een</entry><entry>twee</entry></row></thead><tbody><row><entry>1</entry><entry>2</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
      .find("table")
      .should("exist")
      .children("thead")
      .as("head");
    cy.get("@head")
      .should("exist")
      .children("tr")
      .should("exist")
      .children("td")
      .should("exist");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(1)").contains("een");
    cy.get("@head").find("tr:nth-child(1) td:nth-child(2)").contains("twee");
  });

  it("should render table with rowspan", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");
    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup><colspec colnum='1' /><colspec colnum='2' /><tbody><row><entry morerows='1'>1</entry><entry>2</entry></row><row><entry>4</entry></row></tbody></tgroup></table>"
      );
    });
    cy.get("dso-ozon-content")
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
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get("dso-ozon-content").then((c) => {
      c.prop(
        "content",
        "<table><tgroup cols='2'><colspec colnum='1' colname='een' /><colspec colnum='2' colname='twee' /><tbody><row><entry namest='een' nameend='twee'>1</entry></row><row><entry>3</entry><entry>4</entry></row></tbody></tgroup></table>"
      );
    });

    cy.get("dso-ozon-content")
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

  it('should render inline paragraphs in Opschrift', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.get('dso-ozon-content > dso-tooltip > span[role="section"] > span[role="paragraph"]')
      .should('exist');
  });

  it('should have correct display', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.get('dso-ozon-content')
      .should('have.attr', 'inline', '')
      .and('have.css', 'display', 'inline')
      .invoke('attr', 'inline', null)
      .should('have.css', 'display', 'block');
  });

  it('should mark and denote deleted content', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--al");

    cy.get('dso-ozon-content')
      .invoke('attr', 'deleted', '')
      .find('> *')
      .should('have.css', 'text-decoration-line', 'line-through');

    cy.get('dso-ozon-content')
      .find('.deleted-start')
      .should('have.text', 'Begin verwijderd element');

    cy.get('dso-ozon-content')
      .find('.deleted-end')
      .should('have.text', 'Einde verwijderd element');
  });

  it('when interactive it should emit events', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.get('dso-ozon-content')
      .invoke('attr', 'interactive', '')
      .should('have.attr', 'interactive')
      .get('dso-ozon-content')
      .then($dsoOzonContent => $dsoOzonContent.on('dsoClick', cy.stub().as('click')))
      .click()
      .invoke('removeAttr', 'interactive')
      .click()
      .find('#dso-ozon-note-Noot5000')
      .click();

    cy.get('@click').should('have.been.calledOnce');
  });

  it('when interactive it should appear like a link', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-ozon-content--opschrift");

    cy.get('dso-ozon-content')
      .invoke('attr', 'interactive', '')
      .should('have.attr', 'interactive')
      .get('dso-ozon-content')
      .should('have.css', 'text-decoration-line', 'none')
      .and('have.css', 'color', 'rgb(39, 89, 55)') // $bosgroen
      .invoke('attr', 'interactive', 'sub')
      .should('have.css', 'text-decoration-line', 'none')
      .and('have.css', 'color', 'rgb(25, 25, 25)'); // $grijs-90
  });

  it('should render Figuur as dso-image-overlay', () => {
    cy.visit('http://localhost:45000/iframe.html?id=core-ozon-content--figuur');

    cy.get('dso-ozon-content')
      .invoke('prop', 'content', `
        <Figuur
          eId="chp_13__subsec_13.7__art_13.72__table_o_1__img_o_1"
          wId="gm1979_2__chp_13__subsec_13.7__art_13.72__table_o_1__img_o_1"
        >
          <Titel>Afbeelding Titel</Titel>
          <Illustratie
            naam="images/houtkachel-of-open-haard-infographic.jpg"
            breedte="720"
            hoogte="1124"
            schaal="50"
            alt="Afbeelding 1"
          />
          <Bijschrift locatie="onder">Bijschrift bij het figuur.</Bijschrift>
          <Bron>Bron waaruit het figuur is overgenomen</Bron>
        </Figuur>
      `)
      .get('dso-ozon-content')
      .find('dso-image-overlay > img')
      .should('have.attr', 'src', 'images/houtkachel-of-open-haard-infographic.jpg')
      .and('have.attr', 'alt', 'Afbeelding 1')
      .and('have.attr', 'width', '360')
      .and('have.attr', 'height', '562')
      .get('dso-ozon-content .dso-ozon-figuur > .figuur-bijschrift')
      .should('have.text', 'Bijschrift bij het figuur. (bron: Bron waaruit het figuur is overgenomen)');
  });
});
