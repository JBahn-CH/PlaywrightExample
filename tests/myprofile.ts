import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
const xpaths = require('./xpaths');

export const uploadNewProfilePic = async (page:Page, profilePicName: string) => {
  await page.goto(process.env.URL_MUSEUM_MYPROFILE!);
  await page.locator('input[type="file"]').setInputFiles(process.env.IMG_PATH!+profilePicName);
  await page.locator('#upload-file-button').click();
  await page.waitForSelector('.jcrop-tracker', { state: 'visible' });
  await page.locator(xpaths.profile_settings_profile_pic_save).click();
}

export const validateProfilePicUpload = async (page:Page, profilePicNameExpected: string) => {
  const feedback = page.locator('[data-role="feedback-balloon"]');
  await expect(feedback).toBeVisible();
  await expect(feedback).toContainText('Your avatar is updated');

  /*const profilePicNameElement = await page.$("xpath=//span[@data-role='upload-input']");
  const profilePicName = await profilePicNameElement?.textContent();
  const matches = profilePicName?.match(/\b([\w.-]+\.png)\b/g);
  if(!matches ||matches[0] !== profilePicNameExpected) {
    fail('Das Profilbild wurde nicht geändert');
  }*/
}
