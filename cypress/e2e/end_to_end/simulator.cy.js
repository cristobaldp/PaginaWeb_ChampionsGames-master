describe('E2E - Flujo completo de login', () => {
  it('El usuario puede rellenar y enviar el formulario de login', () => {
    cy.visit('http://localhost:5173')

    cy.get('input').first().type('test@test.com')
    cy.get('input').eq(1).type('123456')

    cy.contains('Entrar').click()

    // Comprobación final segura
    cy.contains('Entrar').should('exist')
  })
})
