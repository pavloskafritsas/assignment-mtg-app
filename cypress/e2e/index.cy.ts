describe('Page index', () => {
  it('updates the URL when changing page', () => {
    cy.visit('/')

    cy.contains('Team members').should('be.visible')

    cy.get('.p-data-table__pagination-actions button').eq(1).click()

    cy.url().should('include', 'page=2')
  })
})
