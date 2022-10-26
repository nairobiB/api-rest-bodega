const { Router } = require("express");
const controladorSecciones = require("../controladores/Seccion");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorSecciones.Inicio);
ruta.get("/listar", controladorSecciones.Listar);
ruta.post("/guardar", 
body("nombreSeccion")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la seccion con una longitud de 3 - 50 caracteres"
    ), 
controladorSecciones.Guardar);
ruta.put("/editar", 
query("nombreSeccion")
.isLength({ min: 3, max: 50 })
.withMessage(
  "Debe escribir el nombre de la seccion con una longitud de 3 - 50 caracteres"
),
controladorSecciones.Editar);
ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorSecciones.Eliminar);
module.exports = ruta;