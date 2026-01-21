describe('Prueba de integración avanzada - Carga de juegos', () => {
  it('La aplicación solicita los juegos al backend al cargar', () => {

    // Interceptamos la llamada al backend
    cy.intercept('GET', 'http://localhost:8080/api/games').as('getGames')

    // Visitamos la aplicación
    cy.visit('http://localhost:5173')

    // Esperamos la petición al backend
    cy.wait('@getGames')

    // Verificamos que la petición se ha realizado
    cy.get('@getGames').its('response').should('exist')

    // Comprobamos que la UI principal se carga
    cy.contains('Iniciar Sesión').should('exist')
  })
})
