import { expect,test } from '@playwright/test';

import { Phoneinput } from './input.page.ts';

test('pick country test', async ({ page }) => {
  const phoneinput = new Phoneinput(page);
  await phoneinput.goto();
  await phoneinput.countryPick('Albania (Shqipëri)');
  await phoneinput.fillPhone('12345');
});
