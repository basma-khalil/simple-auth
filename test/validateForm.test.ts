import { validateForm } from '../src/scripts/ts/modules/auth/validateForm';

describe('validateForm functions', () => {
  it('Should display the error message if the input value is empty', () => {
    document.body.innerHTML = `
      <input id="input" type="text" value="" required />
      <p></p>
    `;

    const input = document.getElementById('input') as HTMLInputElement;
    const errParagraph = input.nextElementSibling as HTMLParagraphElement;

    validateForm([input]);
    const errMessage = input.validationMessage;

    expect(errParagraph.textContent).toBe(errMessage);
  });

  it('Should display no error message if the input value is not empty', () => {
    document.body.innerHTML = `
      <input id="input" type="text" value="test" required />
      <p></p>
    `;

    const input = document.getElementById('input') as HTMLInputElement;
    const errParagraph = input.nextElementSibling as HTMLParagraphElement;

    validateForm([input]);

    expect(errParagraph.textContent).toBe('');
  });

  it('Should display the error message if the email input value is not invalid', () => {
    document.body.innerHTML = `
      <input id="input" type="email" value="test" />
      <p></p>
    `;

    const input = document.getElementById('input') as HTMLInputElement;
    const errParagraph = input.nextElementSibling as HTMLParagraphElement;

    validateForm([input]);
    const errMessage = input.validationMessage;

    expect(errParagraph.textContent).toBe(errMessage);
  });

  it('Should display no error message if the email input value is valid', () => {
    document.body.innerHTML = `
      <input id="input" type="email" value="test@test.com" />
      <p></p>
    `;

    const input = document.getElementById('input') as HTMLInputElement;
    const errParagraph = input.nextElementSibling as HTMLParagraphElement;

    validateForm([input]);

    expect(errParagraph.textContent).toBe('');
  });
});
