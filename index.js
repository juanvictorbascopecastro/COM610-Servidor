const express = require("express");

const app = express();

const { enviarUnDispositivo, enviarATodo } = require("./notificaciones"); // rhacemos la referencia al metodo que envia el mensaje

// ruta por defecto del servidor
app.get("/", (req, res) => {
  res.send("¡Este es un servidor de COM-610 para enviar notificaciones push!");
});

// recive los parametros del mensaje
app.get("/notificar", (req, res) => {
  const { mensaje, nombre, id, dispositivo } = req.query;
  const data = {
    titulo: nombre,
    mensaje: mensaje,
  };
  if (dispositivo) enviarUnDispositivo(data, dispositivo);
  else enviarATodo(data); // enviamos las notificaciones del mensaje
  res.send("Enviando notificaciones...."); // devolvemos una respuesta al cliente que envia el mensaje
});

const PUERTO = 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
