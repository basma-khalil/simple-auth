import { registerServiceWorker } from './modules/registerServiceWorker';
import { loggedHeader } from './modules/user/loggedHeader';
import { toggleMenu } from './modules/user/toggleMenu';
import { coprCurrentYear } from './modules/coprCurrentYear';
import { logOut } from './modules/auth/logOut';
import { deleteAccount } from './modules/auth/deleteAccount';

registerServiceWorker();
loggedHeader();
coprCurrentYear();

const profile = document.getElementById('profile') as HTMLDivElement;
profile.addEventListener('click', toggleMenu);

const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
logoutBtn.addEventListener('click', logOut);

const deleteBtn = document.getElementById('delete-acc') as HTMLButtonElement;
deleteBtn.addEventListener('click', deleteAccount);
