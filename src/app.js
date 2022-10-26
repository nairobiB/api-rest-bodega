const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("port", 4001);
//Puerto que se utilizará
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Bienvenido a la API");
});

app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto ${app.get("port")}`);
  //Mensaje de bienvenida en la consola
});


//Hola no soy Emo