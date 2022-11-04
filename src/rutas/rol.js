const { Router } = require("express");
const controladorRol = require("../controladores/Rol");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorRol.Inicio);
ruta.get("/listar", controladorRol.Listar);
ruta.post("/guardar", 
body("nombreRol")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del rol con una longitud de 3 - 50 caracteres"
    ),
    controladorRol.Guardar);
ruta.put("/editar", 
query("nombreRol")
.isLength({ min: 3, max: 50 })
.withMessage(
  "Debe escribir el nombre del rol con una longitud de 3 - 50 caracteres"
),
controladorRol.Editar);
ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorRol.Eliminar);
module.exports = ruta;