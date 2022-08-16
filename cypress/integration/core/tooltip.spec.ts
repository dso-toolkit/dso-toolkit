describe('Tooltip', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=tooltip--as-child');
  });

  function prepareComponent() {
    cy.get('#root')
      .invoke('attr', 'style', 'min-height: 360px;');

    cy.get('dso-tooltip')
      .closest('button')
      .as('dsoButton');
  }

  /*
    https://github.com/dmtrKovalenko/cypress-real-events/issues/247
  */
  // it('should show tooltip on hover on button and hide on escape key', () => {
  //   prepareComponent();

  //   cy
  //     .get('@dsoButton')
  //     .wait(100)
  //     .realHover()
  //     .wait(400)
  //     .find('dso-tooltip')
  //     .should('not.have.class', 'hidden')
  //     .wait(400)
  //     .get('body')
  //     .trigger('keydown', { key: 'Escape' })
  //     .wait(400)
  //     .get('@dsoButton')
  //     .find('dso-tooltip')
  //     .should('have.class', 'hidden');
  // });

  it('should show tooltip on focus on button and hide on escape key', () => {
    prepareComponent();

    cy
      .get('@dsoButton')
      .wait(100)
      .focus()
      .wait(1000)
      .find('dso-tooltip')
      .should('not.have.class', 'hidden')
      .wait(400)
      .get('body')
      .trigger('keydown', { key: 'Escape' })
      .wait(400)
      .get('@dsoButton')
      .find('dso-tooltip')
      .should('have.class', 'hidden');
  });
});
