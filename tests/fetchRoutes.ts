import { Page } from '@playwright/test';

export const catchRoute = async (page:Page) => {
    await page.route('**/rijksstudio/my/profile', async (route) => {
    
    // 2. Die echte Antwort vom Server holen
    const response = await route.fetch();
    let body = await response.text();

    // 3. Den spezifischen Wert im HTML-String suchen und ersetzen
    // Wir ändern die E-Mail zu einer "Fake"-Adresse für die Demo
    body = body.replace(
      'value="joel.hirano@sbb.ch"', 
      'value="MOCKED_EMAIL_FOR_DEMO@sbb.ch"'
    ).replace(
        /<h1[^>]*>\s*Settings\s*<\/h1>/g, 
        '<h1>You have been hijacked</h1>'
      );

    // 4. Die modifizierte Antwort an den Browser senden
    await route.fulfill({
      response,
      body
    });
  });
  }