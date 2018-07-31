
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


//Token de generación de token de messenger aplication en facebookdevelopers
const APP_TOKEN = 'EAATTzAEHyX4BAEZBGffZCkVwz6HwzmlZAuzBnnvGIEi2PZAUMbQcRyoZBRwZAlzzIUXdO6nXScF6Vb4xqd5MOgFpwTjXIO8tfQhNhA2ElTLPbeIXsbQD34cdoEGcePeYyBTxK9Mh5h1Ub0nwytHDVi2ZATSGuBeH1bet9DlzggzjwZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(3000, function(){
console.log("el servidor esta en el puerto 3000");
});

app.get('/', function(req, res){
res.send('Bienvenido al taller');
});

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

function evaluateMessage(recipientId, message){
  var finalMessage = '';
//Saludo Facebook
  if(isContain(message, 'ayuda')){
    finalMessage = 'En que puedo ayudarte';
  }
  else{
    finalMessage = 'Te estoy arremedando, escribiste esto: ' + message;
  }
  sendMessageText(recipientId, finalMessage);
}

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

//envio de mensaje por medio de API facebook
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
