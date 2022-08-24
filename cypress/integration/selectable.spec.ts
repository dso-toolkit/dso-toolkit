describe('Selectable', () => {
  it('should toggle info using instance method', () => {
    cy.visit('http://localhost:45000/iframe.html?id=core-selectable--with-info');

    cy.get('dso-selectable .dso-rich-content').as('info-content').should('exist').and('not.be.visible');

    toggleInfo();
    cy.get('@info-content').should('be.visible');

    toggleInfo(false);
    cy.get('@info-content').should('not.be.visible');

    toggleInfo(true);
    cy.get('@info-content').should('be.visible');

    function toggleInfo(active?: boolean) {
      cy.get('dso-selectable').then($s => $s[0].toggleInfo(active));
    }
  });
});
