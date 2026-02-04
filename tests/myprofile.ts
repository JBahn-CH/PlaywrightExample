import { Page } from '@playwright/test';
import { closePopUp } from './popups';
import { fail } from 'assert';
const xpaths = require('./xpaths');


export const deleteArtSet = async (page:Page) => {
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForTimeout(1000);
    await page.locator("xpath=//a[@data-role='edit-set']").click();
    await page.locator("//button[@data-role='set-delete']").click();
    await page.getByRole('button', { name: 'Yes, delete' }).click();
  }

export const uploadNewProfilePic = async (page:Page, profilePicName: string) => {
  await page.goto(process.env.URL_MUSEUM_MYPROFILE!);
  //await closePopUp(page);
  await page.locator('input[type="file"]').setInputFiles(process.env.IMG_PATH!+profilePicName);
  await page.locator('#upload-file-button').click();
  await page.waitForSelector('.jcrop-tracker', { state: 'visible' });
  await page.waitForTimeout(5000);
  await page.locator(xpaths.profile_settings_profile_pic_save).click();
}

export const validateProfilePicUpload = async (page:Page, profilePicNameExpected: string) => {
  const profilePicNameElement = await page.$("xpath=//span[@data-role='upload-input']");
  const profilePicName = await profilePicNameElement?.textContent();
  const matches = profilePicName?.match(/\b([\w.-]+\.png)\b/g);
  if(!matches ||matches[0] !== profilePicNameExpected) {
    fail('Das Profilbild wurde nicht geändert');
  }
}
