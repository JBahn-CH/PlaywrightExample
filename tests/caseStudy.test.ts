import { test, expect, request, } from '@playwright/test';
import { fail } from 'assert';
import { login, searchArt, closePopUp, cookie } from './functions';
const xpaths = require('./xpaths');
const { DateTime } = require('luxon');

type searchResults = {
  count: number;
}

test('task1_1_UI', async ({ page }) => {
  await searchArt(page, 'Maker Rembrandt van Rijn');
  const searchResult = await page.locator(xpaths.search_results).textContent();
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
  await page.locator(xpaths.search_results_view_all).click();
  await page.getByText('Advanced search').click();
  await page.getByPlaceholder('Start year').fill('1600');
  await page.getByPlaceholder('End year').fill('1700');
  await page.locator(xpaths.advanced_search_material).click();
  await page.keyboard.type('canvas');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');
  await page.locator(xpaths.advanced_search_searchbar).focus();
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

test('task2_UI', async ({ page }) => {
  await login(page);
  await searchArt(page, 'Maker Rembrandt van Rijn');
  await page.locator(xpaths.search_results_view_all).click();
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

test('task3_addProductToShoppingCart', async ({ page }) => {
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await page.locator(xpaths.open_giftshop_home).click();
  await cookie(page);
  await page.locator(xpaths.select_mizuno_category_giftshop).click();
  await page.locator(xpaths.open_product_mizuno_wave_rider_27).click();
  await page.locator(xpaths.add_product_to_shopping_cart).click();
  await page.locator(xpaths.view_shopping_cart).click();
  await page.locator("xpath=//div[contains(text(),'€171.75')]").isVisible();
});

test('task3_addTicketToShoppingCart', async ({ page }) => {
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await page.locator(xpaths.select_ticketshop_button).click();
  await page.locator(xpaths.add_adult_ticket_button).click();
  await page.locator(xpaths.continue_Button_TicketShop).click();
  await page.locator(xpaths.select_ticket_tour_option).click();
  const currentDate = await DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });
  await page.locator("xpath=//button[@aria-label='"+currentDate+"']").click();
  await page.locator(xpaths.select_last_timeslot_tour).click();
  await page.locator(xpaths.continue_Button_TicketShop).click();
  await page.locator(xpaths.input_FirstName_TicketForm).fill('Guenter');
  await page.locator(xpaths.input_LastName_TicketForm).fill('Jauch');
  await page.locator(xpaths.input_Email_TicketForm).fill('guenter.jauch@yopmail.com');
  await page.locator(xpaths.input_Email_Conf_TicketForm).fill('guenter.jauch@yopmail.com');
  await page.locator(xpaths.checkBox_Terms_Conditions).click();
  await page.locator(xpaths.continue_Button_TicketShop).click();
  await page.locator(xpaths.title_Payment_Methods).isVisible();
});