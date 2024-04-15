describe('Footer spec', () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad (win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    // Disable Service Worker so Cypress can visit() correctly
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  })

  it('Should display the current year in the footer copyright', () => {
    cy.get('footer').get('#current-year').should('contain', currentYear);
  });

  it('Should navigate to the home page if the simple authentication link is clicked', () => {
    cy.get('footer').contains('simple authentication').trigger('mouseover');
    cy.get('footer').contains('simple authentication')
      .should('have.css', 'cursor', 'pointer');
    cy.get('footer').contains('simple authentication').click();
    cy.location('pathname').should('eq', '/');
  });
});
