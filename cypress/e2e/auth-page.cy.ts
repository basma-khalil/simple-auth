import { isRegistered } from '../../src/scripts/ts/modules/auth/isRegistered';
import { getUserData } from '../../src/scripts/ts/modules/user/getUserData';

describe('Auth page spec', () => {
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

  it('Should display register form and hide the sign-in form when the switch sign up button is clicked', () => {
    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('.signup-tip').contains('button', 'sign up').click();
    cy.get('#signin-form').should('be.hidden');
    cy.get('#signup-form').should('be.visible');
    cy.get('#signup-form').contains('h2', 'sign up').should('be.visible');
    cy.get('#signup-form')
      .find('input[placeholder="Username"]')
      .should('be.visible');
    cy.get('#signup-form')
      .find('input[placeholder="Email"]')
      .should('be.visible');
    cy.get('#signup-form')
      .find('input[placeholder="Password"]')
      .should('be.visible');
    cy.get('#signup-form').find('button').should('be.visible');
  });

  it('Should display sign-in form and hide the register form when the switch sign in button is clicked', () => {
    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('.signup-tip').contains('button', 'sign up').click();
    cy.get('.signin-tip').contains('button', 'sign in').click();
    cy.get('#signup-form').should('be.hidden');
    cy.get('#signin-form').should('be.visible');
    cy.get('#signin-form').contains('h2', 'sign in').should('be.visible');
    cy.get('#signin-form')
      .find('input[placeholder="Username"]')
      .should('be.visible');
    cy.get('#signin-form')
      .find('input[placeholder="Password"]')
      .should('be.visible');
    cy.get('#signin-form').contains('button', 'login').should('be.visible');
  });

  it('Should display the error message if the user submit register form with empty input', () => {
    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('.signup-tip').contains('button', 'sign up').click();
    cy.get('#signup-form').contains('button', 'sign up').click();
    cy.get('#signup-form')
      .find('input[placeholder="Username"]')
      .then(($nameInput) => {
        const errMessage = (<HTMLInputElement>$nameInput[0]).validationMessage;
        expect($nameInput.next()).to.has.text(errMessage);
      });
    cy.get('#signup-form')
      .find('input[placeholder="Email"]')
      .then(($emailInput) => {
        const errMessage = (<HTMLInputElement>$emailInput[0]).validationMessage;
        expect($emailInput.next()).to.has.text(errMessage);
      });
    cy.get('#signup-form')
      .find('input[placeholder="Password"]')
      .then(($passwordInput) => {
        const errMessage = (<HTMLInputElement>$passwordInput[0])
          .validationMessage;
        expect($passwordInput.next()).to.has.text(errMessage);
      });
    cy.location('pathname').should('eq', '/auth');
  });

  it('Should display the error message if the user submit register form with invalid input values', () => {
    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('.signup-tip').contains('button', 'sign up').click();
    cy.get('#signup-form').find('input[placeholder="Username"]').type('12');
    cy.get('#signup-form').find('input[placeholder="Email"]').type('email');
    cy.get('#signup-form').find('input[placeholder="Password"]').type('123');
    cy.get('#signup-form').contains('button', 'sign up').click();
    cy.get('#signup-form')
      .find('input[placeholder="Username"]')
      .then(($nameInput) => {
        const errMessage = (<HTMLInputElement>$nameInput[0]).validationMessage;
        expect($nameInput.next()).to.has.text(errMessage);
      });
    cy.get('#signup-form')
      .find('input[placeholder="Email"]')
      .then(($emailInput) => {
        const errMessage = (<HTMLInputElement>$emailInput[0]).validationMessage;
        expect($emailInput.next()).to.has.text(errMessage);
      });
    cy.get('#signup-form')
      .find('input[placeholder="Password"]')
      .then(($passwordInput) => {
        const errMessage = (<HTMLInputElement>$passwordInput[0])
          .validationMessage;
        expect($passwordInput.next()).to.has.text(errMessage);
      });
    cy.location('pathname').should('eq', '/auth');
  });

  it('Should register successfully if the user register with a valid username, email, and password', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'test@test.com',
      userPassword: 'user password',
      userThumb: '/images/user.svg',
      isLogged: true,
    };

    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('.signup-tip').find('button').contains('sign up').click();
    cy.get('#signup-form')
      .find('input[placeholder="Username"]')
      .type(user.userName);
    cy.get('#signup-form')
      .find('input[placeholder="Email"]')
      .type(user.userEmail);
    cy.get('#signup-form')
      .find('input[placeholder="Password"]')
      .type(user.userPassword);
    cy.get('#signup-form').contains('button', 'sign up').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#profile').should('be.visible');
    cy.wrap({ isRegistered }).invoke('isRegistered').should('eq', true);
    cy.wrap({ getUserData }).invoke('getUserData').should('deep.equal', user);
  });

  it('Should display the error message if the user login without registration or with the wrong registration username', () => {
    const errMessage = 'a user with this username does not exist';

    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('#signin-form').find('input[placeholder="Username"]').type('test');
    cy.get('#signin-form').find('input[placeholder="Password"]').type('abc123');
    cy.get('#signin-form').contains('button', 'login').click();
    cy.contains(errMessage).should('be.visible');
  });

  it('Should display the error message if the user login with the wrong registration password', () => {
    const errMessage =
      'wrong password! This password does not match your username';
    const user: User = {
      userName: 'user name',
      userEmail: 'test@test.com',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: false,
    };

    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('#signin-form')
      .find('input[placeholder="Username"]')
      .type(user.userName);
    cy.get('#signin-form').find('input[placeholder="Password"]').type('abc123');
    cy.get('#signin-form').contains('button', 'login').click();
    cy.contains(errMessage).should('be.visible');
  });

  it('Should login successfully if the user login with the correct registration username and password', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'test@test.com',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: false,
    };

    cy.visit('/auth', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('#signin-form')
      .find('input[placeholder="Username"]')
      .type(user.userName);
    cy.get('#signin-form')
      .find('input[placeholder="Password"]')
      .type(user.userPassword);
    // FIX: Cypress run fails this assertion although it passes with Cypress open
    // cy.once('fail', (err) => {
    //   return false;
    // });
    cy.get('#signin-form').contains('button', 'login').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#profile').should('be.visible');
    cy.wrap({ getUserData })
      .invoke('getUserData')
      .its('isLogged')
      .should('eq', true);
  });
});
