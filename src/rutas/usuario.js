const { Router } = require("express");
const controladorUsuario = require("../controladores/Usuario");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorUsuario.Inicio);

ruta.get("/listar", controladorUsuario.Listar);

ruta.post("/guardar",
    body("usuario")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del usuario con una longitud de 3 - 50 caracteres"
    ),
    body("contrasena")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "Debe escribir la contrasena con una longitud de 5 - 20 caracteres"
    ),
controladorUsuario.Guardar);

ruta.put("/editar",
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body("usuario")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del usuario con una longitud de 3 - 50 caracteres"
    ),
    body("contrasena")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "Debe escribir la contrasena con una longitud de 5 - 20 caracteres"
    ),
controladorUsuario.Editar);

ruta.delete("/eliminar",
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorUsuario.Eliminar);

module.exports = ruta;