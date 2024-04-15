export const toggleMenu = () => {
  const menu = document.getElementById('menu') as HTMLDivElement;
  const firstFocusableElement = document.getElementById(
    'menu-btn'
  ) as HTMLButtonElement;
  const lastFocusableElement = document.getElementById(
    'delete-acc'
  ) as HTMLButtonElement;

  const focusTrap = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      if (evt.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          evt.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          evt.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  };
    document.removeEventListener('keydown', focusTrap);

  menu.classList.toggle('show');
  if (menu.classList.contains('show')) {
    firstFocusableElement.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', focusTrap);
  } else {
    firstFocusableElement.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', focusTrap);
  }
};
