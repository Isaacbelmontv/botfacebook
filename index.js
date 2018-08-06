// Declaracion de express
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


//Token de generación de token de messenger aplication en facebookdevelopers
const APP_TOKEN = 'EAADTe65upXMBANAkZBVbOdmvfRgTLSKk0lSi8DBreSCI3uG7LEAZAffJ1wd5eKc3vx6t0uxo6MzLkiGPn8P9LRe3RZCClWLoLw7iaqvXxsQt9QL7wcmk3iWYVWscfVJphVnpcObs6fpbTXz59rpPPfQZBzWwQ6bb9KqDZCONkfQZDZD';

var app = express();
app.use(bodyParser.json());

//puerto de salia
app.listen(3000, function(){
console.log("el servidor esta en el puerto 3000");
});

app.get('/', function(req, res){
// res.send('Bienvenido al taller');
});

//====================Configuracón webhook====================//
  //webhook configuracion test_token_desarrollomx es el token
  app.get('/webhook', function(req, res){
    if(req.query['hub.verify_token'] === 'test_token_desarrollomx'){
      res.send(req.query['hub.challenge']);
    }else{
      res.send('tu no tienes acceso');
    }
  });

  app.post('/webhook', function(req,res){
    var data = req.body;
    // console.log(data);
    if(data.object == 'page'){
      data.entry.forEach(function(pageEntry){
        pageEntry.messaging.forEach(function(messagingEvent){
        //recibiendo mensaje
        if(messagingEvent.message){
          receiveMessage(messagingEvent);
        }
        });
      });
      res.sendStatus(200);
    }
  });

//====================Recibiendo mensaje====================//
function receiveMessage(event){
// console.log(event);
var senderID = event.sender.id;
var messageText = event.message.text;
evaluateMessage(senderID, messageText);
}

//====================Termina configuración BOT====================//

//detectando mensaje de usuario texto
function evaluateMessage(recipientId, message){
  let finalMessage = '';
  //====================Envio de mensaje: ayuda====================//
  if(isContain(message, 'ayuda')){
    finalMessage = 'En que puedo ayudarte';
  }
//====================Envio de mensaje: Opción servicios====================//
  else if(isContain(message, 'Servicios') || isContain(message, 'servicios')){
    finalMessage = 'Branding, Diseño, 3D, Marketing Digital, SEO, Marketing ATL, Marketing BTL, Evento, Relaciones Públicas, Responsabilidad Social, Interiorismo, Producción Audiovisual, Fotografía, Varios';
  }
//====================Envio de mensaje: Opción horario de contacto====================//
  else if(isContain(message, 'Horario de contacto') || isContain(message, 'horario de contacto')){
    finalMessage = 'El horario es de Lunes a Viernes de 9:00 a.m. - 6:00 p.m.';
  }
//====================Envio de mensaje: Opción contacto====================//
  else if(isContain(message, 'Contacto') || isContain(message, 'contacto')){
    finalMessage = 'Ingresa tus datos';
  }
//====================Envio de mensaje: Imagen====================//
  else if(isContain(message, 'Concepthaus') || isContain(message, 'concepthaus')){
    sendMessageImage(recipientId);
  }
//====================Envio de mensaje: Template(Buttons)====================//
  else if(isContain(message, 'Info') || isContain(message, 'info')){
    sendMessageTemplate(recipientId);
  }

//====================Envio de mensaje: desde API====================//
  else if(isContain(message, 'Api') || isContain(message, 'api')){
    getWeather(function (nameApi, longitudApi, latitudApi) {
      message = "Localización: " + nameApi + "\nlongitud: " + longitudApi + "\nlatitudApi: " + latitudApi;
      sendMessageText(recipientId, message);
    });
  }
//====================Envio de mensaje: default====================//
  else{
    // finalMessage = 'Te estoy arremedando, escribiste esto: ' +'""'+ message + '""' +' ¿o me equivoco?';
        finalMessage = 'Hola somos Concepthaus, en que podemos ayudarte?';
  }
  sendMessageText(recipientId, finalMessage);
}

//====================Text Messages====================//
function sendMessageText(recipientId, message){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      text: message
    }
  };
  callSendAPI(messageData);
}

//====================Imagen Messages====================//
function sendMessageImage(recipientId){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url : "https://ii.ct-stc.com/2/logos/empresas/2016/10/19/3b543f9ff79f4ec2869athumbnail.png"
        }
      }
    }
  };
  callSendAPI(messageData);
}

//====================API Message====================//
function getWeather(callback){
  request('http://api.geonames.org/searchJSON?username=ksuhiyp&country=us&maxRows=1&style=SHORT'
  , function(error, response, data){
    if(!error){
      var response = JSON.parse(data);
      //name
      var nameApi = response.geonames[0].name;
      //longitud
      var longitudApi = response.geonames[0].lng;
      //latitudApi
      var latitudApi = response.geonames[0].lat;
      // console.log(response);
      callback(nameApi, longitudApi, latitudApi);
    }
  });
}

//====================Templates Messages====================//
function sendMessageTemplate(recipientId){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload : {
          template_type: "generic",
          elements: [ elementTemplate() ]
        }
      }
    }
  };
  callSendAPI(messageData);
}

function elementTemplate(){
  return{
    title: "Concepthaus",
    subtitle: "Agencia de publicidad",
    //link imagen
    item_url: "https://concepthaus.mx/",
    image_url: "https://ii.ct-stc.com/2/logos/empresas/2016/10/19/3b543f9ff79f4ec2869athumbnail.png",
    buttons: [ buttonsTemplate(), buttonsTemplatetres(), buttonsTemplatecuatro()],
  }
}

//link button
function buttonsTemplate(){
  return{
    type: "web_url",
    url: "https://concepthaus.mx/",
    title: "Sitio",
  }
}
//link buttondos
function buttonsTemplatedos(){
  return{
    type: "web_url",
    url: "https://www.facebook.com/Desarrollomx-239946563293365/?modal=admin_todo_tour",
    title: "Facebook",
  }
}

//link mensaje prueba
function buttonsTemplatetres(){
  return{
    type: "postback",
    title: "mensaje prueba",
    payload: "mensaje prueba",
  }
}


//link llamada
function buttonsTemplatecuatro(){
  return{
    type: "phone_number",
    title: "llamar",
    payload: "018001232222",
  }
}
//====================Conexión Messages====================//
function callSendAPI(messageData){
request({
  "uri": "https://graph.facebook.com/v2.6/me/messages",
  "qs": { "access_token": APP_TOKEN },
  "method": "POST",
  "json": messageData
}, function(error, response, data){
  if(error){
    console.log('No es posible enviar el mensaje');
  }else{
    console.log('el mensaje fue enviado');
  }
});
}


function isContain(sentence, word){
  return sentence.indexOf(word) > -1;
}


//pruebas

//datos de contacto
//Nombre, Correo, Telefono, Servicios, Empresa, Mensajes
//Documentacion https://guides.github.com/features/wikis/
