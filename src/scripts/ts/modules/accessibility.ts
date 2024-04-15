export const accessibility = () => {
  const signinForm         = document.getElementById('signin-form') as HTMLFormElement;
  const signinFormElements = [...signinForm.elements] as HTMLElement[];
  const signinFormLinks    = [...signinForm.querySelectorAll('a')] as HTMLAnchorElement[];
  const signupForm         = document.getElementById('signup-form') as HTMLFormElement;
  const signupFormElements = [...signupForm.elements] as HTMLElement[];
  const signupFormLinks    = [...signupForm.querySelectorAll('a')] as HTMLAnchorElement[];
  const signupTip          = document.querySelector('.signup-tip') as HTMLDivElement;
  const signupTipBtn       = [document.querySelector('.signup-tip button')] as [HTMLButtonElement];
  const signinTip          = document.querySelector('.signin-tip') as HTMLDivElement;
  const signinTipBtn       = [document.querySelector('.signin-tip button')] as [HTMLButtonElement];

  const enableTabKey = (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      element.removeAttribute('tabindex');
    });
  };

  const disableTabKey = (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      element.setAttribute('tabindex', ' -1');
    });
  };

  const ariaShow = (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'false');
  };

  const ariaHide = (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  };

  if (document.body.classList.contains('signup-mode')) {
    enableTabKey(signinTipBtn);
    enableTabKey(signupFormElements);
    enableTabKey(signupFormLinks);

    disableTabKey(signupTipBtn);
    disableTabKey(signinFormElements);
    disableTabKey(signinFormLinks);

    ariaShow(signupForm);
    ariaShow(signinTip);
    ariaHide(signinForm);
    ariaHide(signupTip);

    signupTipBtn[0].setAttribute('aria-expanded', 'true');
    signinTipBtn[0].setAttribute('aria-expanded', 'false');

  } else {
    enableTabKey(signupTipBtn);
    enableTabKey(signinFormElements);
    enableTabKey(signinFormLinks);

    disableTabKey(signinTipBtn);
    disableTabKey(signupFormElements);
    disableTabKey(signupFormLinks);

    ariaShow(signinForm);
    ariaShow(signupTip);
    ariaHide(signupForm);
    ariaHide(signinTip);

    signupTipBtn[0].setAttribute('aria-expanded', 'false');
    signinTipBtn[0].setAttribute('aria-expanded', 'true');
  }
};
