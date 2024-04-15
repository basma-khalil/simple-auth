import { isRegistered } from '../auth/isRegistered';
import { getUserData } from './getUserData';

export const updateImage = (evt: Event) => {
  if (!isRegistered()) return;

  const avatar = document.getElementById('avatar') as HTMLImageElement;
  const imgAlert = document.getElementById('img-alert') as HTMLParagraphElement;
  const input = evt.target as HTMLInputElement;
  const maxSize = 3000000;

  const userData: User = getUserData();

  imgAlert.textContent = '';

  if (!input.files) return;

  const img = input.files[0];

  if (img.size > maxSize) {
    imgAlert.textContent = `image is too big, Please select an image less than ${
      maxSize / 1000000
    } MB`;
    return;
  }
  avatar.src = URL.createObjectURL(img);

  const reader = new FileReader();
  reader.readAsDataURL(img);

  reader.addEventListener('load', () => {
    const delImgBtn = document.getElementById('remove') as HTMLButtonElement;
    const imgUrl = reader.result as string;

    userData.userThumb = imgUrl;
    delImgBtn.classList.remove('invisible');
    localStorage.setItem('simpleAuthUser', JSON.stringify(userData));
  });
};
