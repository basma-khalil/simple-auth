import { isRegistered } from '../../src/scripts/ts/modules/auth/isRegistered';

describe('Header spec', () => {
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

  it('Should navigate to the home page if the authentication link is clicked', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('header').contains('authentication').trigger('mouseover');
    cy.get('header')
      .contains('authentication')
      .should('have.css', 'cursor', 'pointer');
    cy.contains('authentication').click();
    cy.location('pathname').should('eq', '/');
  });

  it('Should display the sign in link and hide the user menu when there is no registration', () => {
    cy.visit('/');
    cy.get('header').contains('sign in').should('be.visible');
    cy.get('header').find('#profile').should('be.hidden');
  });

  it('Should display the sign in link and hide the user menu if the user is signed out', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: false,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('header').contains('sign in').should('be.visible');
    cy.get('header').find('#profile').should('be.hidden');
  });

  it('Should navigate to the authentication page if the sign in link is clicked', () => {
    cy.visit('/');
    cy.get('header').contains('sign in').trigger('mouseover');
    cy.get('header')
      .contains('sign in')
      .should('have.css', 'cursor', 'pointer');
    cy.get('header').contains('sign in').click();
    cy.location('pathname').should('eq', '/auth');
  });

  it('Should display the user menu and hide the sign in link if the user is signed in', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('header').contains('sign in').should('be.hidden');
    cy.get('header').find('#profile').should('be.visible');
  });

  it('Should display the user menu if the user is signed in and the profile is clicked', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('header').find('#menu').should('be.hidden');
    cy.get('header').find('#profile').click();
    cy.get('header').find('#menu').should('be.visible');
  });

  it('Should display the username and the user image if the user is signed in', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('header').find('#thumb').should('have.attr', 'src', 'user thump');
    cy.get('header').find('#profile').click();
    cy.get('header')
      .find('#menu')
      .find('#user')
      .should('have.text', 'user name');
  });

  it('Should navigate to the home page if the user is signed in and the home link is clicked', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('header').find('#profile').click();
    cy.get('header').find('#menu').contains('home').click();
    cy.location('pathname').should('eq', '/');
  });

  it('Should navigate to the edit profile page if the user is signed in and the edit profile link is clicked', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
      },
    });
    cy.get('header').find('#profile').click();
    cy.get('header').find('#menu').contains('edit profile').click();
    cy.location('pathname').should('eq', '/account/edit');
  });

  it('Should log out the account if the user is signed in and the sign out button is clicked', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('header').find('#profile').click();
    cy.get('header').find('#menu').contains('sign out').click();
    cy.location('pathname').should('eq', '/');
    cy.get('header').contains('sign in').should('be.visible');
    cy.get('header').find('#profile').should('be.hidden');
  });

  it('Should delete the account if the user is signed in and the delete account button is clicked', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
      },
    });
    cy.get('header').find('#profile').click();
    cy.get('header').find('#menu').contains('delete account').click();
    cy.location('pathname').should('eq', '/');
    cy.get('header').contains('sign in').should('be.visible');
    cy.get('header').find('#profile').should('be.hidden');
    cy.wrap({isRegistered}).invoke('isRegistered').should('eq', false);
  });
});
