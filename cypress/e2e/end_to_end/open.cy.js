describe('E2E - Carga y navegación', () => {
  it('La página principal carga correctamente', () => {
    cy.visit('http://localhost:5173')

    // Comprobamos que el usuario ve la pantalla inicial
    cy.contains('Iniciar Sesión').should('exist')

    // Comprobamos que existen los botones principales
    cy.contains('Entrar').should('exist')
    cy.contains('Crear cuenta').should('exist')
  })
})
