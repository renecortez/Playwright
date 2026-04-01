const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Go to Wikipedia in Spanish
  await page.goto('https://es.wikipedia.org/');

  // Search for "Michael Jackson"
  await page.fill('input[name="search"]', 'Michael Jackson');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  // Click on the first menu (e.g., "Portada")
  await page.click('#p-navigation .vector-menu-content-list li a');
  await page.waitForLoadState('networkidle');

  // Search for "Michael Jordan"
  await page.fill('input[name="search"]', 'Michael Jordan');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  // Click on the first menu again
  await page.click('#p-navigation .vector-menu-content-list li a');
  await page.waitForLoadState('networkidle');

  // Close browser
  await browser.close();
})();
