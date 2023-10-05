// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/FileDownload.html#google_vignette');
    await test.step(`Printing Page URL ${await page.url()}`, async() => {
    console.log(await page.url());
  })
});

test.describe('Include attachments to the report', () => {

    test('Attach page screenshot to the report', async ({page}, testInfo) => {
        // Take a screenshot
        const screenshot = await page.screenshot();
 
        // Add the screenshot to the report
        await testInfo.attach('Page Screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });
    });

    test('Attach full page screenshot to the report', async({page}, testInfo) => {

        // Take full page screenshot
        const screenshot = await page.screenshot({ fullPage: true });

        // Add the screenshot to the report
        await testInfo.attach('Full Page Screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });
    });

    test('Attach element screenshot to the report', async({page}, testInfo) => {

        // Take element screenshot
        const screenshot = await page.locator('div.panel:nth-child(4)').screenshot();

        // Add the screenshot to the report
        await testInfo.attach('Element Screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });

    });

    test('Attach downloaded file to the report', async({page}, testInfo) => {

        await page.locator('#pdfbox.form-control').type('testing pdf download');

        await page.locator('#createPdf.btn').click();

        // Take element screenshot
        const screenshot = await page.locator('div.panel:nth-child(4)').screenshot();

        // Add the screenshot to the report
        await testInfo.attach('Element Screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });

        // 2. Wait for the download
        const downloadPromise = page.waitForEvent('download');
        await page.locator('#pdf-link-to-download').click();
        const download = await downloadPromise;
 
        // 3. Add the PDF to the report
        const tmpPath = await download.path();
        // ^ AppData\Local\Temp\playwright-artifacts-KZfOpF\19df2a33-9f96-465a-acb5-3dc1b9041e71
        await testInfo.attach(download.suggestedFilename(), {
            path: tmpPath,
        });

    });




});