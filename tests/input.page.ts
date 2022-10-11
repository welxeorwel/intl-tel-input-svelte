import type { Locator, Page } from '@playwright/test';

export class Phoneinput {
  readonly page: Page;
  readonly telInput: Locator;
  readonly countyPickMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.telInput = page.locator('input');
    this.countyPickMenu = page.locator('div[class="iti__selected-flag"] div');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/');
  }

  async countryPick(country: string) {
    await this.countyPickMenu.nth(1).click();
    await this.page.locator('text=' + country).click();
  }

  async fillPhone(phone: string) {
    await this.telInput.fill(phone);
  }
}

// export async function inputHelper(country:string,number:string,page){
// const INPUT_PAGE = "http://localhost:5173/"
// await page.goto(INPUT_PAGE)
// const telInput = page.locator("input")
// await page.locator('div[class="iti__selected-flag"] div').nth(1).click()
// await page.locator('text='+country).click()
// await telInput.fill(number)
// }
