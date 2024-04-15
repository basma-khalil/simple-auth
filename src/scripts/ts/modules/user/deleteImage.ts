import { getUserData } from './getUserData';

export const deleteImage = () => {
  const avatar = document.getElementById('avatar') as HTMLImageElement;
  const delImgBtn = document.getElementById('remove') as HTMLButtonElement;
  const userData: User = getUserData();
  const defaultImg = '/images/user.svg';

  avatar.src = defaultImg;
  delImgBtn.classList.add('invisible');
  userData.userThumb = defaultImg;
  localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
};
