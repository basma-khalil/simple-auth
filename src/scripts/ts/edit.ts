import { registerServiceWorker } from './modules/registerServiceWorker';
import { loggedHeader } from './modules/user/loggedHeader';
import { toggleMenu } from './modules/user/toggleMenu';
import { coprCurrentYear } from './modules/coprCurrentYear';
import { logOut } from './modules/auth/logOut';
import { deleteAccount } from './modules/auth/deleteAccount';
import { getUserData } from './modules/user/getUserData';
import { updateImage } from './modules/user/updateImage';
import { updateAccount } from './modules/user/updateAccount';
import { deleteImage } from './modules/user/deleteImage';

registerServiceWorker();
loggedHeader();
coprCurrentYear();

const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement;
menuBtn.addEventListener('click', toggleMenu);

const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
logoutBtn.addEventListener('click', logOut);

const deleteBtn = document.getElementById('delete-acc') as HTMLButtonElement;
deleteBtn.addEventListener('click', deleteAccount);

const fileInput = document.getElementById('file') as HTMLInputElement;
fileInput.addEventListener('change', updateImage);

const userData: User = getUserData();
const { userName, userEmail, userPassword, userThumb } = userData;
const usernameHeader = document.getElementById('username') as HTMLHeadingElement;
usernameHeader.textContent = userName;

const usernameInput = document.getElementById('update-username') as HTMLInputElement;
const emailInput = document.getElementById('update-email') as HTMLInputElement;
const passwordInput = document.getElementById('update-password') as HTMLInputElement;
const avatar = document.getElementById('avatar') as HTMLImageElement;
const defaultImg = '/images/user.svg';

// User Initial Values
usernameInput.value = userName || '';
emailInput.value = userEmail || '';
passwordInput.value = userPassword || '';
avatar.src = userThumb || defaultImg;

const updateForm = document.getElementById('update-form') as HTMLFormElement;
updateForm.addEventListener('submit', updateAccount);

const delImgBtn = document.getElementById('remove') as HTMLButtonElement;
(userThumb !== defaultImg && userThumb !== undefined) && delImgBtn.classList.remove('invisible');
delImgBtn.addEventListener('click', deleteImage);
