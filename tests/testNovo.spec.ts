import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://168.176.84.48/sitio/selPeriodo!input.action');
  //await page.getByRole('link', { name: 'Proceed to 168.176.84.48 (unsafe)' }).click();
  await page.locator('#SelectPeriodo').selectOption('Pre');
  await page.getByPlaceholder('Año').click();
  await page.getByPlaceholder('Año').fill('20');
  await page.getByText('2024-01', { exact: true }).click();
  await page.getByRole('button', { name: 'Seleccionar' }).click();
});