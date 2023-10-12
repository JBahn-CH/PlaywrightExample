import { Page } from '@playwright/test';

const xpaths = require('./xpaths');

export const searchArt = async (page:Page, searchObject) => {
    await page.getByLabel('Search').click();
    await page.waitForLoadState();
    await page.getByPlaceholder('For info, artist, guided tour or more').fill(searchObject);
    await page.keyboard.press('Enter');
}

export const login = async (page:Page) => {
    await page.goto(process.env.URL_MUSEUM_HOME!);
    await cookie(page);
    await page.locator(xpaths.login_home_header).click();
    await page.waitForSelector(xpaths.login_submit_button);
    await page.locator(xpaths.login_email_input).fill(process.env.LOGIN_MAIL!);
    await page.locator(xpaths.login_password_input).fill(process.env.LOGIN_PASSWORD!);
    await page.locator(xpaths.login_submit_button).click();
    await page.waitForURL(process.env.URL_MUSEUM_HOME!);
}

export const cookie = async (page:Page) => {
  const cookieUsageStart = await page.locator('text=No, rather not');
    if (cookieUsageStart && await cookieUsageStart.isVisible()) {
      await cookieUsageStart.click();
    }
    await page.waitForTimeout(500);
  const cookieUsageGiftshop = await page.locator("xpath=//p[@class='title' and contains(text(), 'COOKIE USAGE')]");
    if(cookieUsageGiftshop && await cookieUsageGiftshop.isVisible()) {
      await page.locator("xpath=//a[contains(@class,'cookie-permission--accept-button')]").click();
    }
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