import { Page } from '@playwright/test';
const xpaths = require('./xpaths');

export const closePopUp = async (page:Page) => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    // await addToCollectionIf(page);
    const loginBug = await page.locator("xpath=//h1[text()='To save this work you need a Rijksstudio account']");
    if(loginBug && await loginBug.isVisible()) {
      await page.locator("xpath=//img[@alt='Preview of Rijksstudio']/following::button[contains(text(),'Close')][1]").click();
      // await addToCollectionIf(page);
    }
    const shareCollection = await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]");
    if(shareCollection && await shareCollection.isVisible()) {
      await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]/../following::button[contains(text(),'Close')][1]").click();
      // await addToCollectionIf(page);
    }
    const welcomeToRijksstudio = await page.locator("xpath=//h2[contains(text(),'Welcome to Rijksstudio')]");
    if(welcomeToRijksstudio && await welcomeToRijksstudio.isVisible()) {
      await page.locator("xpath=//h2[contains(text(),'Welcome to Rijksstudio')]/../following::button[contains(text(),'Close')][1]").click();
    }
    const addedToSet = await page.locator("xpath=//h2[contains(text(),'work is added to the set')]");
    if(addedToSet && await addedToSet.isVisible()) {
      await page.getByRole('button', { name: 'Close' }).click();
    }
  }