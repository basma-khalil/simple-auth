import { loggedIn } from '../src/scripts/ts/modules/loggedIn';

describe('loggedIn functions', () => {
  it('Should return false if the simpleAuthUser key is not in the local storage', () => {
    expect(loggedIn()).toBe(false);
  });

  it('Should return true if the simpleAuthUser key is in the local storage', () => {
    const userData = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
    };

    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));

    expect(loggedIn()).toBe(true);
  });
});
