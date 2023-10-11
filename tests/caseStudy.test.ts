import { test, expect, request, } from '@playwright/test';
import { fail } from 'assert';
import { login, searchArt, closePopUp } from './functions';

type searchResults = {
  count: number;
}

test('task1_1_UI', async ({ page }) => {
  await searchArt(page, 'Maker Rembrandt van Rijn');
  const searchResult = await page.locator("xpath=//p[@class='search-results-count']").textContent();
  const match = searchResult.match(/\((\d+)\s+results\)/);
  const anzahl = parseInt(match[1]);
  if(anzahl < 10){
    console.error('Die Suche hat weniger als 10 Resultate ergeben.')
    fail('Die Suche hat weniger als 10 Resultate ergeben.');
  }
});

test('task1_1_API', async ({ request }) => {
  const status = await request.get('https://www.rijksmuseum.nl/api/nl/collection?key=7mzKrt0r&involvedMaker=Rembrandt+van+Rijn');
  const response = JSON.parse(await status.text());
  expect(status.ok()).toBeTruthy();
  if(response.count < 10) {
    console.error('Die Suche hat weniger als 10 Resultate ergeben.')
    fail('Die Suche hat weniger als 10 Resultate ergeben.');
  }
});

test('task1_2_UI', async ({ page }) => {
  await searchArt(page, 'Hilversum')
  await page.locator("xpath=//h2[contains(text(),'Works of art')]//following-sibling::a").click();
  await page.getByText('Advanced search').click();
  await page.getByPlaceholder('Start year').fill('1600');
  await page.getByPlaceholder('End year').fill('1700');
  await page.locator("xpath=//input[@id='token-input-QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_Material']").click();
  await page.keyboard.type('canvas');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');
  await page.locator("xpath=//input[@id='advanced-search-field']").focus();
  await page.keyboard.press('Enter');
  await page.getByText('The Feast of St Nicholas').click();
});

test('task1_2_API', async ({ request }) => {
const status = await request.get('https://www.rijksmuseum.nl/api/en/collection?key=7mzKrt0r&material=canvas&q=Hilversum&f.dating.period=17');
const response = JSON.parse(await status.text());
expect(status.ok()).toBeTruthy();
if(response.artObjects[0].longTitle != 'The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668') {
console.error('Das gesuchte Bild wurde nicht gefunden')
  fail('Das Kunstwerk The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668 wurde nicht gefunden');
}
});

test('task1_3_UI', async ({ page }) => {
  const status = await request.get('https://www.rijksmuseum.nl/api/en/collection?key=7mzKrt0r&material=canvas&q=Hilversum&f.dating.period=17');
  const response = JSON.parse(await status.text());
  expect(status.ok()).toBeTruthy();
  if(response.artObjects[0].longTitle != 'The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668') {
  console.error('Das gesuchte Bild wurde nicht gefunden')
    fail('Das Kunstwerk The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668 wurde nicht gefunden');
  }
  });

  test('task2_UI', async ({ page }) => {
    await login(page);
    await searchArt(page, 'Maker Rembrandt van Rijn');
    await page.locator("xpath=//h2[contains(text(),'Works of art')]//following-sibling::a").click();
    for(let i = 0; i <= 2; ++i) {
      await page.locator("xpath=//figure[@data-item-index="+i+"]").hover();
      await page.locator("xpath=//figure[@data-item-index="+i+"]//following-sibling::a[@data-button='button-icon button-fav-no']").click();
      await closePopUp(page);    
    }
    await page.goto('https://www.rijksmuseum.nl/en/rijksstudio/4463427--joel-hirano/collections?ii=0');
    const works = await page.locator("//p[@class='text-subtle']//span[contains(text(),'3 works')]");
    if(works) {
      await console.log('Test sucessfull');
    } else {
      fail('The test has failed');
    }
    });