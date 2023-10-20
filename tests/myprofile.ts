import { Page } from '@playwright/test';
const xpaths = require('./xpaths');


export const deleteArtSet = async (page:Page) => {
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForTimeout(1000);
    await page.locator("xpath=//a[@data-role='edit-set']").click();
    await page.locator("//button[@data-role='set-delete']").click();
    await page.getByRole('button', { name: 'Yes, delete' }).click();
  }