import { getUserData } from '../src/scripts/ts/modules/getUserData';

describe('getUserData functions', () => {
  it('Should return false if the simpleAuthUser key is not in the local storage', () => {
    expect(getUserData()).toBe(false);
  });

  it('Should return the simpleAuthUser object value if the simpleAuthUser key is in the local storage', () => {
    const userData = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
    };

    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));

    expect(getUserData()).toEqual(userData);
  });
});
