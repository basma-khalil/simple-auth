import { accessibility } from './accessibility';

export const switchMood = () => {
  const body = document.body as HTMLBodyElement;
  body.classList.toggle('signup-mode');
  accessibility();
};
