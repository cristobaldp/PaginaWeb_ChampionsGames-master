describe('E2E - Navegación a registro', () => {
  it('El usuario puede acceder a la pantalla de registro', () => {
    cy.visit('http://localhost:5173')

    // Navegar al registro
    cy.contains('Crear cuenta').click()

    // Verificar que el formulario de registro se muestra
    cy.get('input').should('have.length.at.least', 1)
    cy.contains('Crear').should('exist')
  })
})
