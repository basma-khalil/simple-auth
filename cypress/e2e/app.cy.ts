describe('App spec', () => {
  beforeEach(() => {
    // Disable Service Worker so Cypress can visit() correctly
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  });
  
  it('Should passes', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
  });
});
