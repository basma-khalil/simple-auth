export const validateForm = (formInputs: HTMLInputElement[]) => {
  const setErrMessage = (
    ErrMessageElement: HTMLParagraphElement,
    ErrMessage: string
  ) => {
    ErrMessageElement.textContent = ErrMessage;
  };

  const inputValidation = (
    input: HTMLInputElement,
    inputErrMessage: HTMLParagraphElement
  ) => setErrMessage(inputErrMessage, input.validationMessage);

  formInputs.forEach((input) => {
    inputValidation(input, <HTMLParagraphElement>input.nextElementSibling);
    input.addEventListener('input', (evt: Event) =>
      inputValidation(input, <HTMLParagraphElement>input.nextElementSibling)
    );
  });
};
