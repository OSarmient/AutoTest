# Proyecto Playwright

Este proyecto está configurado para ejecutar pruebas usando el marco de pruebas Playwright.

## Configuración del Proyecto

1. Primero, debes clonar el repositorio en tu máquina local. Para hacer esto, abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/OSarmient/AutoTest.git
```

2. Navega al directorio del proyecto:

```bash
cd AutoTest
```

3. Después de clonar el repositorio, debes instalar todas las dependencias necesarias. Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

## Uso del Proyecto

El proyecto está configurado para ejecutar pruebas con Playwright. Aquí hay algunos comandos que podrías encontrar útiles:

- `npx playwright codegen`: Este comando inicia el navegador y comienza a grabar acciones del usuario. Se utiliza para generar guiones de pruebas de forma interactiva.

```bash
npx playwright codegen
```

- `npx playwright test formularioCompleto`: Este comando ejecuta las pruebas definidas en el archivo `formularioCompleto.spec.ts`. Las pruebas se ejecutan en modo sin cabeza (sin la interfaz de usuario del navegador).

```bash
npx playwright test formularioCompleto
```

- `npx playwright test formularioCompleto --headed`: Similar al comando anterior, pero las pruebas se ejecutan en modo con cabeza, es decir, la interfaz de usuario del navegador se muestra durante la ejecución de la prueba. Este modo puede ser útil para depurar y ver qué está sucediendo durante la ejecución de la prueba.

```bash
npx playwright test formularioCompleto --headed
```

Asegúrate de que el servidor esté en funcionamiento y sea accesible antes de comenzar las pruebas.
