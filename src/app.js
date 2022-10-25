const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto ${app.get("port")}`);
});
