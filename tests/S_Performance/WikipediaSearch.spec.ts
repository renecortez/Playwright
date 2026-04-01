import { test, expect } from '@playwright/test';

test('test wikipedia', async ({ page }) => {
  await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');

  // Checkpoint: Portada loaded
  await expect(page).toHaveURL(/\/wiki\/Wikipedia:Portada/);
  await expect(page.getByRole('searchbox', { name: 'Buscar en Wikipedia' })).toBeVisible();

  // Buscar Michael Jackson
  await page.getByRole('searchbox', { name: 'Buscar en Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Buscar en Wikipedia' }).fill('Michael Jackson');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Checkpoint: Michael Jackson article
  await expect(page).toHaveURL(/Michael_Jackson/);
  await expect(page.getByRole('heading', { name: /Michael Jackson/i })).toBeVisible();

  // Click on 'Premios y logros'
  await page.getByRole('link', { name: 'Premios y logros' }).click();

  // Checkpoint: Premios y logros section
  await expect(page.locator('h2, h3')).toContainText(['Premios y logros']);

  // Buscar Michael Jordan
  await page.getByRole('searchbox', { name: 'Buscar en Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Buscar en Wikipedia' }).fill('Michael Jordan');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Checkpoint: Michael Jordan article
  await expect(page).toHaveURL(/Michael_Jordan/);
  await expect(page.getByRole('heading', { name: /Michael Jordan/i })).toBeVisible();

  // Click on 'Logros y reconocimientos'
  await page.getByRole('link', { name: 'Logros y reconocimientos' }).click();

  // Checkpoint: Logros y reconocimientos section
  await expect(page.locator('h2, h3')).toContainText(['Logros y reconocimientos']);

  await page.getByRole('link', { name: 'Inicio' }).click();
  // Checkpoint: Back to Portada  
  await expect(page.getByRole('link', { name: 'Wikipedia La enciclopedia' })).toBeVisible();
  await page.getByRole('link', { name: 'Wikipedia La enciclopedia' }).click();
  await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - link "Wikipedia La enciclopedia libre":
      - /url: /wiki/Wikipedia:Portada
      - img "Wikipedia"
      - img "La enciclopedia libre"
    `);

});