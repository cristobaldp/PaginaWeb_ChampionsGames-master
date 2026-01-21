describe('Prueba de integración - Login', () => {
  it('El usuario puede entrar en la aplicación', () => {
    cy.visit('http://localhost:5173')

    // Rellenar formulario
    cy.get('input').first().type('test@test.com')
    cy.get('input').eq(1).type('123456')

    // Enviar formulario
    cy.contains('Entrar').click()

    // Comprobación básica (ajusta según tu app)
    cy.url().should('not.include', 'login')
  })
})
