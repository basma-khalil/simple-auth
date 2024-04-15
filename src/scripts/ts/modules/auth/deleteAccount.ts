export const deleteAccount = () => {
  localStorage.removeItem('simpleAuthUser');
  window.location.replace('/');
};
