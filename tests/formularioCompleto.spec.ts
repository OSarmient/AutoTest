import { test, expect } from '@playwright/test';

test('fill the form 84.48', async ({ page }) => {

    function generarCedula(): string {
        let cedula = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        return cedula;
    }
      
    let cedula = generarCedula();
      

    // *-------------------------------------------------------------------* //
    // ENTRNAOD A LA PAGINA DEL FORMULARIO Y LLENANDO LA PRIMERA PAERTE
    await page.goto('https://168.176.84.48/sitio/accederServicio/acceder.action?periodo=105&servicio=357');

    // # Seleccion del radio select
    await expect(page).toHaveTitle(/Dirección Nacional de Admisiones/);
    await page.getByLabel('', { exact: true }).check();

    // # Eleguir tipo de documento
    await page.getByLabel('Tipo\n\t\t\t\t\t\tde documento*').selectOption('1');

    // # Llenar el documento
    await page.getByLabel('Documento*', { exact: true }).click();
    await page.getByLabel('Documento*', { exact: true }).fill(cedula);
    await page.getByLabel('Documento*', { exact: true }).press('Tab');

    // # Confirmar el documento 
    await page.getByLabel('Verifique\n\t\t\t\t\t\tel documento*').fill(cedula);

    // # Seleccionar fecha de expedicion del documento
    await page.locator('#fechaExpDocumento').click();
    await page.getByRole('link', { name: '1', exact: true }).click();

    // # Llenar correo electronico
    await page.getByLabel('Correo electrónico*', { exact: true }).click();
    await page.getByLabel('Correo electrónico*', { exact: true }).fill('a@a.com');

    // # Confirmar correo electronico
    await page.getByLabel('Confirme el correo electrónico*').click();
    await page.getByLabel('Confirme el correo electrónico*').fill('a@a.com');

    // # Click en el boton ingresar
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Ingresar' }).click();
    
    // *-------------------------------------------------------------------* //
    // LLENANDO LA SEGUNDA PARTE DEL FORMULARIO NUMERO DE VERIFICACION
    
    // # Obtencion del numero de verificacion
    const numero = await page.innerText('#numeroCorrecto');
    
    // # Llenado del campo numero de verificacion
    await page.getByLabel('Número de verificación:*').click();
    await page.getByLabel('Número de verificación:*').fill(numero);

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA TERCERA PARTE DEL FORMULARIO FORMA DE PAGO

    // # Seleccionar la forma de pago
    await page.getByText('Pago en Banco Popular').click();

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA CUARTA PARTE DEL FORMULARIO PIN

    // # Genera un PIN aleatorio
    function generatePin() {
        const randomNum = Math.floor(Math.random() * 150) + 1; // genera un número aleatorio entre 1 y 150
        return 'PRU' + randomNum;
    }
    
    const pin = generatePin();

    // # Llenar el campo PIN
    await page.getByLabel('PIN *', { exact: true }).click();
    await page.getByLabel('PIN *', { exact: true }).fill(pin);

    // # Confirmar el campo PIN
    await page.getByLabel('Ingrese\n\t\t\t\t\t\tnuevamente su PIN *').click();
    await page.getByLabel('Ingrese\n\t\t\t\t\t\tnuevamente su PIN *').fill(pin);

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // # Click en el boton aceptar en un pop up
    await page.getByRole('button', { name: 'Aceptar' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA QUINTA PARTE DEL FORMULARIO NORMATIVA

    // # Click en el boton acepto
    await page.getByRole('button', { name: 'Acepto', exact: true }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA SEXTA PARTE DEL FORMULARIO TIPO DE ADMISION

    // # Seleccionar el tipo de admision
    await page.getByText('Regular', { exact: true }).click();

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA SEPTIMA PARTE DEL FORMULARIO SEDE

    // # Seleccionar la sede
    await page.getByText('Bogotá.').click();

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA OCTAVA PARTE DEL FORMULARIO LUAGAR DE PRESENTACION DE LA PRUEBA

    // # Seleccionar el lugar de residencia
    await page.getByLabel('Departamento de residencia *').selectOption('11');

    // Esperar a que las opciones del segundo select se carguen
    await page.waitForTimeout(500);  // Ajusta el tiempo de espera según sea necesario

    // Ahora que las opciones deberían estar cargadas, selecciona la opción deseada
    await page.getByLabel('Ciudad de residencia *').selectOption('5');

    // # Seleccionar el lugar de presentacion de la prueba
    await page.getByLabel('País *').selectOption('170');
    await page.getByLabel('Ciudad de presentación *').selectOption('109735');

    // # Click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente',  exact: true  }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA NOVENA PARTE DEL FORMULARIO INFORMACION PERSONAL

    function seleccionarNombreAleatorio(): string {
        const nombres = ['Omar', 'Gustavo', 'Daniel', 'Nicole', 'Yeison', 'Erick'];
        const indiceAleatorio = Math.floor(Math.random() * nombres.length);
        return nombres[indiceAleatorio];
    }

    function seleccionarApellidoAleatorio(): string {
        const apellidos = ['Sarmiento', 'Mojica', 'Villamor', 'Ramirez', 'Cuervo', 'Sanchez'];
        const indiceAleatorio = Math.floor(Math.random() * apellidos.length);
        return apellidos[indiceAleatorio];
    }
    
    function generarNumeroAleatorio10Digitos(): number {
        // Generar un número aleatorio entre 1e8 (inclusive) y 1e9 (exclusive)
        const numAleatorio = Math.floor(Math.random() * (1e9 - 1e8) + 1e8);
    
        // Agregar 3 al principio para obtener un número de 10 dígitos que comienza con 3
        return Number("3" + numAleatorio);
    }

    //  -- INFORMACION BASICA -- //

    // # Seleccionar el pais de expedicion del documento
    await page.waitForTimeout(500); 
    await page.getByLabel('País\n\t\t\t\t\tde expedición del documento *').selectOption('41');
    await page.waitForTimeout(500); 

    // # Seleccionar el departamento de expedicion del documento
    await page.getByLabel('Departamento\n\t\t\t\t\tde expedición *').selectOption('11');
    await page.waitForTimeout(500); 

    // # Seleccionar la ciudad de expedicion del documento
    await page.getByLabel('Ciudad de expedición del documento*').selectOption('5');

    // # Escribir el primer nombre
    await page.getByLabel('Primer nombre *').click();
    await page.getByLabel('Primer nombre *').fill(seleccionarNombreAleatorio());

    // # Escribir el primer apellido
    await page.getByLabel('Primer apellido *').click();
    await page.getByLabel('Primer apellido *').fill(seleccionarApellidoAleatorio());

    // # Ingresar el numero del codigo ICFES del colegio
    await page.getByLabel('Código ICFES del colegio donde terminó o terminará el\n\t\t\t\t\tbachillerato *').click();
    await page.getByLabel('Código ICFES del colegio donde terminó o terminará el\n\t\t\t\t\tbachillerato *').fill('555555');
    
    // # Seleccionar Sexo
    await page.getByLabel('Sexo *').selectOption('M');

    // # Seleccionar el estado civil
    await page.getByLabel('Estado Civil *').selectOption('7');

    //  -- INFORMACION DE PROCEDENCIA -- //

    // # Seleccionar el fecha de nacimiento
    await page.locator('#datosProcedencia_fechaNacimientoanio').selectOption('2013');
    await page.locator('#datosProcedencia_fechaNacimientomes').selectOption('01');
    await page.locator('#datosProcedencia_fechaNacimientodia').selectOption('01');

    // # Confirmar el fecha de nacimiento
    await page.locator('#datosProcedencia_fechaNacimientoConfirmaranio').selectOption('2013');
    await page.locator('#datosProcedencia_fechaNacimientoConfirmarmes').selectOption('01');
    await page.locator('#datosProcedencia_fechaNacimientoConfirmardia').selectOption('01');

    // # Seleccionar el pais de Nacionalidad
    await page.getByLabel('País\n\t\t\t\t\tque corresponde a su nacionalidad *').selectOption('41');
    await page.waitForTimeout(500); 

    // # Seleccionar el pais de Nacimiento
    await page.locator('#listaPaisesNacimiento').selectOption('41');
    await page.waitForTimeout(500); 

    // # Seleccionar el departamento de Nacimiento
    await page.getByLabel('Departamento\n\t\t\t\t\tde nacimiento *').selectOption('11');
    await page.waitForTimeout(500); 

    // # Seleccionar la ciudad de Nacimiento
    await page.getByLabel('Ciudad de nacimiento *').selectOption('5');

    //  -- INFORMACION DE CONTACTO -- //
    
    // # Seleccionar la direccion
    await page.getByLabel('Dirección *').click();
    await page.getByRole('cell', { name: 'Apartamento' }).click();
    await page.getByRole('cell', { name: 'Norte' }).click();
    await page.getByRole('button', { name: 'Guardar direccion' }).click();

    // # Seleccionar la localidad en la que vive
    await page.getByLabel('Localidad*').selectOption('1');

    // # Seleccionar el estrato al que pertence
    await page.getByLabel('Estrato*').selectOption('3');

    // # Ingresar numero celular
    await page.getByLabel('Celular\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t*').click();
    await page.getByLabel('Celular\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t*').fill(generarNumeroAleatorio10Digitos().toString());
    
    //  -- INFORMACION ACADEMICA -- //
    
    // # Seleccionar fecha de terminacion de bachillerato
    await page.locator('#datosAcademicos_anoTerminacionanio').selectOption('2023');
    await page.locator('#datosAcademicos_anoTerminacionmes').selectOption('01');

    // # Confirmar fecha de terminacion de bachillerato
    await page.locator('#datosAcademicos_anoTerminacionConfirmaranio').selectOption('2023');
    await page.locator('#datosAcademicos_anoTerminacionConfirmarmes').selectOption('01');

    // # Seleccionar titulo universitario
    await page.getByLabel('¿Actualmente\n\t\t\t\t\tposee Título Universitario?').selectOption('false');

    //  -- OTRA INFORMACION -- //
    
    // # Seleccionar EPS
    await page.getByLabel('Entidad\n\t\t\t\t\tPrestadora de Salud (EPS) *').selectOption('20');
    
    // # Seleccionar Motivo de la Convocatoria
    await page.getByLabel('Medio por el cual se enteró de la convocatoria *').selectOption('Redes Sociales');
        
    // # Seleccionar Red Social
    await page.getByLabel('¿Qué red social utiliza con más frecuencia?*').selectOption('7');
    
    // # Seleccionar si tiene alguna discapacidad
    await page.getByText('Ninguna.').click();

    //  -- INFORMACION PROPIA DEL ASPIRANTE -- //
    
    // # Seleccionar si es estudiante activo de la UN
    await page.getByLabel('¿Usted\n\t\t\t\t\tes estudiante activo de la Universidad Nacional? *').selectOption('false');
    
    // # Seleccionar si es egresado de la UN
    await page.getByLabel('¿Usted\n\t\t\t\t\tha sido estudiante de la Universidad Nacional? *').selectOption('false');
    
    // # Seleccionar si pertenece a algún grupo etnico
    await page.getByLabel('Seleccione el grupo étnico al que pertenece *').selectOption('4');
    
    // click en el boton siguiente
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA DECIMA PARTE DEL FORMULARIO INFORMACION PRUEBAS SABER

    // # Click en el boton de omitir
    await page.getByRole('button', { name: 'Omitir' }).click();

    // *-------------------------------------------------------------------* //
    // LLENANDO LA DECIMA PRIMERA PARTE DEL FORMULARIO ENCUESTA
    
    // # Seleccionar Ingenieria de Sistemas
    await page.getByLabel('Seleccione el programa curricular que le gustaría estudiar *').selectOption('0116600');

    // # Finalizar proceso
    await page.getByRole('button', { name: 'Siguiente' }).click();
});