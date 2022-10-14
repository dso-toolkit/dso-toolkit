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

  const url = 'https://core.dso-toolkit.nl/_1376-helpcenter-panel/?path=/docs/helpcenter-panel--helpcenter-panel';

  const transitionTime = 500;

  it('should be accessible', () => {
    cy.injectAxe();
    cy.checkA11y("dso-helpcenter-panel");
    cy.get('@closeButton')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'aria-controls', 'dso-panel-wrapper')
      .get('@openButton')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'aria-controls', 'dso-panel-wrapper')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .get('@closeButton')
      .should('have.attr', 'aria-expanded', 'true');
  });

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

  it('should not load iframe when panel is closed', () => {
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

  it('should close panel on escape', () => {
    cy.get('@openButton')
      .click()
      .wait(transitionTime)
      .get('@iframeContainer')
      .should('be.visible')
      .and('have.class', 'open')
      .realPress('Escape')
      .wait(transitionTime)
      .get('@iframeContainer')
      .should('not.be.visible')
      .and('have.class', 'close');
  });

  it('should prevent scrolling when panel is open', () => {
    cy.get('body')
      .should('not.have.css', 'overflow', 'hidden')
      .get('@openButton')
      .click()
      .get('body')
      .should('have.css', 'overflow', 'hidden');
  });

  it('should trap focus on panel open', () => {
    cy.get('@openButton')
      .click()
      .wait(transitionTime)
      .get('@closeButton')
      .should('have.focus')
      .realPress('Tab')
      .get('@iframeContainer')
      .find('iframe')
      .should('have.focus');
  });

  it('should be responsive', () => {
    cy.get('@openButton')
      .click()
      .viewport(768, 660)
      .get('@iframeContainer')
      .should('have.css', 'width', '640px')
      .viewport(767, 660)
      .get('@iframeContainer')
      .should('have.css', 'width', '480px')
      .viewport(481, 660)
      .get('@iframeContainer')
      .should('have.css', 'width', '480px')
      .viewport(480, 660)
      .get('@iframeContainer')
      .should('have.css', 'width', '320px');
  });
});
