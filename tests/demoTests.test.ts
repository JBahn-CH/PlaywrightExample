import { test, expect } from '@playwright/test';
import { login } from './login';
import { uploadNewProfilePic, validateProfilePicUpload } from './myprofile';
import { catchRoute } from './fetchRoutes';


test('uploadProfilePicture', async ({ page }) => {
  // Testdaten/Bilder definieren
  const profilePicName = 'sbb-logo.png';
  const profilePicNameDefault = 'sheldon.png'

  // 1. Browser öffnen, website aufrufen und einloggen
  await login(page, 'Home');

  // 2. Profilbild ändern
  await uploadNewProfilePic(page, profilePicName);

  // 3. Prüfen, ob das Profilbild geändert wurde
  await validateProfilePicUpload(page, profilePicName);

  // 4. Neues Profilbild hochladen
  await uploadNewProfilePic(page, profilePicNameDefault);

  // 5. Prüfen, ob das Profilbild zurückgesetzt wurde
  await validateProfilePicUpload(page, profilePicNameDefault);
});

test('Mock backend response', async ({ page }) => {
  await login(page, 'Home');
  // 1. Route abfangen, die das Profil-HTML lädt
  await catchRoute(page);

  // Jetzt die Seite aufrufen
  await page.goto(process.env.URL_MUSEUM_MYPROFILE!);

  // Prüfen, ob der Titel geändert wurde
  const mainTitle = page.locator('h1');
  await expect(mainTitle).toHaveText('You have been hijacked');

  // Prüfen, UI zeigt nun den gemockten Wert an
  const emailInput = page.locator('#email');
  await expect(emailInput).toHaveValue('MOCKED_EMAIL_FOR_DEMO@sbb.ch');
});