import { expect, test } from '@playwright/test';

import { Phoneinput } from './input.page.ts';

test('Pick country and fill valid phone', async ({ page }) => {
  const phoneinput = new Phoneinput(page);
  await phoneinput.goto();
  await phoneinput.countryPick('Albania (Shqipëri)');
  await phoneinput.fillPhone('12345');
  await phoneinput.countryPick('United States');
  //expeect
});
test('Pick country and fill invalid phone', async ({ page }) => {
  const phoneinput = new Phoneinput(page);
  await phoneinput.goto();
  await phoneinput.countryPick('Albania (Shqipëri)');
  await phoneinput.fillPhone('qwerty');
  //expect
});
test('scroll country list by arrows', async ({ page }) => {
  const phoneinput = new Phoneinput(page);
  const albania = page.locator('.iti__selected-flag');
  await phoneinput.goto();
  await phoneinput.countryListArrowScroll(3);
  await expect(albania).toHaveAttribute('title', 'Albania (Shqipëri): +355');
});
