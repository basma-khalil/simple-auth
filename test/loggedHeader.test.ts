import '@testing-library/jest-dom';
import { loggedHeader } from '../src/scripts/ts/modules/user/loggedHeader';

describe('loggedHeader functions', () => {
  document.body.innerHTML = `
    <div id="profile" class="hidden">
      <span id="user"></span>
      <img id="thumb" src="" />
    </div>
    <a href="#" id="log">sign in</a>
  `;

  it('Should display the sign-in link and hide the profile div if the user is not registered', () => {
    loggedHeader();

    const profile = document.getElementById('profile') as HTMLDivElement;
    const log = document.getElementById('log') as HTMLAnchorElement;

    expect(profile).toHaveClass('hidden');
    expect(log).not.toHaveClass('hidden');
  });

  it('Should display the sign-in link and hide the profile div if the user is not signed in', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: false,
    };
    localStorage.setItem('simpleAuthUser', JSON.stringify(user));

    loggedHeader();

    const profile = document.getElementById('profile') as HTMLDivElement;
    const log = document.getElementById('log') as HTMLAnchorElement;

    expect(profile).toHaveClass('hidden');
    expect(log).not.toHaveClass('hidden');
  });

  it('Should display the profile div and hide the sign-in link if the user is signed in', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: true,
    };
    localStorage.setItem('simpleAuthUser', JSON.stringify(user));
    loggedHeader();

    const profile = document.getElementById('profile') as HTMLDivElement;
    const log = document.getElementById('log') as HTMLAnchorElement;

    expect(profile).not.toHaveClass('hidden');
    expect(log).toHaveClass('hidden');
  });

  it('Should display the logged username if the user is signed in', () => {
    const userData: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: true,
    };
    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    loggedHeader();

    const user = document.getElementById('user') as HTMLSpanElement;

    expect(user).toHaveTextContent('user name');
  });

  it('Should display the logged thumbnail as the thumb image src if the user is signed in', () => {
    const user: User = {
      userName: 'user name',
      userEmail: 'user email',
      userPassword: 'user password',
      userThumb: 'user thumb',
      isLogged: true,
    };
    localStorage.setItem('simpleAuthUser', JSON.stringify(user));
    loggedHeader();

    const thumbnail = document.getElementById('thumb') as HTMLImageElement;

    expect(thumbnail).toHaveAttribute('src', 'user thumb');
  });
});
