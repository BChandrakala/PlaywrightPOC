// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pageObjects/magentoPracticeSite/loginPagePO');
const testData = require('../../testData/magentoPracticeSite/testData.json');
const constants = require('../../constants/magentoPracticeSite/constants.json');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await test.step(`Navigated to Page URL ${await page.url()}`, async() => {
        console.log(await page.url());
    })
});

test.describe('Login', () => {

  test('Valid login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.signInLink.click();
    await loginPage.login(testData.loginPage['validEmail'], testData.loginPage['validPassword']);
    page.waitForLoadState('networkidle');
    await expect(loginPage.welcomeText).toHaveText(testData.loginPage['validWelcomeText']);
  });

  test('Invalid login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.signInLink.click();
    await loginPage.login(testData.loginPage['inValidEmail'], testData.loginPage['inValidPassword']);
    await expect(loginPage.errorMsg).toHaveText(constants.loginPage['invalidLoginMsg']);
  });

});