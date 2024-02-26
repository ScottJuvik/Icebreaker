describe('activities', () => {
  it('renders the default elements on the screen', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="activities-title"]').should('exist')
      .should('have.text', "Activities");
  })

  it('renders the activites on the screen', () => {
    cy.visit('http://localhost:3000');

    //TODO
  })
})