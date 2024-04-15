import { isRegistered } from '../auth/isRegistered';
import { validateForm } from '../auth/validateForm';
import { getUserData } from './getUserData';

export const updateAccount = (evt: Event) => {
  evt.preventDefault();

  if (!isRegistered()) return;
  const usernameInput = document.getElementById('update-username') as HTMLInputElement;
  const emailInput = document.getElementById('update-email') as HTMLInputElement;
  const passwordInput = document.getElementById('update-password') as HTMLInputElement;

  const newName = usernameInput.value.trim();
  const newEmail = emailInput.value.trim();
  const newPassword = passwordInput.value.trim();
  const { userThumb } = getUserData();

  const updateForm = document.getElementById('update-form') as HTMLFormElement;
  const formInputs = [usernameInput, emailInput, passwordInput];

  updateForm.classList.add('submitted');
  validateForm(formInputs);

  if (updateForm.checkValidity()) {
    const user: User = {
      userName: newName,
      userEmail: newEmail,
      userPassword: newPassword,
      userThumb,
      isLogged: true,
    };
    updateForm.classList.remove('submitted');
    localStorage.setItem('simpleAuthUser', JSON.stringify(user));
    window.location.reload();
  }
};
