import { test, expect } from '@playwright/test';

const setToken = async (page: any) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('user_token', 'test-token');
  });
};

test.describe('Admin CRUD pages', () => {
  test('users CRUD flow (create → edit → delete)', async ({ page, baseURL }) => {
    await setToken(page);
    const base = baseURL ?? 'http://localhost:3000';
    await page.goto(base + '/admin/users');
    await expect(page.locator('h1')).toHaveText(/Utilisateurs|Users/);

    const unique = Date.now();
    const name = `Test User ${unique}`;
    const email = `test.user.${unique}@example.com`;

    await page.click('text=Créer un utilisateur');
    await page.fill('input[placeholder="Nom"]', name);
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Mot de passe (laisser vide pour garder)"]', 'secret123');
    await page.click('button:has-text("Créer")');

    // Wait for row with email
    const row = page.locator('table tbody tr', { hasText: email });
    await expect(row).toHaveCount(1);

    // Edit
    await row.locator('button:has-text("Éditer")').click();
    const newName = name + ' Edited';
    await page.fill('input[placeholder="Nom"]', newName);
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('table tbody tr', { hasText: newName })).toHaveCount(1);

    // Delete
    page.once('dialog', dialog => dialog.accept());
    await page.locator('table tbody tr', { hasText: newName }).locator('button:has-text("Supprimer")').click();
    await expect(page.locator('table tbody tr', { hasText: newName })).toHaveCount(0);
  });

  test('services CRUD flow (create → edit → delete)', async ({ page, baseURL }) => {
    await setToken(page);
    const base = baseURL ?? 'http://localhost:3000';
    await page.goto(base + '/admin/services');
    await expect(page.locator('h1')).toHaveText(/Services/);

    const unique = Date.now();
    const title = `Service ${unique}`;

    await page.click('text=Créer un service');
    await page.fill('input[placeholder="Titre"]', title);
    await page.fill('input[placeholder="Prix"]', '99');
    await page.fill('textarea[placeholder="Description"]', 'Desc');
    await page.click('button:has-text("Créer")');

    const row = page.locator('table tbody tr', { hasText: title });
    await expect(row).toHaveCount(1);

    // Edit
    await row.locator('button:has-text("Éditer")').click();
    const newTitle = title + ' Updated';
    await page.fill('input[placeholder="Titre"]', newTitle);
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('table tbody tr', { hasText: newTitle })).toHaveCount(1);

    // Delete
    page.once('dialog', dialog => dialog.accept());
    await page.locator('table tbody tr', { hasText: newTitle }).locator('button:has-text("Supprimer")').click();
    await expect(page.locator('table tbody tr', { hasText: newTitle })).toHaveCount(0);
  });

  test('quotes CRUD flow (create → edit → delete)', async ({ page, baseURL }) => {
    await setToken(page);
    const base = baseURL ?? 'http://localhost:3000';
    await page.goto(base + '/admin/quotes');
    await expect(page.locator('h1')).toHaveText(/Devis/);

    const unique = Date.now();
    const title = `Quote ${unique}`;
    const email = `quote.user.${unique}@example.com`;

    await page.click('text=Créer un devis');
    await page.fill('input[placeholder="Titre"]', title);
    await page.fill('input[placeholder="Email utilisateur"]', email);
    await page.fill('textarea[placeholder="Contenu"]', 'Quote body');
    await page.click('button:has-text("Créer")');

    const row = page.locator('table tbody tr', { hasText: title });
    await expect(row).toHaveCount(1);

    // Edit
    await row.locator('button:has-text("Éditer")').click();
    const newTitle = title + ' Updated';
    await page.fill('input[placeholder="Titre"]', newTitle);
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('table tbody tr', { hasText: newTitle })).toHaveCount(1);

    // Delete
    page.once('dialog', dialog => dialog.accept());
    await page.locator('table tbody tr', { hasText: newTitle }).locator('button:has-text("Supprimer")').click();
    await expect(page.locator('table tbody tr', { hasText: newTitle })).toHaveCount(0);
  });
});
