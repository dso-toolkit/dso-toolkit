describe('Alert', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=alert')
  });

  it('should have button', () => {
    cy
      .get('dso-alert')
      .shadow()
      .get('button');
  });

  const statuses: Array<{
    status: string,
    message: string,
    svgId: string
  }> = [
    { status: 'success', message: 'Gelukt', svgId: 'status-success' },
    { status: 'info', message: 'Opmerking', svgId: 'status-info' },
    { status: 'warning', message: 'Waarschuwing', svgId: 'status-warning' },
    { status: 'danger', message: 'Fout', svgId: 'status-danger-line' }
  ];

  for (const { status, message, svgId } of statuses) {
    it(`should have appropriate message and icon for status "${status}"`, () => {
      cy
        .get('dso-alert')
        .invoke('attr', 'status', status)
        .shadow()
        .find('.alert > span.sr-only')
        .as('span')
        .invoke('text')
        .should('equal', `${message}:`);

      cy
        .get('dso-alert')
        .shadow()
        .find('.alert')
        .then($element => {
          cy
            .window()
            .then(win => {
              return win.getComputedStyle($element.get(0), ':before').backgroundImage;
            })
            .should('match', new RegExp(`^url\\\("data:image\\\/svg\\\+xml,%3csvg id='${svgId}'`));
        });
    });
  }
});
