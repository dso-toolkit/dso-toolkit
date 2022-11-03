describe('Tree View', () => {
  function firstChildItem(subject: JQuery<HTMLElement>, label: string) {
    return cy.wrap(subject)
      .parent().find('> ul > li > p.tree-content').first()
      .should('have.text', label)
      .as(label);
  }

  function lastChildItem(subject: JQuery<HTMLElement>, label: string) {
    return cy.wrap(subject)
      .parent().find('> ul > li > p.tree-content').last()
      .should('have.text', label)
      .as(label);
  }

  function nextSiblingItem(subject: JQuery<HTMLElement>, label: string) {
    return cy.wrap(subject)
      .parent().next().find('> p.tree-content').first()
      .should('have.text', label)
      .as(label);
  }

  function previousSiblingItem(subject: JQuery<HTMLElement>, label: string) {
    return cy.wrap(subject)
      .parent().prev().find('> p.tree-content').first()
      .should('have.text', label)
      .as(label);
  }

  function shouldHaveFocusAndTabIndex(subject: JQuery<HTMLElement>) {
    return cy.wrap(subject)
      .should('have.focus')
      .should('have.attr', 'tabIndex', 0);
  }

  function shouldNotHaveFocusAndTabIndex(subject: JQuery<HTMLElement>) {
    return cy.wrap(subject)
      .should('not.have.focus')
      .should('have.attr', 'tabIndex', -1);
  }

  function press(subject: JQuery<HTMLElement>, key: any) {
    cy.realPress(key);
    return cy.wrap(subject);
  }

  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-tree-view');
    cy.injectAxe();
    cy
      .get('body')
      .get('dso-tree-view')
      .shadow()
      .as('tree-view')

    cy
      .get('@tree-view')
      .find('p.tree-content')
      .first()
      .click()
      .focus()
      .as('first-tree-item');

  });

  it('should have correct aria attributes for \'tree item sets\'', () => {
    function shouldHaveCorrectAriaTreeItemAttributes(startElement: string, level: number, setSize: number, posInSet: number)
     : Cypress.Chainable<JQuery<HTMLElement> | Cypress.Chainable<JQuery<HTMLElement>>> {
      return cy
        .get(`@${startElement}`)
        .should('have.attr', 'aria-level', level.toString())
        .should('have.attr', 'aria-setsize', setSize.toString())
        .should('have.attr', 'aria-posinset', posInSet.toString());
    }

    shouldHaveCorrectAriaTreeItemAttributes('first-tree-item', 1, 2, 1)
      .then((subject: JQuery<HTMLElement>) => firstChildItem(subject, 'bouwelementen'));
    shouldHaveCorrectAriaTreeItemAttributes('bouwelementen', 2, 4, 1)
      .then((subject: JQuery<HTMLElement>) => nextSiblingItem(subject, 'bouwonderdelen'));
    shouldHaveCorrectAriaTreeItemAttributes('bouwonderdelen', 2, 4, 2)
      .then((subject: JQuery<HTMLElement>) => nextSiblingItem(subject, 'bouwwerken'));
    shouldHaveCorrectAriaTreeItemAttributes('bouwwerken', 2, 4, 3);

    cy
      .get('@bouwwerken')
      .prev()
      .click()
      .then((subject: JQuery<HTMLElement>) => firstChildItem(subject, 'bebouwing'));

    shouldHaveCorrectAriaTreeItemAttributes('bebouwing', 3, 4, 1)
      .prev()
      .click()
      .then((subject: JQuery<HTMLElement>) => firstChildItem(subject, 'hoogbouw'));
    shouldHaveCorrectAriaTreeItemAttributes('hoogbouw', 4, 2, 1);
  });

  it('should expand / collapse on click on the controller icon', () => {
    cy
      .get('@first-tree-item')
      .prev()
      .click()

    cy
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
      .then(shouldHaveFocusAndTabIndex)
      .realPress('b');

    cy
      .get('@first-tree-item')
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@first-tree-item')
      .then(subject => firstChildItem(subject, 'bouwelementen'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, 'b'))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@bouwelementen')
      .then(subject => nextSiblingItem(subject, 'bouwonderdelen'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, 'b'))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@bouwonderdelen')
      .then(subject => nextSiblingItem(subject, 'bouwwerken'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, 'b'))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@first-tree-item')
      .then(shouldHaveFocusAndTabIndex);
  });

  it('should focus previous item starting with search letter while holding Shift', () => {
    cy
      .get('@first-tree-item')
      .then(shouldHaveFocusAndTabIndex)
      .realPress(['Shift', 'b']);

    cy.get('@first-tree-item')
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@first-tree-item')
      .then(subject => lastChildItem(subject, 'complexen'))
      .then(subject => previousSiblingItem(subject, 'bouwwerken'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, ['Shift', 'b']))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@bouwwerken')
      .then(subject => previousSiblingItem(subject, 'bouwonderdelen'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, ['Shift', 'b']))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@bouwonderdelen')
      .then(subject => previousSiblingItem(subject, 'bouwelementen'))
      .then(shouldHaveFocusAndTabIndex)
      .then(subject => press(subject, ['Shift', 'b']))
      .then(shouldNotHaveFocusAndTabIndex);

    cy
      .get('@first-tree-item')
      .then(shouldHaveFocusAndTabIndex);
  });

  it('should expand or focus child on right arrow key and collapse or focus parent left arrow key', () => {
    function shouldHaveExpandedBehaviour(startElement: string, expanded: boolean, keys: any = null)
     : Cypress.Chainable<JQuery<HTMLElement> | Cypress.Chainable<JQuery<HTMLElement>>> {
      let cursor = cy
        .get(`@${startElement}`)
        .then(shouldHaveFocusAndTabIndex);

      if (expanded !== null) {
        cursor = cursor.should('have.attr', 'aria-expanded', `${expanded}`);
      }

      return cursor
        .then(subject => keys ? press(subject, keys) : subject);
    }

    cy
      .get('@first-tree-item')
      .then(shouldHaveFocusAndTabIndex)
      .realPress(['ArrowDown']);

    cy
      .get('@first-tree-item')
      .then(subject => firstChildItem(subject, 'bouwelementen'));

    shouldHaveExpandedBehaviour('bouwelementen', false, ['ArrowRight']);
    shouldHaveExpandedBehaviour('bouwelementen', true, ['ArrowRight']);

    cy
      .get('@bouwelementen')
      .then(subject => firstChildItem(subject, 'afvoerbuizen'));

    shouldHaveExpandedBehaviour('afvoerbuizen', null, ['ArrowDown', 'ArrowRight']);

    cy
      .get('@bouwelementen')
      .then(subject => lastChildItem(subject, 'ankers'));

    shouldHaveExpandedBehaviour('ankers', true, ['ArrowRight']);

    cy
      .get('@ankers')
      .then(subject => lastChildItem(subject, 'brugankers'))
      .then(shouldHaveFocusAndTabIndex);

    cy.realPress('ArrowLeft');

    shouldHaveExpandedBehaviour('ankers', true, 'ArrowLeft');
    shouldHaveExpandedBehaviour('ankers', false, 'ArrowLeft');
    shouldHaveExpandedBehaviour('bouwelementen', true, 'ArrowLeft');
    shouldHaveExpandedBehaviour('bouwelementen', false, 'ArrowLeft');
    shouldHaveExpandedBehaviour('first-tree-item', true, 'ArrowLeft');
    shouldHaveExpandedBehaviour('first-tree-item', false, 'ArrowLeft');
  });

  it('should have roving tabIndex to move focus with arrow keys, Home and End', () => {
    function shouldHaveFocusBehaviour(startElement: string, selectorFunc: any, targetElement: string, keys: any) {
      cy
        .get(`@${startElement}`)
        .then(subject => selectorFunc ? selectorFunc(subject, targetElement) : subject)
        .then(shouldHaveFocusAndTabIndex)
        .then(subject => press(subject, keys))
        .then(shouldNotHaveFocusAndTabIndex);
    }

    shouldHaveFocusBehaviour('first-tree-item', null, '', 'ArrowDown');
    shouldHaveFocusBehaviour('first-tree-item', firstChildItem, 'bouwelementen', 'ArrowDown');
    shouldHaveFocusBehaviour('bouwelementen', nextSiblingItem, 'bouwonderdelen', 'ArrowDown');
    shouldHaveFocusBehaviour('bouwonderdelen', nextSiblingItem, 'bouwwerken', 'End');
    shouldHaveFocusBehaviour('first-tree-item', nextSiblingItem, 'Woninginrichting', 'ArrowUp');
    shouldHaveFocusBehaviour('bouwwerken', nextSiblingItem, 'complexen', 'Home');

    cy
      .get('@first-tree-item')
      .then(shouldHaveFocusAndTabIndex);
  });

  it('should set tabindex = 0 on clicked item', () => {
    cy
      .get('@first-tree-item')
      .then(subject => lastChildItem(subject, 'complexen'))
      .click();

    cy
      .get('@complexen')
      .should('have.attr', 'tabIndex', 0);

    cy
      .get('@complexen')
      .then(subject => previousSiblingItem(subject, 'bouwwerken'))
      .click();

    cy
      .get('@bouwwerken')
      .should('have.attr', 'tabIndex', 0);
  });

  it('should emit click events', () => {
    const clickEvents = [];
    cy
      .get('dso-tree-view').then(treeView => {
        treeView.get(0).addEventListener('dsoClickItem', (event: CustomEvent) => { clickEvents.push(event.detail) });
      });

    cy
      .get('@first-tree-item')
      .realClick()
      .then(() => {
        expect(clickEvents.length).equals(1);
        expect(clickEvents[0].path.length).equals(1);
        expect(clickEvents[0].path[0].id).equals('item.1');
        expect(clickEvents[0].originalEvent.type).equals('click');
      });
  });

  it('should set active class on clicked item', () => {
    cy
      .get('@first-tree-item')
      .then(subject => lastChildItem(subject, 'complexen'))
      .click();

    cy
      .get('@complexen')
      .should('have.class', 'active');

    cy
      .get('@complexen')
      .then(subject => previousSiblingItem(subject, 'bouwwerken'))
      .click();

    cy
      .get('@bouwwerken')
      .should('have.class', 'active')
      .should('have.attr', 'aria-current', 'true');
  });

  it('should set selected class and "Resultaat: " on result item', () => {
    cy
      .get('#treeViewSearchInput')
      .click()
      .realPress(['b', 'o', 'u', 'Enter']);

    cy
      .realPress(['Shift', 'Tab']);

    cy
      .realPress('r');

    cy
      .get('@first-tree-item')
      .then(subject => firstChildItem(subject, 'Resultaat: bouwelementen'))
      .then(shouldHaveFocusAndTabIndex)
      .find('span.sr-only')
      .should('have.text', 'Resultaat: ');

    cy
      .realPress('r');

    cy
      .get('@first-tree-item')
      .then(subject => firstChildItem(subject, 'Resultaat: bouwelementen'))
      .then(subject => nextSiblingItem(subject, 'Resultaat: bouwonderdelen'))
      .then(shouldHaveFocusAndTabIndex)
      .find('span.sr-only')
      .should('have.text', 'Resultaat: ');
  });

  it('should focus the item when focusItem() is called.', { viewportHeight: 300 }, () => {
    cy
      .get('@tree-view')
      .find('[data-item-id="item.1.2"]')
      .prev()
      .click()
      .get('dso-tree-view')
      .then($treeView => $treeView.get(0)?.focusItem([{ id: 'item.1' }, { id: 'item.1.2' }, { id: 'item.1.2.10' }] as any[]))
      .then(result => expect(result).to.be.true)
      .get('@tree-view')
      .find('[data-item-id="item.1.2.10"]')
      .isWithinViewport()
      .get('@tree-view')
      .find('[data-item-id="item.1.2.10"]')
      .then(shouldHaveFocusAndTabIndex);
  });
});
