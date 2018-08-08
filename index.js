// Declaracion de express
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


//Token de generación de token de messenger aplication en facebookdevelopers
const APP_TOKEN = 'EAADro8kHqVUBAGkLY6P4AdeM0oPMxmILlKhQANU7t9TuqiYamyVLTs5OLpwvZAicAMz7PD7BCu6FB5tPIAbGRqYKhZBb7HH9fZBhhFTYz1YoPJPmdfs7cDDvUSq5eX0qsGL09kbOhLQv5fSTcmr1ZAV1JmhnG5q3jtv7ZCbi6ZBQZDZD';

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
// console.log(senderID);
}

//====================Termina configuración BOT====================//

//detectando mensaje de usuario texto
function evaluateMessage(recipientId, message){
  let finalMessage = '';
  // sendTypingOn(sender);
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
//====================Envio de mensaje: Imagen====================//
  else if(isContain(message, 'Concepthaus') || isContain(message, 'concepthaus')){
    sendMessageImage(recipientId);
  }
//====================Envio de mensaje: Template(Buttons)====================//
  else if(isContain(message, 'Empresas') || isContain(message, 'empresas')){
    sendMessageTemplate(recipientId);
  }
//====================Envio de mensaje: Prueba====================//
  else if(isContain(message, 'Prueba') || isContain(message, 'prueba')){
    sendMessageTemplateButton(recipientId);
  }
//====================Envio de mensaje: Buttons====================//
  else if(isContain(message, 'Contacto') || isContain(message, 'contacto')){
    sendMessageFormulario(recipientId);
  }
  //====================Envio de mensaje: Salir====================//
    else if(isContain(message, 'Salir') || isContain(message, 'salir')){
      finalMessage = '¡Hasta pronto! espero haber sido de ayuda.';
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
        sendMessageDefault(recipientId);
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

//====================Conexión Messages====================//
function callSendAPI(messageData){
request({
  "uri": "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>",
  "qs": { "access_token": APP_TOKEN },
  "method": "POST",
  "json": messageData
  },
function(error, response, data){
  if(error){
    console.log('No es posible enviar el mensaje');
  }else{
    console.log('el mensaje fue enviado');
  }
});
}

//====================Respuestas====================//
function sendMessageTemplateButton(recipientId){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload : {
          template_type: "button",
          text: "Pregunta?",
          buttons:[
            {
              type: "postback",
              title: "Respuesta uno",
              payload: "Respuesta uno",
            },
            {
              type: "postback",
              title: "Respuesta dos",
              payload: "Respuesta dos",
            }
          ]
        }
      }
    }
  };
  callSendAPI(messageData);
}

//====================Respuestas Buttons====================//


function sendMessageFormulario(recipientId){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      text: "Selecciona la opción por la cual deseas que te contactemos?",
      quick_replies:[
      {
        content_type:"location"
      },
      {
        "content_type":"user_phone_number"
      },
      {
        "content_type":"user_email"
      }
    ]
    }
  };
  callSendAPI(messageData);
}

//====================Respuesta default====================//


function sendMessageDefault(recipientId){
  var messageData = {
    recipient : {
      id : recipientId
    },
    message: {
      text: "Hola somos Concepthaus, en que podemos ayudarte?",
      quick_replies:[
      {
        content_type: "text",
        title: "Servicios",
        payload: "Servicios"
      },
      {
        content_type: "text",
        title: "Horario de contacto",
        payload: "Horario de contacto"
      },
      {
        content_type: "text",
        title: "Contacto",
        payload: "contacto"
      },{
        content_type: "text",
        title: "Empresas",
        payload: "empresas"
      },{
        content_type: "text",
        title: "Salir",
        payload: "salir"
      }
    ]
    }
  };
  callSendAPI(messageData);
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
          elements: [ elementTemplateConcept(), elementTemplateTree(), elementTemplateInhaus() ]
        }
      }
    }
  };
  callSendAPI(messageData);
}

function elementTemplateConcept(){
  return{
    title: "Concepthaus",
    subtitle: "Agencia de publicidad",
    //link imagen
    item_url: "https://concepthaus.mx/",
    image_url: "https://concepthaus.mx/img/home-elements/doors/concepthaus.png",
    buttons: [ buttonConcept(), buttonLlamar()],
  }
}

function elementTemplateTree(){
  return{
    title: "Treehaus",
    subtitle: "(Green Marketing)",
    //link imagen
    item_url: "https://concepthaus.mx/treehaus",
    image_url: "https://concepthaus.mx/img/home-elements/doors/treehaus.png",
    buttons: [ buttonTreehaus(), buttonLlamar()],
  }
}

function elementTemplateInhaus(){
  return{
    title: "Inhaus",
    subtitle: "Casa Productora",
    //link imagen
    item_url: "https://concepthaus.mx/inhaus",
    image_url: "https://concepthaus.mx/img/home-elements/doors/inhaus.png",
    buttons: [ buttoninHaus(), buttonLlamar()],
  }
}

//link button
function buttonConcept(){
  return{
    type: "web_url",
    url: "https://concepthaus.mx/",
    title: "Sitio",
  }
}

function buttonTreehaus(){
  return{
    type: "web_url",
    url: "https://concepthaus.mx/treehaus",
    title: "Sitio",
  }
}

function buttoninHaus(){
  return{
    type: "web_url",
    url: "https://concepthaus.mx/inhaus",
    title: "Sitio",
  }
}


//link mensaje prueba
// function buttonContacto(){
//   return{
//     type: "postback",
//     title: "Contacto",
//     payload: "payload"
//   }
// }


//link llamada
function buttonLlamar(){
  return{
    type: "phone_number",
    title: "llamar",
    payload: "018001232222",
  }
}

//Templates pruebas






// const sendTypingOn = (recipientId) => {
//   var messageData = {
//     recipient: {
//       id: recipientId
//     },
//     sender_action: "typing_on"
//   };
//   callSendAPI(messageData);
// }

function isContain(sentence, word){
  return sentence.indexOf(word) > -1;
}

//pruebas
//datos de contacto
//Nombre, Correo, Telefono, Servicios, Empresa, Mensajes
//Documentacion https://guides.github.com/features/wikis/
