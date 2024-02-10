import { coprCurrentYear } from '../src/scripts/ts/modules/coprCurrentYear';

describe('loggedHeader functions', () => {
  document.body.innerHTML = `
    <span id="current-year"></span>
  `;

  it('Should display the current year in the footer copyright', () => {
    coprCurrentYear();

    const copyrightYear = document.getElementById('current-year') as HTMLSpanElement;
    const currentYear   = new Date().getFullYear();

    expect(copyrightYear.textContent).toBe(`${currentYear}`);
  });
});
