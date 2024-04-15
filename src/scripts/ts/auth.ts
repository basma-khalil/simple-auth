import { registerServiceWorker } from './modules/registerServiceWorker';
import { coprCurrentYear } from './modules/coprCurrentYear';
import { accessibility } from './modules/accessibility';
import { switchMood } from './modules/switchMood';
import { logIn } from './modules/auth/logIn';
import { register } from './modules/auth/register';

registerServiceWorker();
coprCurrentYear();
accessibility();

const signupTipBtn = document.querySelector(
  '.signup-tip button'
) as HTMLButtonElement;
const signinTipBtn = document.querySelector(
  '.signin-tip button'
) as HTMLButtonElement;
signupTipBtn.addEventListener('click', switchMood);
signinTipBtn.addEventListener('click', switchMood);

const signinForm = document.getElementById('signin-form') as HTMLFormElement;
signinForm.addEventListener('submit', logIn);

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
signupForm.addEventListener('submit', register);
