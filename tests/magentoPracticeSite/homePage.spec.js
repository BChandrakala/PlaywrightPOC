// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pageObjects/magentoPracticeSite/homePagePO');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await test.step(`Printing Page URL ${await page.url()}`, async() => {
    console.log(await page.url());
  })
});

test.describe('Verify Home page elements', () => {

  test('Verify main content is displayed', async ({page}) => {
    const homePage = new HomePage(page);
    await expect(homePage.mainContent, 'Checking main content visibility').toBeVisible();
  });

});