describe('Accordion', () => {
  it('should have ".open" and "[aria-expanded=true]" for open sections and vice versa', () => {
    cy.visit('http://localhost:56206/iframe.html?id=accordion');
    cy.injectAxe();

    cy
      .get('.dso-accordion-section:nth-child(3)')
      .should('have.class', 'dso-open')
      .find('.dso-section-handle > a')
      .should('have.attr', 'aria-expanded', 'true');

    cy
      .get('.dso-accordion-section:nth-child(1)')
      .should('not.have.class', 'dso-open')
      .find('.dso-section-handle > a')
      .should('have.attr', 'aria-expanded', 'false');

    cy.checkA11y('.dso-accordion');
  });

  it('should have cascading headers for nested accordions', () => {
    cy.visit('http://localhost:56206/iframe.html?id=accordion--nested');

    cy.get('.dso-accordion').each(accordion => {
      const currentHeading = +(accordion.closest('.dso-accordion-section')?.find('> .dso-section-handle').get(0)?.tagName ?? 'h1').slice(1);

      cy.get('> .dso-accordion-section > .dso-section-handle', { withinSubject: accordion }).each(handle => {
        cy.wrap(handle).invoke('prop', 'tagName').should('eq', `H${currentHeading + 1}`);
      });
    });
  });
});
