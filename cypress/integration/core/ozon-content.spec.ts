// STOPTPOD website

describe('Dropdown menu - buttons', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=ozon-content--inhoud');
  });

  it('anchor behaviour', () => {
    const externalAnchor = cy.get('a').contains('STOPTPOD website');
    const anchorClickHandlerSpy = cy.spy();

    cy.get('dso-ozon-content').then($ozonContent => {
      $ozonContent[0].addEventListener('anchorClick', anchorClickHandlerSpy);

      cy.get('#dso-ozon-term-1').click();
      cy.get('a[href="#longTitle_inst2"]').click();

      externalAnchor.then($a => {
        // Prevent default behaviour for testing purpose
        $a.on('click', e => e.preventDefault());

        externalAnchor.click();

        expect(anchorClickHandlerSpy).to.have.been.calledOnce;
      });
    });
  });

  it('should open and close descriptions', () => {
    cy.get('#dso-ozon-term-1 + .od-Al')
      .should('be.not.visible');

    cy.get('#dso-ozon-term-1')
      .should('have.attr', 'aria-controls', 'dso-ozon-content-1')
      .should('have.attr', 'aria-expanded', 'false')
      .click()
      .should('have.attr', 'aria-expanded', 'true')

    cy.get('#dso-ozon-term-1 + .od-Al')
      .should('be.visible');

    cy.get('#dso-ozon-term-1')
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.get('#dso-ozon-term-1 + .od-Al').should('be.not.visible');
  });
});
