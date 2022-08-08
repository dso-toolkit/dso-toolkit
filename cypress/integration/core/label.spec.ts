describe('Label', () => {

  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=label--default');
  });

  const defaultLabelText = 'Bouwwerken, werken en objecten bouwen';
  const labelMaxWidth = 180; // in px

  /** Configure the component and set an eventListener as @selectPageListener */
  function prepareComponent() {
    // Set the min-height so that there is room for the tooltip.
    cy.get('#root')
      .invoke('attr', 'style', 'min-height: 360px;');

    cy.get('dso-label')
      .as('dsoLabel')
      .shadow()
      .as('dsoLabelShadow')
      .get('@dsoLabel')
      .invoke('html', defaultLabelText)
      .get('@dsoLabel')
      .then($label => {
        $label.on('removeClick', cy.stub().as('removeClickListener'));
      });
  }

  it('should be able to truncate label', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('outerWidth')
      .should('be.gt', labelMaxWidth + 10)
      .get('@dsoLabel')
      .invoke('attr', 'truncate', true)
      .wait(100)
      .get('@dsoLabelShadow')
      .find('.dso-label-content')
      .invoke('outerWidth')
      .should('be.lt', labelMaxWidth + 10);
  });

  it('should show tooltip on focus', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .invoke('attr', 'truncate', true)
      .invoke('attr', 'removable', true)
      .wait(100)
      .get('@dsoLabelShadow')
      .find('.dso-label-content')
      .focus()
      .get('@dsoLabelShadow')
      .find('dso-tooltip')
      .should('not.have.class', 'hidden')
      .should('have.text', defaultLabelText)
      .wait(400)
      .realPress("Tab")
      .get('@dsoLabelShadow')
      .find('dso-tooltip')
      .should('have.class', 'hidden');
  });

  it('should close tooltip when escape is pressed', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('attr', 'truncate', true)
      .get('@dsoLabelShadow')
      .find('.dso-label-content')
      .focus()
      .wait(200)
      .get('@dsoLabelShadow')
      .find('dso-tooltip')
      .should('not.have.class', 'hidden')
      .get('body')
      .trigger('keydown', { key: 'Escape' })
      .get('@dsoLabelShadow')
      .find('dso-tooltip')
      .should('have.class', 'hidden');
  });

  it('should emit removeClick event', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('attr', 'removable', true)
      .get('@dsoLabelShadow')
      .find('button')
      .click()
      .get('@removeClickListener')
      .should('have.been.calledOnce');
  });
});
