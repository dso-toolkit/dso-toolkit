describe('Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-table--default');
  });

  it('should be horizontally scrollable if the table does not fit', () => {
    cy
      .get('dso-table')
      .as('dsoTable')
      .invoke('attr', 'responsive', true)
      .should('not.have.class', 'dso-is-responsive')
      .viewport(400, 750)
      .get('@dsoTable')
      .should('have.attr', 'is-responsive')
      .get('@dsoTable')
      .shadow()
      .find('.dso-table-body')
      .then($tableBody => expect($tableBody[0].scrollWidth).to.be.greaterThan($tableBody[0].getBoundingClientRect().width));
  });

  it('should open and close an accessible modal', () => {
    cy
      .get('dso-table')
      .as('dsoTable')
      .shadow()
      .as('dsoTableShadow')
      .find('.open-modal-button')
      .should('have.text', 'tabel Overzicht van gebruikersnamen vergroten')
      .get('@dsoTableShadow')
      .find('.open-modal-button')
      .click()
      .get('@dsoTableShadow')
      .find('.dso-dialog')
      .should('have.attr', 'role', 'dialog')
      .should('have.attr', 'aria-labelledby')
      .get('@dsoTableShadow')
      .find('.dso-dialog')
      .invoke('attr', 'aria-labelledby')
      .then(value => cy.get('@dsoTableShadow')
        .find('.dso-header > h2')
        .should('have.id', value)
      )
      .get('@dsoTableShadow')
      .find('.dso-close')
      .click()
      .get('@dsoTableShadow')
      .find('.dso-modal')
      .should('not.exist');
  });

  it('should close the table modal with ESCAPE', () => {
    cy
      .get('dso-table')
      .as('dsoTable')
      .shadow()
      .as('dsoTableShadow')
      .find('.open-modal-button')
      .click()
      .get('@dsoTableShadow')
      .find('.dso-modal')
      .should('exist')
      .realPress('Escape')
      .get('@dsoTableShadow')
      .find('.dso-modal')
      .should('not.exist');
  });

  it('should trap focus in the table modal', () => {
    cy
      .get('dso-table')
      .as('dsoTable')
      .shadow()
      .as('dsoTableShadow')
      .find('.open-modal-button')
      .click()
      .realPress('Tab')
      .realPress('Tab')
      .realPress('Tab')
      .realPress('Tab')
      .realPress('Tab')
      .get('@dsoTableShadow')
      .find('.dso-close')
      .should('be.focused')
      .realPress('Tab')
      .get('dso-table a[href="#fabien"]')
      .should('be.focused');
  });
});
