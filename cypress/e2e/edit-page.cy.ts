import { getUserData } from '../../src/scripts/ts/modules/user/getUserData';

describe('Edit profile page spec', () => {
  const user: User = {
    userName: 'user name',
    userEmail: 'test@test.com',
    userPassword: 'user password',
    userThumb: 'user thumb',
    isLogged: true,
  };

  beforeEach(() => {
    cy.visit('/account/edit', {
      onBeforeLoad(win) {
        // Disable Service Worker so Cypress can visit() correctly
        delete Object.getPrototypeOf(win.navigator).serviceWorker;
        win.localStorage.setItem('simpleAuthUser', JSON.stringify(user));
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
  });

  it('Should display the logged username as the a header', () => {
    cy.get('#username').should('have.text', user.userName);
  });

  it('Should have the logged user thumbnail as the default src in the update avatar image', () => {
    cy.get('#avatar').should('have.attr', 'src', user.userThumb);
  });

  it('Should have the logged username as the default value in the update username input', () => {
    cy.get('#update-form')
      .find('#update-username')
      .should('have.value', user.userName);
  });

  it('Should have the logged user email as the default value in the update email input', () => {
    cy.get('#update-form')
      .find('#update-email')
      .should('have.value', user.userEmail);
  });

  it('Should have the logged user password as the default value in the update password input', () => {
    cy.get('#update-form')
      .find('#update-password')
      .should('have.value', user.userPassword);
  });

  it('Should update the username if the update username input change and the update form submitted', () => {
    const newUsername = 'new username';

    cy.get('#update-form').find('#update-username').clear().type(newUsername);
    cy.get('#update-form').find('button[type="submit"]').click();
    cy.wrap({ userData: getUserData })
      .invoke('userData')
      .its('userName')
      .should('eq', newUsername);
  });

  it('Should delete the logged user thumbnail image if the delete image button clicked', () => {
    const defaultImg = '/images/user.svg';

    cy.get('#remove').click();
    cy.get('#avatar').should('have.attr', 'src', defaultImg);
  });

  it('Should display the error message if the update image clicked and the file input changed to an image with size more than 3 MB', () => {
    const thumbnail = './cypress/fixtures/images/thumb-big.png';
    const errMessage = `image is too big, Please select an image less than 3 MB`;

    cy.get('#file-label')
      .click()
      .selectFile(thumbnail)
      .then(() => {
        cy.get('#img-alert').should('have.text', errMessage);
      });
  });
  
  it('Should Should update the user thumbnail image if the update image clicked and the file input changed to an image with size less than 3 MB', () => {
    const thumbnail = './cypress/fixtures/images/thumb-small.png';

    cy.get('#file-label')
      .click()
      .selectFile(thumbnail)
      .then(() => {
        Cypress.Blob.imgSrcToDataURL(thumbnail).then((imgUrl) => {
          cy.get('#avatar').should('have.attr', 'src', imgUrl);
          cy.get('#img-alert').should('have.text', '');
          cy.wrap({ userData: getUserData })
            .invoke('userData')
            .its('userThumb')
            .should('eq', imgUrl);
        });
      });
  });
});
