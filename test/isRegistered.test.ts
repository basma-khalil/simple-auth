import { isRegistered } from '../src/scripts/ts/modules/auth/isRegistered';

describe('loggedIn functions', () => {
  it('Should return false if the simpleAuthUser key is not in the local storage', () => {
    expect(isRegistered()).toBe(false);
  });

  it('Should return true if the simpleAuthUser key is in the local storage', () => {
    const userData: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };

    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));

    expect(isRegistered()).toBe(true);
  });
});
