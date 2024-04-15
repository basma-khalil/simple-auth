describe('Register page spec', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('Should display register form when the switch sign up button is clicked', () => {
    cy.get('.signup-tip').get('button').contains('sign up').click();
    cy.get('#signin-form').should('be.hidden');
    cy.get('#signup-form').should('be.visible');
    cy.get('#signup-form').get('h2').contains('sign up').should('be.visible');
    cy.get('#signup-form').get('input[placeholder="Username"]').should('be.visible');
    cy.get('#signup-form').get('input[placeholder="Email"]').should('be.visible');
    cy.get('#signup-form').get('input[placeholder="Password"]').should('be.visible');
    cy.get('#signup-form').get('button').should('be.visible');
  });

  it('Should display sign in form when the switch sign in button is clicked', () => {
    cy.get('.signup-tip').get('button').contains('sign up').click();
    cy.get('.signin-tip').get('button').contains('sign in').click();
    cy.get('#signup-form').should('be.hidden');
    cy.get('#signin-form').should('be.visible');
    cy.get('#signin-form').get('h2').contains('sign in').should('be.visible');
    cy.get('#signin-form').get('input[placeholder="Username"]').should('be.visible');
    cy.get('#signin-form').get('input[placeholder="Password"]').should('be.visible');
    cy.get('#signin-form').get('button').contains('login').should('be.visible');
  });
});
