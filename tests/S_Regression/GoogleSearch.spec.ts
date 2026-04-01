import { test, expect } from '@playwright/test';

test('Test GoogleSearch', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Buscar' }).click();
  await page.getByRole('combobox', { name: 'Buscar' }).fill('A cuanto esta el dolar');
  await page.getByRole('combobox', { name: 'Buscar' }).press('Enter');
  await expect(page.getByText('About this page')).toBeVisible();
  await expect(page.getByText('About this page Our systems')).toBeVisible();

});