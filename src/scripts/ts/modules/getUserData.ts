import { loggedIn } from './loggedIn';

export const getUserData = () => (
  loggedIn()
    ? JSON.parse(localStorage.getItem('simpleAuthUser') as string)
    : false
);