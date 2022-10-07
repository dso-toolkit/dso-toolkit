describe('Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-table--default')
  });

  it('should be horizontally scrollable if the table does not fit', () => {
    cy
      .get('dso-table')
      .as('dsoTable')
      .should('not.have.class', 'dso-is-responsive')
      .viewport(400, 750)
      .get('@dsoTable')
      .should('have.class', 'dso-is-responsive')
      .then($table => expect($table[0].scrollWidth).to.be.greaterThan($table[0].getBoundingClientRect().width));
  });
});
