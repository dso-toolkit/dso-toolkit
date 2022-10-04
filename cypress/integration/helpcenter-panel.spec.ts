describe("Helpcenter panel", () => {
  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-helpcenter-panel--helpcenter-panel');

    cy.get('dso-helpcenter-panel')
      .should('have.attr', 'label', 'Hulp nodig')
      .shadow()
      .as('dsoHelpcenterPanel')
      .find('div.wrapper div.iframe-container')
      .as('iframeContainer')
      .get('@dsoHelpcenterPanel')
      .find('button.open-button')
      .as('openButton')
      .get('@dsoHelpcenterPanel')
      .find('div.wrapper button.close-button')
      .as('closeButton');
  });

  const transitionTime = 500;

  const url = 'https://core.dso-toolkit.nl/_1376-helpcenter-panel/?path=/docs/helpcenter-panel--helpcenter-panel';

  it('should open panel on help button click', () => {
    cy.get('@iframeContainer')
      .should('have.class', 'close')
      .get('@openButton')
      .should('have.class', 'close')
      .click()
      .wait(transitionTime)
      .get('@iframeContainer')
      .should('have.class', 'open')
      .find('iframe')
      .should('be.visible')
      .get('@openButton')
      .should('have.class', 'open');
  });

  it.only('should not load iframe when panel is closed', () => {
    cy.get('@openButton')
      .click()
      .get('@iframeContainer')
      .find('iframe')
      .as('iframe')
      .should('have.attr', 'src', url)
      .get('@closeButton')
      .click()
      .wait(transitionTime)
      .get('dso-helpcenter-panel')
      .invoke('attr', 'url', 'https://core.dso-toolkit.nl/_1376-helpcenter-panel/?path=/docs/label--default')
      .get('@iframe')
      .should('have.attr', 'src', url)
      .get('@openButton')
      .click()
      .get('@iframe')
      .should('have.attr', 'src', 'https://core.dso-toolkit.nl/_1376-helpcenter-panel/?path=/docs/label--default');
  });
});
