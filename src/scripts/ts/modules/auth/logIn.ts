import { getUserData } from '../user/getUserData';
import { validateForm } from './validateForm';

export const logIn = (evt: Event) => {
  const usernameInput = document.getElementById('signin-username') as HTMLInputElement;
  const passwordInput = document.getElementById('signin-password') as HTMLInputElement;

  const usernameMessage = usernameInput.nextElementSibling as HTMLParagraphElement;
  const passwordMessage = passwordInput.nextElementSibling as HTMLParagraphElement;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const userData: User = getUserData();
  let errMessage = '';

  const signinForm = document.getElementById('signin-form') as HTMLFormElement;
  const formInputs = [usernameInput, passwordInput];

  evt.preventDefault();
  signinForm.classList.add('submitted');
  usernameInput.classList.remove('invalid');
  passwordInput.classList.remove('invalid');
  validateForm(formInputs);

  if (signinForm.checkValidity()) {
    if (username !== userData.userName) {
      usernameInput.classList.add('invalid');
      errMessage = 'a user with this user name does not exist';
      usernameMessage.textContent = errMessage;
      return;
    } else {
      errMessage = '';
      usernameMessage.textContent = errMessage;
    }

    if (password !== userData.userPassword) {
      passwordInput.classList.add('invalid');
      errMessage = 'wrong password! This password does not match your username';
      passwordMessage.textContent = errMessage;
      return;
    } else {
      errMessage = '';
      passwordMessage.textContent = errMessage;
    }

    signinForm.classList.remove('submitted');
    userData.isLogged = true;
    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
    signinForm.reset();
    window.location.replace('/');
  }
};
