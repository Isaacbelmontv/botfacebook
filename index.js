// Declaracion de express
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


//Token de generación de token de messenger aplication en facebookdevelopers
const APP_TOKEN = 'EAAipmtqCjBIBANgeZA3d8yAVLGUtn1QiWJhrMj0RBufKjxElgNQTyrqiJ9RtldgwFKMzpso61xu4ZCWaC9oSP7gjrGDgyA0a1Tdqj9B7pDLjO4AtmyDw77BBNbLdmDHGZAWk7r1kqvtKVEBqlZBMHwHrCeKeyBpTya4CH71pwQZDZD';

var app = express();
app.use(bodyParser.json());

//puerto de salia
app.listen(3000, function(){
console.log("el servidor esta en el puerto 3000");
});

app.get('/', function(req, res){
// res.send('Bienvenido al taller');
});

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

//recibiendo mensaje
function receiveMessage(event){
// console.log(event);
var senderID = event.sender.id;
var messageText = event.message.text;
evaluateMessage(senderID, messageText);
}

//detectando mensaje de usuario texto
function evaluateMessage(recipientId, message){
  let finalMessage = '';
//Saludo Facebook

//seccion nueva

//seccion nueva

  if(isContain(message, 'ayuda')){
    finalMessage = 'En que puedo ayudarte';
  }
  else if(isContain(message, 'Concepthaus') || isContain(message, 'concepthaus')){
    finalMessage = 'a tu servicio';
  }
  // opcion servicios
  else if(isContain(message, 'Servicios') || isContain(message, 'servicios')){
    finalMessage = 'Branding, Diseño, 3D, Marketing Digital, SEO, Marketing ATL, Marketing BTL, Evento, Relaciones Públicas, Responsabilidad Social, Interiorismo, Producción Audiovisual, Fotografía, Varios';
  }
  // opcion horario de Contacto
  else if(isContain(message, 'Horario de contacto') || isContain(message, 'horario de contacto')){
    finalMessage = 'El horario es de Lunes a Viernes de 9:00 a.m. - 6:00 p.m.';
  }
  // opcion  Contacto
  else if(isContain(message, 'Contacto') || isContain(message, 'contacto')){
    finalMessage = 'Ingresa tus datos';
  }
  else{
    // finalMessage = 'Te estoy arremedando, escribiste esto: ' +'""'+ message + '""' +' ¿o me equivoco?';
        finalMessage = 'Hola somos Concepthaus, en que podemos ayudarte?';
  }
  sendMessageText(recipientId, finalMessage);
}

//enviando respuestas json text
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

//envio de mensaje por medio de API facebook la uri es estatica (es el link de la API)
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


//datos de contacto
/*
Nombre, Correo, Telefono, Servicios, Empresa, Mensajes

Servicios/////////
Branding
Diseño
Markering Digital
SEO
Desarrollo web
*/
