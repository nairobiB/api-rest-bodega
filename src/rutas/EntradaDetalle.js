const { Router } = require("express");
const controladorEntrada = require("../controladores/EntradaDetalle");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorEntrada.Inicio);
ruta.get("/listar", controladorEntrada.Listar);

ruta.post("/guardar", 
body("idEntrada")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
body("idProducto")
.isInt().
withMessage("Solo se aceptan valores enteros para el numLote"),
body("Tamanio")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el tamaño del producto con una longitud de 3 - 50 caracteres"
    ),
body("numLote")
    .isInt().
    withMessage("Solo se aceptan valores enteros para el numLote"),
body("precio")
    .isDecimal().
    withMessage("Solo se aceptan valores enteros para el Precio"),

body("fechaVencimiento")
.isDate().
withMessage("Solo se aceptan valores en fecha para la Fecha de vencimiento"),
body("idSeccion")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSeccion"),
controladorEntrada.Guardar);

ruta.put("/editar", 
query("idEntrada")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
query("idProducto")
.isInt().
withMessage("Solo se aceptan valores enteros para el numLote"),
body("Tamanio")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el tamaño del producto con una longitud de 3 - 50 caracteres"
    ),
body("numLote")
    .isInt().
    withMessage("Solo se aceptan valores enteros para el numLote"),
body("precio")
    .isDecimal().
    withMessage("Solo se aceptan valores decimales para el Precio"),

body("fechaVencimiento")
.isDate().
withMessage("Solo se aceptan valores en fecha para la Fecha de vencimiento"),
body("idSeccion")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSeccion"),
controladorEntrada.Editar);

ruta.delete('/eliminar', 
query("idEntrada")
.isInt().
withMessage("Solo se aceptan valores enteros para el idEntrada"),
controladorEntrada.Eliminar);
module.exports = ruta;