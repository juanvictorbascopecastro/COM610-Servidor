const { response } = require("express");
var admin = require("firebase-admin");

var serviceAccount = require(`${__dirname}/key-firebase.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab1-423aa-default-rtdb.firebaseio.com",
});

function enviarATodo(params) {
  const mensaje = {
    notification: {
      title: params.titulo,
      body: params.mensaje,
    },
    topic: "com-610",
  };
  enviar(mensaje);
}

function enviarUnDispositivo(params, dispositivo) {
  const mensaje = {
    token: dispositivo,
    notification: {
      title: params.titulo,
      body: params.mensaje,
    },
  };
  enviar(mensaje);
}

module.exports = { enviarATodo, enviarUnDispositivo };

function enviar(mensaje) {
  admin
    .messaging()
    .send(mensaje)
    .then((response) => {
      console.log(response);
      console.log("Mensaje enviado correctamente");
    })
    .catch((error) => {
      console.log("Error al enviar el mensaje" + error);
    });
}
