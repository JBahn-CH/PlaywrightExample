import { test, } from '@playwright/test';
import { login } from './login';
import { uploadNewProfilePic, validateProfilePicUpload } from './myprofile';


test('task3_uploadProfilePicture', async ({ page }) => {
  const profilePicName = 'sbb-logo.png';
  const profilePicNameDefault = 'sheldon.png'
  await login(page, 'Home');
  await uploadNewProfilePic(page, profilePicName);
  await validateProfilePicUpload(page, profilePicName);
  /*await uploadNewProfilePic(page, profilePicNameDefault);
  await validateProfilePicUpload(page, profilePicNameDefault); */
});