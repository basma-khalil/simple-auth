import { validateForm } from './validateForm';

export const register = (evt: Event) => {
  const usernameInput = document.getElementById('signup-username') as HTMLInputElement;
  const emailInput    = document.getElementById('signup-email') as HTMLInputElement;
  const passwordInput = document.getElementById('signup-password') as HTMLInputElement;

  const userName     = usernameInput.value.trim();
  const userEmail    = emailInput.value.trim();
  const userPassword = passwordInput.value.trim();
  const userThumb    = '/images/user.svg';

  const signupForm = document.getElementById('signup-form') as HTMLFormElement;
  const formInputs = [usernameInput, emailInput, passwordInput];

  evt.preventDefault();
  signupForm.classList.add('submitted');
  validateForm(formInputs);

  if (signupForm.checkValidity()) {
    const user: User = {
      userName,
      userEmail,
      userPassword,
      userThumb,
      isLogged: true,
    };
    signupForm.classList.remove('submitted');
    localStorage.setItem('simpleAuthUser', JSON.stringify(user));
    signupForm.reset();
    window.location.replace('/');
  }
};
