describe('Prueba de integración - Registro', () => {
  it('El usuario puede acceder al formulario de registro', () => {
    cy.visit('http://localhost:5173')

    cy.contains('Crear cuenta').click()

    // Comprobaciones básicas
    cy.get('input').should('have.length.at.least', 1)
    cy.contains('Crear').should('exist')
  })
})
