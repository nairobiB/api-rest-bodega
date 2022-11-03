const { Router } = require("express");
const controladorEntrada = require("../controladores/Entrada");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorEntrada.Inicio);
ruta.get("/listar", controladorEntrada.Listar);
ruta.post("/guardar", 
body("idCliente")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
body("fechaEntrada")
.isDate().
withMessage("Solo se aceptan valores enteros para el numLote"),
body("idSucursal")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorEntrada.Guardar);
ruta.put("/editar", 
query("idCliente")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
query("numLote")
.isInt().
withMessage("Solo se aceptan valores enteros para el numLote"),
query("fechaEntrada")
.isDate().
withMessage("Solo se aceptan valores de fechas para el fechaEntradas"),
query("idSucursal")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorEntrada.Editar);
ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorEntrada.Eliminar);
module.exports = ruta;