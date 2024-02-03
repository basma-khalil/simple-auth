import { getUserData } from './getUserData';

export const loggedHeader = () => {
  const user = document.getElementById('user') as HTMLSpanElement;
  const log = document.getElementById('log') as HTMLAnchorElement;

  if (getUserData()) {
    const { userName } = getUserData();
    user.textContent = userName;
    log.textContent = 'sign out';
  }
};
