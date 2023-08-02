import { test, expect } from '@playwright/test';

test('fill the form 84.48', async ({ page }) => {

    // *-------------------------------------------------------------------* //
    // ENTRNAOD A LA PAGINA DEL FORMULARIO Y LLENANDO LA PRIMERA PAERTE
    await page.goto('https://168.176.84.48/sitio/accederServicio/acceder.action?periodo=105&servicio=357');

    // # Seleccion del radio select
    await page.getByLabel('', { exact: true }).check();

    // # Eleguir tipo de documento
    await page.getByLabel('Tipo\n\t\t\t\t\t\tde documento*').selectOption('1');

    // # Llenar el documento
    await page.getByLabel('Documento*', { exact: true }).click();
    await page.getByLabel('Documento*', { exact: true }).fill('1000468813');
    await page.getByLabel('Documento*', { exact: true }).press('Tab');

    // # Confirmar el documento 
    await page.getByLabel('Verifique\n\t\t\t\t\t\tel documento*').fill('1000468813');

    // # Seleccionar fecha de expedicion del documento
    await page.locator('#fechaExpDocumento').click();
    await page.getByRole('link', { name: '1', exact: true }).click();

    // # Llenar correo electronico
    await page.getByLabel('Correo electrónico*', { exact: true }).click();
    await page.getByLabel('Correo electrónico*', { exact: true }).fill('omar@a.com');

    // # Confirmar correo electronico
    await page.getByLabel('Confirme el correo electrónico*').click();
    await page.getByLabel('Confirme el correo electrónico*').fill('omar@a.com');

    // # Click en el boton ingresar
    page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Ingresar' }).click();
    
    // *-------------------------------------------------------------------* //
    // LLENANDO LA SEGUNDA PARTE DEL FORMULARIO
    
});