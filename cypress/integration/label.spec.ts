describe.skip('Label', () => {

  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-label--default');
  });

  const defaultLabelText = 'Bouwwerken, werken en objecten bouwen';
  function prepareComponent() {
    // Set the min-height so that there is room for the tooltip.
    cy.get('#root')
      .invoke('attr', 'style', 'min-height: 360px;');

    cy.get('dso-label')
      .invoke('html', defaultLabelText)
      .as('dsoLabel')
      .shadow()
      .as('dsoLabelShadow');
  }

  it('should be able to truncate label', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('attr', 'truncate', '')
      .get('dso-label')
      .should('have.not.have.attr', 'aria-roledescription')
      .get('dso-label')
      .then($element => $element.wrap('<div style="max-width: 100px">'))
      .get('dso-label')
      .should('have.attr', 'aria-roledescription', 'Deze tekst is visueel afgekapt en wordt volledig zichtbaar bij focus.')
      .get('@dsoLabelShadow')
      .find('.dso-label-content')
      .should('exist');
  });

  it('should show tooltip on focus', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .then($element => $element.wrap('<div style="max-width: 100px">'))
      .invoke('attr', 'truncate', '')
      .invoke('attr', 'removable', '')
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
      .then($element => $element.wrap('<div style="max-width: 100px">'))
      .get('@dsoLabel')
      .invoke('attr', 'truncate', '')
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

  it('should have label text on remove button', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('attr', 'removable', '')
      .wait(200)
      .get('@dsoLabelShadow')
      .find('button span.sr-only')
      .should('have.text', `Verwijder: ${defaultLabelText}`);
  });

  it('should update label and remove button text', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .should('have.text', defaultLabelText)
      .invoke('attr', 'removable', '')
      .get('@dsoLabel')
      .invoke('html', 'andere tekst')
      .get('@dsoLabel')
      .should('have.text', 'andere tekst')
      .get('@dsoLabelShadow')
      .find('button span.sr-only')
      .should('have.text', 'Verwijder: andere tekst');
  });

  it.skip('should emit removeLabel event', () => {
    prepareComponent();

    cy.get('@dsoLabel')
      .then($element => $element.on('dsoRemoveLabel', cy.stub().as('removeLabelListener')))
      .should('have.text', defaultLabelText)
      .invoke('attr', 'removable', '')
      .get('@dsoLabelShadow')
      .find('button span.sr-only')
      .should('have.text', `Verwijder: ${defaultLabelText}`)
      .get('@dsoLabel')
      .invoke('html', 'andere tekst')
      .get('@dsoLabelShadow')
      .find('button span.sr-only')
      .should('have.text', `Verwijder: andere tekst`)
      .closest('button')
      .click()
      .get('@removeLabelListener')
      .should('have.been.calledOnce');
  });
});
