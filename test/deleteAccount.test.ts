import { deleteAccount } from '../src/scripts/ts/modules/auth/deleteAccount';

describe('deleteAccount functions', () => {
  it('Should delete the simpleAuthUser key from the local storage', () => {
    const userData: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: true,
    };

    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    deleteAccount();
    const newUserData: User = JSON.parse(
      localStorage.getItem('simpleAuthUser') as string
    );

    expect(newUserData).toBe(null);
  });
});
