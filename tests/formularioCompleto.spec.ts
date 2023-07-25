import { test, expect } from '@playwright/test';

test('fill the form 84.48', async ({ page }) => {

    function generarCedula(): string {
        let cedula = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        return cedula;
    }
      
    let cedula = generarCedula();
      
    await page.goto('https://168.176.84.48/sitio/accederServicio/acceder.action?periodo=105&servicio=357');
    await expect(page).toHaveTitle(/Dirección Nacional de Admisiones/);
    await page.getByLabel('', { exact: true }).check();
    await page.getByLabel('Tipo\n\t\t\t\t\t\tde documento*').selectOption('1');
    await page.getByLabel('Documento*', { exact: true }).click();
    await page.getByLabel('Documento*', { exact: true }).fill(cedula);
    await page.getByLabel('Documento*', { exact: true }).press('Tab');
    await page.getByLabel('Verifique\n\t\t\t\t\t\tel documento*').fill(cedula);
    await page.locator('#fechaExpDocumento').click();
    await page.getByRole('link', { name: '21' }).click();
    await page.getByLabel('Correo electrónico*', { exact: true }).click();
    await page.getByLabel('Correo electrónico*', { exact: true }).fill('a@a.com');
    await page.getByLabel('Confirme el correo electrónico*').click();
    await page.getByLabel('Confirme el correo electrónico*').fill('a@a.com');
    await page.locator('#botonIngresar').click();
    
    //await page.goto('https://168.176.84.48/sitio/web/pregrado?execution=e1s2');
    //await page.getByLabel('', { exact: true }).check();
    //await page.goto('https://168.176.84.48/sitio/web/pregrado?execution=e1s2');
    //page.on('dialog',  dialog => { dialog.accept(); });
    //     console.log(`Dialog message: ${dialog.message()}`);
    //     dialog.dismiss().catch(() => {});
    // });
    // setTimeout(async () => {
    //     await page.getByRole('button', { name: 'Ingresar' }).click();
    // }, 1500);
    // await page.getByRole('heading', { name: 'Verificación de correo' });
    // setTimeout(async () => {
    //     await page.getByRole('heading', { name: 'Verificación de correo' });
        // await page.getByLabel('Número de verificación:*').click();
    // }, 1500);
    
    //await expect(page.getByRole('heading', { name: 'Verificación de correo' }).textContent()).toBe('Verificación de correo');
    //await expect(page)
});