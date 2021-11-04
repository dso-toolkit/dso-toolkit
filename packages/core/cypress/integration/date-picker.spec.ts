describe('Date Picker', () => {
  const ANIMATION_TIME = 400; // Keep in sync with date-picker.scss $date-picker-transition-duration

  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=date-picker--with-label');
    cy.injectAxe();
  });

  it('should have label', () => {
    cy
      .get('dso-date-picker')
      .should('have.attr', 'identifier')
      .and('not.be.empty')
      .then(id => {
        cy
          .get(`label[for="${id}"]`)
          .should('exist')
          .and('not.be.empty');
      });
  });

  it('should have focus trap', () => {
    cy
      .get('dso-date-picker')
      .shadow()
      .as('date-picker')
      .find('button.dso-date__toggle')
      .click()

    cy
      .get('@date-picker')
      .find('.dso-date__dialog :focus')
      .should('have.focus');

    cy
      .get('@date-picker')
      .find('select.dso-date__select--month')
      .should('have.focus')
      .realPress('Tab');

    cy
      .get('@date-picker')
      .find('select.dso-date__select--year')
      .should('have.focus')
      .realPress('Tab');

    cy
      .get('@date-picker')
      .find('button.dso-date__prev')
      .should('have.focus')
      .realPress('Tab');

    cy
      .get('@date-picker')
      .find('button.dso-date__next')
      .should('have.focus')
      .realPress('Tab');

    cy
      .get('@date-picker')
      .find('button.dso-date__day.is-today')
      .should('have.focus')
      .realPress('Tab');

    cy
      .get('@date-picker')
      .find('button.dso-date__close')
      .should('have.focus')
      .realPress('Tab');
    
    cy
      .get('@date-picker')
      .find('select.dso-date__select--month')
      .should('have.focus')
      .realPress('Escape');

    cy
      .get('@date-picker')
      .find('button.dso-date__toggle')
      .should('have.focus');
  });

  it('ESCAPE should close date picker and focus toggle button', () => {
    cy
      .get('dso-date-picker')
      .shadow()
      .as('date-picker');

    cy
      .get('@date-picker')
      .find('button.dso-date__toggle')
      .click();

    cy
      .get('@date-picker')
      .find('.dso-date__dialog :focus')
      .should('have.focus');

    cy.realPress('Escape');

    cy
      .get('@date-picker')
      .find('.dso-date__dialog')
      .should('not.have.class', 'is-active')
      .and('not.be.visible');

    cy
      .get('@date-picker')
      .find('button.dso-date__toggle')
      .should('have.focus');
  });

  it('should navigate by keyboard', () => {
    cy
      .get('dso-date-picker')
      // Prepare date picker, cy.clock() doesn't work (presumably because of Stencil dev env)
      .invoke('attr', 'value', '19-09-1988')
      .should('have.attr', 'value', '19-09-1988')
      // End preparation
      .shadow()
      .as('date-picker');
    
    cy
      .get('@date-picker')
      .find('button.dso-date__toggle')
      .click()
    
    cy
      .get('@date-picker')
      .find('.dso-date__dialog :focus')
      .should('have.focus');

    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.realPress('Tab');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus')
      .realPress('ArrowUp');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(12))')
      .should('have.focus')
      .realPress('ArrowRight');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(13))')
      .should('have.focus')
      .realPress('ArrowDown');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(20))')
      .should('have.focus')
      .realPress('ArrowLeft');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus')
      .realPress('ArrowLeft');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(18))')
      .should('have.focus');
    
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(26))')
      .should('have.focus')
      .realPress('ArrowUp');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus')
      .realPress('End');

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(26))')
      .realPress('Home')

    cy
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus')
      .realPress('PageDown');

    cy
      .get('@date-picker')
      .find('select.dso-date__select--month')
      .should('have.value', '9')
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus')
      .realPress('PageUp');

    cy
      .get('@date-picker')
      .find('select.dso-date__select--month')
      .should('have.value', '8')
      .get('@date-picker')
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should('have.focus');
  });

  it('should select first day of current month', () => {
    const now = new Date()

    cy.checkA11y('dso-date-picker');

    cy
      .get('dso-date-picker')
      .shadow()
      .as('root')
      .find('button.dso-date__toggle')
      .click();

    // We need to wait for color contrast checks, during the fade-in/fade-out the computed color code is returning a faded color code
    cy.wait(ANIMATION_TIME).checkA11y('dso-date-picker');

    cy.get('@root')
      .find('.dso-date__day.is-today')
      .click();

    cy.wait(ANIMATION_TIME).checkA11y('dso-date-picker');

    cy
      .get('dso-date-picker')
      .invoke('attr', 'value')
      .should('equal', `${now.getDate().toString(10).padStart(2, '0')}-${(now.getMonth() + 1).toString(10).padStart(2, '0')}-${now.getFullYear().toString(10).padStart(2, '0')}`);
  });

  it('should open and close using instance methods', () => {
    cy
      .get('dso-date-picker')
      .then(($element: JQuery<HTMLDsoDatePickerElement>) => {
        $element.get(0).show();
      })
      .get('.dso-date__dialog.is-active', { includeShadowDom: true })
      .should('be.visible')
      .get('dso-date-picker')
      .then(($element: JQuery<HTMLDsoDatePickerElement>) => {
        $element.get(0).hide();
      })
      .get('.dso-date__dialog', { includeShadowDom: true })
      .should('not.have.class', 'is-active')
      .should('not.be.visible');
  });

  it('should select February 5th, 2015', () => {
    cy.get('dso-date-picker').then(e => {
      e.get(0).addEventListener('dateChange', cy.stub().as('dateChange'))
    });

    cy
      .get('dso-date-picker')
      .shadow()
      .as('root')
      .find('button.dso-date__toggle')
      .click()
      .wait(ANIMATION_TIME)
      .get('@root')
      .find('select.dso-date__select--year')
      .select('2015')
      .get('@root')
      .find('select.dso-date__select--month')
      .select('Februari')
      .get('@root')
      .find('table.dso-date__table button > span.dso-date__vhidden')
      .contains('05-02-2015')
      .closest('button')
      .click();
    
    cy.get('@dateChange').should('have.been.calledOnce');
  });

  it('should padStart days and months with 0', () => {
    cy
      .get('dso-date-picker')
      .invoke('attr', 'value', '1-1-2000')
      .shadow()
      .find('input.dso-date__input')
      .should('have.value', '01-01-2000')
  });
});
