from selenium.webdriver.chrome.options import Options
import unittest
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import wait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.alert import Alert
import random
import re
import os

class testInscriptionPin(unittest.TestCase):
    path = ""
    numpago = 30
    docNum = 350
    def exception_handler(func):
        def inner_function(*args, **kwargs):
            try:
                func(*args, **kwargs)
            except TypeError:
                print(f"{func.__name__} only takes numbers as the argument")

        return inner_function
    
    def setUp(self):
        if os.name == 'nt':
            self.path = "http://6d6c-168-176-239-67.ngrok.io"
            self.chromeBrowser = webdriver.Chrome('.\drivers\chrome\windows\chromedriver92.exe')
        else:
            chrome_options = Options()
            self.chromeBrowser = webdriver.Chrome('./chromedriver', options=chrome_options)
            self.path = "http://localhost:8080/sitio/accederServicio/acceder.action?periodo=104&servicio=393"
            #self.path = "http://localhost:8080/sitio/selPeriodo!input.action"

    @exception_handler
    def test_security_certificate(self):

        chromeBrowser = self.chromeBrowser
        chromeBrowser.get(self.path)
        time.sleep(1)
        valor_PEAMA = 1
        print(chromeBrowser.title)
        assert "Dirección Nacional de Admisiones" in chromeBrowser.title
        processList = [93]  # [, 91, 95, 90]
        processToSelect = random.choice(processList)
        time.sleep(1)

        chromeBrowser.find_element(By.LINK_TEXT, "Inscripción Pregrado").click()
        time.sleep(1)

        selectAceptaDatosPersonales = chromeBrowser.find_element(By.ID, "aceptaDatosPersonales")
        selectAceptaDatosPersonales.click()

        selectorProcess = Select(chromeBrowser.find_element(By.ID, "tipoDocumento"))
        selectorProcess.select_by_index(1)

        documento = chromeBrowser.find_element_by_name("documento")
        documento.send_keys("1625")
        documento.send_keys(Keys.TAB)

        confElement = chromeBrowser.switch_to.active_element
        confElementID = confElement.get_attribute("id")
        confElement.send_keys("1625")
        time.sleep(1)
        chromeBrowser.execute_script("document.getElementById('fechaExpDocumento').value='2001-01-01'")

        mail = chromeBrowser.find_element(By.ID, "email1")
        mail.send_keys("n@r.com")

        mail = chromeBrowser.find_element(By.ID, "email2")
        mail.send_keys("n@r.com")
        mail.send_keys(Keys.ENTER)

        alert = Alert(chromeBrowser)
        alert.accept()

        codigo = chromeBrowser.find_element(By.ID, "codigo")
        codigoSeguridad = chromeBrowser.find_element(By.ID,"codigoCorrecto").get_attribute('innerHTML')
        codigo.send_keys(codigoSeguridad)
        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(1)

        chromeBrowser.find_element_by_xpath("//form[@id='pagoElectronicoForm']/ul/li[2]/div/label").click()
        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(1)

        pin = chromeBrowser.find_element(By.ID, "pin")
        pin.send_keys("PRU20")
        pinConfirmacion = chromeBrowser.find_element(By.ID, "pinVerificacion")
        pinConfirmacion.send_keys("PRU20")
        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        #chromeBrowser.save_screenshot("stepsImages/step17.png")
        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        #chromeBrowser.save_screenshot("stepsImages/step18.png")

        time.sleep(2)

        botonAceptarComprobante = chromeBrowser.find_element(By.ID, "botonAceptarComprobantePago")
        botonAceptarComprobante.click()
        #chromeBrowser.save_screenshot("stepsImages/step18.png")
        time.sleep(1)

        # driver.findElement(By.id("invoice_supplier_id")).setAttribute("value", "your value");

        botonAceptarInfo = chromeBrowser.find_element (By.NAME,"_eventId_accept")
        botonAceptarInfo.click()
        #chromeBrowser.save_screenshot("stepsImages/step19.png")
        time.sleep(1)


        #--------------- SELECT PEAMA ---------------
        if valor_PEAMA == 1:
            labeltoclick = chromeBrowser.find_element_by_xpath("//label[contains(.,'Programa Especial de Admisión y Movilidad Académica - Sede Caribe')]")
            labeltoclick.click()

        elif valor_PEAMA == 2:
            labeltoclick = chromeBrowser.find_element_by_xpath("//label[contains(.,'Programa Especial de Admisión y Movilidad Académica - Sede Orinoquía')]")
            labeltoclick.click()

        elif valor_PEAMA == 3:
            labeltoclick = chromeBrowser.find_element_by_xpath("//label[contains(.,'Programa Especial de Admisión y Movilidad Académica - Sede Amazonía')]")
            labeltoclick.click()

        elif valor_PEAMA == 4:
            labeltoclick = chromeBrowser.find_element_by_xpath("//label[contains(.,'Programa Especial de Admisión y Movilidad Académica - Sede Tumaco')]")
            labeltoclick.click()
        time.sleep(1)

        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()

        time.sleep(2)

        botonAceptarPeama = chromeBrowser.find_element(By.ID, "botonAceptarPeama")
        botonAceptarPeama.click()
        time.sleep(1)

        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(2)

        #botonAceptarPeama = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        #botonAceptarPeama.click()

        selec_sedePregradoForm = chromeBrowser.find_element_by_xpath("//label[contains(.,'Bogotá')]")
        selec_sedePregradoForm.click()
        time.sleep(1)

        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(1)

        selec_deptoResidencia = Select(chromeBrowser.find_element(By.ID, "deptoResidencia"))
        selec_deptoResidencia.select_by_visible_text("San Andres")
        time.sleep(1)

        ciudadResidencia = Select(chromeBrowser.find_element(By.ID, "ciudadResidencia"))
        ciudadResidencia.select_by_visible_text("Providencia")
        time.sleep(1)

        ciudadPresentacion = Select(chromeBrowser.find_element(By.ID, "listaCiu"))
        ciudadPresentacion.select_by_visible_text("Providencia")
        time.sleep(1)

        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(2)

        pais_expedicionDoc = Select(chromeBrowser.find_element(By.ID, "listaPaisesDocumento"))
        pais_expedicionDoc.select_by_visible_text("Colombia")
        time.sleep(1)
        # chromeBrowser.save_screenshot("stepsImages/step26.png")

        deptoDocumento = Select(chromeBrowser.find_element(By.ID, "deptoDocumento"))
        deptoDocumento.select_by_visible_text("San Andres")
        time.sleep(1)
        chromeBrowser.save_screenshot("stepsImages/step26.png")

        selec_ciudadDoc = Select(chromeBrowser.find_element(By.ID, "ciudadDoc"))
        selec_ciudadDoc.select_by_visible_text("Providencia")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step27.png")

        primer_nombre = chromeBrowser.find_element(By.ID, "primerNombre")
        primer_nombre.send_keys("Pedro")
        #chromeBrowser.save_screenshot("stepsImages/step28.png")

        primer_apellido = chromeBrowser.find_element(By.ID, "primerApellido")
        primer_apellido.send_keys("Moreno")
        #chromeBrowser.save_screenshot("stepsImages/step29.png")

        buscar_colegio = chromeBrowser.find_element(By.ID, "codigoColegio")
        buscar_colegio.send_keys("156323")

        nuevoSisbenId = Select(chromeBrowser.find_element(By.ID, "sisben"))
        nuevoSisbenId.select_by_visible_text("A1")
        time.sleep(1)

        selec_sexo = Select(chromeBrowser.find_element(By.ID, "genero"))
        selec_sexo.select_by_visible_text("Masculino")
        time.sleep(1)

        estado_civil = Select(chromeBrowser.find_element(By.ID, "estadoCivil"))
        estado_civil.select_by_visible_text("Soltero(a)")
        time.sleep(1)

        ano_nacim = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientoanio"))
        ano_nacim.select_by_visible_text("1997")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step32.png")

        mes_nacim = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientomes"))
        mes_nacim.select_by_visible_text("Noviembre")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step33.png")

        dia_nacim = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientodia"))
        dia_nacim.select_by_visible_text("01")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step34.png")

        ano_nacim_confirm = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientoConfirmaranio"))
        ano_nacim_confirm.select_by_visible_text("1997")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step35.png")

        mes_nacim_confirm = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientoConfirmarmes"))
        mes_nacim_confirm.select_by_visible_text("Noviembre")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step36.png")

        dia_nacim_confirm = Select(chromeBrowser.find_element(By.ID, "datosProcedencia_fechaNacimientoConfirmardia"))
        dia_nacim_confirm.select_by_visible_text("01")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step37.png")

        depto_nacim = Select(chromeBrowser.find_element(By.ID, "deptoNacimiento"))
        depto_nacim.select_by_visible_text("San Andres")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step38.png")

        ciudad_nacim = Select(chromeBrowser.find_element(By.ID, "ciudadNacimiento"))
        ciudad_nacim.select_by_visible_text("Providencia")
        time.sleep(1)
        #chromeBrowser.save_screenshot("stepsImages/step39.png")

        #listaPaisesDocumento = Select(chromeBrowser.find_element(By.ID, "listaPaisesDocumento"))
        #listaPaisesDocumento.select_by_visible_text("Colombia")
        #time.sleep(1)

        direccion_residencia = chromeBrowser.find_element(By.ID, "direccion")
        direccion_residencia.click()
        time.sleep(3)

        dir_res_si_nombre = chromeBrowser.find_element(By.XPATH, "/html/body/main/div/div/div[2]/form/ul[3]/li/div[4]/div/div/div[2]/table[1]/tbody/tr[2]/td[1]")

        dir_res_si_nombre.click()
        dir_res_si_nombre2 = chromeBrowser.find_element(By.XPATH, "/html/body/main/div/div/div[2]/form/ul[3]/li/div[4]/div/div/div[2]/table[1]/tbody/tr[2]/td[9]")
        dir_res_si_nombre2.click()
        time.sleep(1)

        select_guardar_dir = chromeBrowser.find_element(By.XPATH, "/html/body/main/div/div/div[2]/form/ul[3]/li/div[4]/div/div/div[3]/input[2]")
        select_guardar_dir.click()
        time.sleep(1)

        selec_Estrato = Select(chromeBrowser.find_element(By.ID, "estrato"))
        selec_Estrato.select_by_visible_text("2")
        time.sleep(1)

        telefono = chromeBrowser.find_element_by_name("datosContacto.telefono")
        telefono.send_keys("8042020")

        selector_anoTerminacionanio = Select(chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionanio"))
        selector_anoTerminacionanio.select_by_value("2015")

        selector_anoTerminacionanio = Select(chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionanio"))
        selector_anoTerminacionanio.select_by_value("2015")

        selectorEstrato = Select(chromeBrowser.find_element_by_name("datosContacto.estrato"))
        selectorEstrato.select_by_value("3")
        #chromeBrowser.save_screenshot("stepsImages/step42.png")

        celular = chromeBrowser.find_element_by_name("datosContacto.celular")
        celular.send_keys("3003003003")
        #chromeBrowser.save_screenshot("stepsImages/step43.png")

        selector_bachiller_anio = Select(chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionanio"))
        selector_bachiller_anio.select_by_value("2000")
        #chromeBrowser.save_screenshot("stepsImages/step44.png")

        selector_bachiller_mes = Select(chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionmes"))
        selector_bachiller_mes.select_by_value("12")
        #chromeBrowser.save_screenshot("stepsImages/step45.png")

        selector_bachiller_anio_confirm = Select(
            chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionConfirmaranio"))
        selector_bachiller_anio_confirm.select_by_value("2000")
        #chromeBrowser.save_screenshot("stepsImages/step46.png")

        selector_bachiller_mes_confirm = Select(
            chromeBrowser.find_element(By.ID, "datosAcademicos_anoTerminacionConfirmarmes"))
        selector_bachiller_mes_confirm.select_by_value("12")
        #chromeBrowser.save_screenshot("stepsImages/step47.png")

        selector_EPS = Select(chromeBrowser.find_element(By.ID, "epsId"))
        selector_EPS.select_by_value("2")
        #chromeBrowser.save_screenshot("stepsImages/step48.png")

        selector_medio = Select(chromeBrowser.find_element(By.ID, "mediosDivulgacion"))
        selector_medio.select_by_value("Página Web")
        #chromeBrowser.save_screenshot("stepsImages/step49.png")

        selector_red = Select(chromeBrowser.find_element(By.ID, "redId"))
        selector_red.select_by_value("3")
        #chromeBrowser.save_screenshot("stepsImages/step50.png")

        discapacidad_ninguna = chromeBrowser.find_element_by_xpath(
            "//*[@id='datosForm']/ul[5]/li/div[5]/div/div[1]/label")
        discapacidad_ninguna.click()
        #chromeBrowser.save_screenshot("stepsImages/step51.png")

        selector_etnico = Select(chromeBrowser.find_element(By.ID, "grupoEtnico"))
        selector_etnico.select_by_value("4")
        #chromeBrowser.save_screenshot("stepsImages/step52.png")
        time.sleep(1)
        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        #chromeBrowser.save_screenshot("stepsImages/step53.png")
        time.sleep(1)

        selector_tipo_doc_icfes = Select(chromeBrowser.find_element(By.ID, "tipoDocumento"))
        selector_tipo_doc_icfes.select_by_value("2")
        #chromeBrowser.save_screenshot("stepsImages/step54.png")

        numero_doc_icfes = chromeBrowser.find_element_by_name("numDocumentoIcfes")
        numero_doc_icfes.send_keys("78060100000")
        #chromeBrowser.save_screenshot("stepsImages/step55.png")

        numero_doc_icfes_confirm = chromeBrowser.find_element_by_name("numDocumentoIcfesConfirmacion")
        numero_doc_icfes_confirm.send_keys("78060100000")
        #chromeBrowser.save_screenshot("stepsImages/step56.png")

        numero_registro_icfes = chromeBrowser.find_element_by_name("snpIcfes")
        numero_registro_icfes.send_keys("AC201621816438")
        #chromeBrowser.save_screenshot("stepsImages/step57.png")

        numero_registro_icfes_confirm = chromeBrowser.find_element_by_name("snpIcfesConfirmacion")
        numero_registro_icfes_confirm.send_keys("AC201621816438")
        #chromeBrowser.save_screenshot("stepsImages/step58.png")

        nextButton = chromeBrowser.find_element_by_xpath("//input[@name='_eventId_next']")
        nextButton.click()
        time.sleep(3)
        #chromeBrowser.save_screenshot("stepsImages/step59.png")

    #    def tearDown(self):
    #        self.chromeBrowser.close()

    '''def search_code_catalina(self):
        codigo_verificacion = ""
        with open('/home/Desarrollo/Workspace/.metadata/.log') as gcode:
            if "perro" in gcode:
                for i in gcode:
                    listnumbers = re.findall(r'\d+', i.text)
                    if listnumbers:
                        codigo_verificacion += f'{int(listnumbers[0])}'
        return codigo_verificacion'''
time.sleep(3)

if __name__ == "__main__":
    unittest.main()
