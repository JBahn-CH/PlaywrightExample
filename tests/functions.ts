import { Page } from '@playwright/test';

export const searchArt = async (page:Page, searchObject) => {
    await page.getByLabel('Search').click();
    await page.waitForLoadState();
    await page.getByPlaceholder('For info, artist, guided tour or more').fill(searchObject);
    await page.keyboard.press('Enter');
}

export const login = async (page:Page) => {
    await page.goto('https://www.rijksmuseum.nl/en');
    const noThanksButton = await page.locator('text=No, rather not');
    if (noThanksButton) {
      await noThanksButton.click();
    }
    await page.locator("//ul[@class='header-links header-options']//a//span[contains(text(), 'Login')]").click();
    await page.waitForSelector("xpath=//button[@type='submit']");
    await page.locator("xpath=//input[@id='email']").fill(process.env.LOGIN_MAIL!);
    await page.locator("xpath=//input[@id='wachtwoord']").fill(process.env.LOGIN_PASSWORD!);
    await page.locator("xpath=//button[@type='submit']").click();
    await page.waitForURL('https://www.rijksmuseum.nl/en');
}

export const closePopUp = async (page:Page) => {
  await page.waitForTimeout(1000);
  await addToCollectionIf(page);
  const loginBug = await page.locator("xpath=//h1[text()='To save this work you need a Rijksstudio account']");
  if(loginBug && await loginBug.isVisible()) {
    await page.locator("xpath=//img[@alt='Preview of Rijksstudio']/following::button[contains(text(),'Close')][1]").click();
    await addToCollectionIf(page);
  }
  const shareCollection = await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]");
  if(shareCollection && await shareCollection.isVisible()) {
    await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]/../following::button[contains(text(),'Close')][1]").click();
    await addToCollectionIf(page);
  }
}

const addToCollectionIf = async (page:Page) => {
  const addToCollection = await page.locator("xpath=//a[text()='My first collection']");
  if(addToCollection && await addToCollection.isVisible()) {
    await page.locator("xpath=//a[text()='My first collection']").click();
    await page.waitForTimeout(2000);
    const workAddedButton = await page.locator("xpath=//h2[contains(text(), 'The work is added')]");
    if(workAddedButton && await workAddedButton.isVisible()) {
      await page.locator("xpath=//div[@class='box bg-lighter offset-parent']//following-sibling::button").click();
      await addToCollectionIf(page);
    }
  }
}