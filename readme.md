<p align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0INUbJ5FOyXCFsx7q5Qbx6ysOPDaXXwDV13mB67BVfEoVWy4Y" width="150"></p>

## BOT facebook :bomb:

### Pasos
* Crear pagina en facebook.com
* Crear cuenta en developers.facebook.com ó iniciar sesion con la cuenta que tiene permiso de administrador de la pagina.
* Crear aplicacion en la consola de facebookdevelopers
* Añadir Messenger a los productos.

### Configuración de Messenger
* Generar el token del sitio, seleccionando la pagina en la cual se implementara el bot, y copiando ese token utilizarlo en node.

```
EAAeeE7QKZC5sBAABpO37GnifQg0E2ykC88x0M1PllK7tlCKyOLKamTd3z5jSQHaT6PqRXCCEtT2ZAy9gQTT0HIjj5FMZC39ZBYIxzSx9c6nrYd9FCB7Psp9XMX9x6NkQaykPJclWZATZAqcCtnvrZC6kmplGdMNvu9t9DE6LIhJJAZDZD
```

implementarlo en index.js

```
const APP_TOKEN ='EAAeeE7QKZC5sBAABpO37GnifQg0E2ykC88x0M1PllK7tlCKyOLKamTd3z5jSQHaT6PqRXCCEtT2ZAy9gQTT0HIjj5FMZC39ZBYIxzSx9c6nrYd9FCB7Psp9XMX9x6NkQaykPJclWZATZAqcCtnvrZC6kmplGdMNvu9t9DE6LIhJJAZDZD'
```

### Configuración de el webhook

* Seleccionar Configurar webhook

* La url local es https://b37dc1a6.ngrok.io/webhook
* El token del webhook es test_token_desarrollomx
* Activar la opción de messages
* Seleccionar Verificar y Guardar

* Dentro de webhook seleccionar la pagina de facebook donde funcionara el bot y dar click en suscribir

### Requerimientos del bot
* Compatibilidad con HTTPS
* Un certificado SSL válido
* Un puerto abierto que acepte solicitudes GET y POST

* Instalacion de Node.js
```
npm init   
```

* Instalacion de Express
```
npm install express body-parser --save  
```

* Instalacion de Ngrok (manera local)
[link descarga](https://ngrok.com/download/)
  * Descargar y ejecutar


### Ejecucion del bot de manera local
* Comandos desde la terminal dentro del proyecto

  * el https link que genera, es el que utilizamos de url del webhook y no puede pararse ese comando o generara otro link.
  ```
  ngrok http 3000
  ```

  * Ejecutar el archivo de node desde la terminal dentro del proyecto, este archivo es el que se editara y para que los cambios puedan guardarse se debe reinicar este comando.

    ```
    node index.js
    ```

:camel: [link documentación MarkDown!](https://guides.github.com/features/mastering-markdown/) :camel:

 <p align="center">
   <img src="https://media.giphy.com/media/sNjTRqN38JDXy/giphy.gif" width="300">
 </p>
