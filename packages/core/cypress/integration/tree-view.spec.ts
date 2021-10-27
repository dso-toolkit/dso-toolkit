describe('Tree View', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=tree-view');
    cy.injectAxe();
    cy
      .get('body')
      .click()
      .get('dso-tree-view')
      .shadow()
      .as('tree-view')
      .realPress('Tab');
    cy
      .get('@tree-view')
      .find('p.tree-content')
      .first()
      .as('first-tree-item')
  });

  it('should expand / collapse on click on the controller icon', () => {
    cy
      .get('@first-tree-item')
      .prev()
      .click()
      .get('@first-tree-item')
      .should('have.attr', 'aria-expanded', 'false')
      .prev()
      .click()
      .get('@first-tree-item')
      .should('have.attr', 'aria-expanded', 'true');
  });

  it('should focus next item starting with search letter', () => {
    cy
      .get('@first-tree-item')
      .click()
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('b');

    cy
      .get('@first-tree-item')
      .parent()
      .find('> ul > li > p.tree-content')
      .first()
      .as('bouwelementen')
      .should('have.text', 'bouwelementen')
      .should('have.focus')

    cy.realPress('b');

    cy
      .get('@bouwelementen')
      .parent()
      .next()
      .find('> p.tree-content')
      .first()
      .as('bouwonderdelen')
      .should('have.text', 'bouwonderdelen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('b');

    cy
      .get('@bouwonderdelen')
      .parent()
      .next()
      .find('> p.tree-content')
      .first()
      .as('bouwwerken')
      .should('have.text', 'bouwwerken')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('b');

    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);
  });

  it('should focus previous item starting with search letter while holding Shift', () => {
    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress(['Shift', 'b']);

    cy
      .get('@first-tree-item')
      .parent()
      .find('> ul > li')
      .last()
      .prev()
      .find('> p.tree-content')
      .as('bouwwerken')
      .should('have.text', 'bouwwerken')
      .should('have.focus')

    cy.realPress(['Shift', 'b']);

    cy
      .get('@bouwwerken')
      .parent()
      .prev()
      .find('> p.tree-content')
      .first()
      .as('bouwonderdelen')
      .should('have.text', 'bouwonderdelen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress(['Shift', 'b']);

    cy
      .get('@bouwonderdelen')
      .parent()
      .prev()
      .find('> p.tree-content')
      .first()
      .as('bouwelementen')
      .should('have.text', 'bouwelementen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress(['Shift', 'b']);

    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);
  });

  it('should expand or focus child on right arrow key and collapse or focus parent left arrow key', () => {
    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy
      .get('@first-tree-item')
      .parent()
      .find('> ul > li > p.tree-content')
      .first()
      .as('bouwelementen')
      .should('have.text', 'bouwelementen')

    cy.realPress(['ArrowDown', 'ArrowRight', 'ArrowRight']);

    cy
      .get('@bouwelementen')
      .should('have.attr', 'aria-expanded', 'true')
      .parent()
      .find('> ul > li > p.tree-content')
      .first()
      .as('afvoerbuizen')
      .should('have.text', 'afvoerbuizen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress(['ArrowDown', 'ArrowRight', 'ArrowRight']);

    cy
      .get('@bouwelementen')
      .should('have.attr', 'aria-expanded', 'true')
      .parent()
      .find('> ul > li > p.tree-content')
      .last()
      .as('ankers')
      .should('have.text', 'ankers')
      .should('have.attr', 'aria-expanded', 'true')
      .parent()
      .find('> ul > li > p.tree-content')
      .last()
      .as('balkankers')
      .should('have.text', 'balkankers')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('ArrowLeft');

    cy
      .get('@ankers')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'true');

    cy.realPress('ArrowLeft');

    cy
      .get('@ankers')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'false');

    cy.realPress('ArrowLeft');

    cy
      .get('@bouwelementen')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'true');

    cy.realPress('ArrowLeft');

    cy
      .get('@bouwelementen')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'false');

    cy.realPress('ArrowLeft');

    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'true');

    cy.realPress('ArrowLeft');

    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'aria-expanded', 'false');
  });

  it('should have roving tabIndex to move focus with arrow keys, Home and End', () => {
    cy
      .get('@first-tree-item')
      //.click()
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('ArrowDown');

    cy
      .get('@first-tree-item')
      .should('have.attr', 'tabIndex', -1);

    cy
      .get('@first-tree-item')
      .parent()
      .find('> ul > li > p.tree-content')
      .first()
      .as('bouwelementen')
      .should('have.text', 'bouwelementen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('ArrowDown');

    cy
      .get('@bouwelementen')
      .parent()
      .next()
      .find('> p.tree-content')
      .first()
      .as('bouwonderdelen')
      .should('have.text', 'bouwonderdelen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('ArrowDown');

    cy
      .get('@bouwonderdelen')
      .parent()
      .next()
      .find('> p.tree-content')
      .first()
      .should('have.text', 'bouwwerken')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('End');

    cy
      .get('@first-tree-item')
      .parent()
      .next()
      .find('> p.tree-content')
      .first()
      .should('have.text', 'Woninginrichting')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('ArrowUp');

    cy
      .get('@bouwelementen')
      .should('have.attr', 'tabIndex', -1)
      .parent()
      .parent()
      .find('> li > p.tree-content')
      .last()
      .should('have.text', 'complexen')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);

    cy.realPress('Home');

    cy
      .get('@first-tree-item')
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);
  });
});
