describe('Header spec', () => {
  it('Should navigate to the home page if the authentication link is clicked', () => {
    cy.visit('/');
    cy.get('header').contains('authentication').trigger('mouseover');
    cy.get('header').contains('authentication')
      .should('have.css', 'cursor', 'pointer');
    cy.get('header').contains('authentication').click();
    cy.location('pathname').should('contains', '/index.html');
  });

  it('Should navigate to the authentication page if the sign in link is clicked', () => {
    cy.visit('/');
    cy.get('header').contains('sign in').trigger('mouseover');
    cy.get('header').contains('sign in')
      .should('have.css', 'cursor', 'pointer');
    cy.get('header').contains('sign in').click();
    cy.location('pathname').should('contains', '/auth.html');
  });

  it('Should display the user name and the sign out link if the user is signed in', () => {
    const user = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser',JSON.stringify(user));
      },
    });
    cy.get('header').contains('user name').should('exist');
    cy.get('header').contains('sign out').should('exist');
  });
});
