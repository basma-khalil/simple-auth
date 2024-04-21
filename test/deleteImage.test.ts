import '@testing-library/jest-dom';
import { deleteImage } from '../src/scripts/ts/modules/user/deleteImage';

describe('deleteImage functions', () => {
  document.body.innerHTML = `
    <img id="avatar" src="" />
    <button id="remove">Delete</button>
  `;
  const defaultImg = '/images/user.svg';
  const user: User = {
    userName: 'user name',
    userEmail: 'user email',
    userPassword: 'user password',
    userThumb: 'user thumb',
    isLogged: true,
  };
  localStorage.setItem('simpleAuthUser', JSON.stringify(user));

  it('Should update the avatar image src to the default image url', () => {
    deleteImage();

    const avatar = document.getElementById('avatar') as HTMLImageElement;

    expect(avatar).toHaveAttribute('src', defaultImg);
  });

  it('Should add "invisible" to the delete image button class', () => {
    deleteImage();

    const delImgBtn = document.getElementById('remove') as HTMLButtonElement;

    expect(delImgBtn).toHaveClass('invisible');
  });

  it('Should update the simpleAuthUser userThumb key to the default image url', () => {
    deleteImage();

    const userData: User = JSON.parse(
      localStorage.getItem('simpleAuthUser') as string
    );

    expect(userData.userThumb).toEqual(defaultImg);
  });
});
