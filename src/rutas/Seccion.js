const { Router } = require("express");
const controladorSecciones = require("../controladores/Seccion");
const {body, query}= require('express-validator');
const { ValidarAutendicado } = require("../configuraciones/passport");
const ruta = Router();

ruta.get("/", controladorSecciones.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorSecciones.Listar);

ruta.get(
  "/buscarnombreSeccion", 
  query("nombreSeccion")
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres"
    ),
  controladorSecciones.buscarnombreSeccion
);


ruta.post("/guardar", ValidarAutendicado,
body("nombreSeccion")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la seccion con una longitud de 3 - 50 caracteres"
    ), 
controladorSecciones.Guardar);

ruta.put("/editar", ValidarAutendicado,
query("nombreSeccion")
.isLength({ min: 3, max: 50 })
.withMessage(
  "Debe escribir el nombre de la seccion con una longitud de 3 - 50 caracteres"
),

controladorSecciones.Editar);
ruta.delete("/eliminar", ValidarAutendicado,
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorSecciones.Eliminar);

module.exports = ruta;