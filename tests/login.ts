import { Page } from '@playwright/test';
import { cookie } from './home';
const xpaths = require('./xpaths');

export const login = async (page:Page, whereAmI: string) => {
      await page.goto(process.env.URL_MUSEUM_HOME!);
      await cookie(page);
      await page.waitForLoadState('domcontentloaded');
      await page.getByRole('link', { name: 'Login'}).click();
      await fillInLogin(page);
      await page.getByRole('button', { name: 'Log in'}).click();
      await page.waitForURL(process.env.URL_MUSEUM_HOME!);
  }

const fillInLogin = async (page:Page) => {
await page.locator('#email').fill(process.env.LOGIN_MAIL!);
await page.locator('#wachtwoord').fill(process.env.LOGIN_PASSWORD!);
}