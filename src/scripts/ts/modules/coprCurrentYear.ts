export const coprCurrentYear = () => {
  const copyrightYear = document.getElementById('current-year') as HTMLSpanElement;
  const date = new Date();

  copyrightYear.textContent = `${date.getFullYear()}`;
};
