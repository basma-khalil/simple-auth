import { logOut } from '../src/scripts/ts/modules/auth/logOut';

describe('logOut functions', () => {
  it('Should change the simpleAuthUser isLogged key into false', () => {
    const userData: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thump',
      isLogged: true,
    };
    
    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    logOut();
    const newUserData: User = JSON.parse(localStorage.getItem('simpleAuthUser') as string);

    expect(newUserData.isLogged).toBe(false);
  });
});
