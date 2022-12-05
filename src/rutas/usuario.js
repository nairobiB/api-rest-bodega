const { Router } = require("express");
const controladorUsuario = require("../controladores/Usuario");
const {body, query}= require('express-validator');
const { ValidarAutendicado } = require("../configuraciones/passport");
const path = require('path');
const multer = require('multer');
const ruta = Router();
const storageUsuario = multer.diskStorage({
  destination: function (req, file, cb){
      cb(null, path.join(__dirname, '../public/img/usuarios'));
  },
  filename: function (req, file, cb){
      const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
  }
});
const uploadUsuarios = multer({storage: storageUsuario

});

ruta.get("/", controladorUsuario.Inicio);

ruta.get("/listar", ValidarAutendicado, controladorUsuario.Listar);

ruta.post("/guardar", ValidarAutendicado,
    body("usuario")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del usuario con una longitud de 3 - 50 caracteres"
    ),
    body("contrasena")
    .isLength({ min: 5, max: 65 })
    .withMessage(
      "Debe escribir la contrasena con una longitud de 5 - 20 caracteres"
    ),
controladorUsuario.Guardar);

ruta.put("/editar", ValidarAutendicado,
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body("usuario")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del usuario con una longitud de 3 - 50 caracteres"
    ),
    body("contrasena")
    .isLength({ min: 5, max: 65 })
    .withMessage(
      "Debe escribir la contrasena con una longitud de 5 - 20 caracteres"
    ),
controladorUsuario.Editar);

ruta.delete("/eliminar", ValidarAutendicado,
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorUsuario.Eliminar);

ruta.post('/imagen', 
uploadUsuarios.single('img'), 
controladorUsuario.RecibirImagen);

module.exports = ruta;