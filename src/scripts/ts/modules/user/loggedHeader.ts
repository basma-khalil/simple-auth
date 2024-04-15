import { getUserData } from './getUserData';

export const loggedHeader = () => {
  const profile  = document.getElementById('profile') as HTMLDivElement;
  const user     = document.getElementById('user') as HTMLSpanElement;
  const thumb    = document.getElementById('thumb') as HTMLImageElement;
  const log      = document.getElementById('log') as HTMLAnchorElement;
  const userData: User = getUserData();

  if (userData.isLogged) {
    log.classList.add('hidden');
    profile.classList.remove('hidden');
    const { userName, userThumb } = userData;
    user.textContent = userName;
    thumb.src = userThumb;
  }
};
