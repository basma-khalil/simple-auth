import { isRegistered } from '../auth/isRegistered';

export const getUserData = () =>
isRegistered()
    ? JSON.parse(localStorage.getItem('simpleAuthUser') as string)
    : false;
