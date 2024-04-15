import { getUserData } from '../user/getUserData';

export const logOut = () => {
  const userData: User = getUserData();
  userData.isLogged = false;
  localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
  window.location.replace('/');
};
