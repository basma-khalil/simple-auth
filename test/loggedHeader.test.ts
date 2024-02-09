import { loggedHeader } from '../src/scripts/ts/modules/loggedHeader';

describe('loggedHeader functions', () => {
  document.body.innerHTML = `
    <span id="user"></span>
    <a href="#" id="log">sign in</a>
  `;

  it('Should display the sign in link if the user is not signed in', () => {
    loggedHeader();

    const user = document.getElementById('user') as HTMLSpanElement;
    const log = document.getElementById('log') as HTMLAnchorElement;

    expect(user.textContent).toBe('');
    expect(log.textContent).toBe('sign in');
  });

  it('Should display the user name and the sign out link if the user is signed in', () => {
    const userData = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
    };

    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    loggedHeader();

    const user = document.getElementById('user') as HTMLSpanElement;
    const log = document.getElementById('log') as HTMLAnchorElement;

    expect(user.textContent).toBe('user name');
    expect(log.textContent).toBe('sign out');
  });
});
