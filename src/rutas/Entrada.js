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
body("fechaIngreso")
.isDate().
withMessage("Solo se aceptan fechas para la fecha entrada"),
body("idSucursal")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorEntrada.Guardar);
ruta.put("/editar",
query("id")
.isInt().
withMessage("Solo se aceptan valores enteros para el id de entrada"),
body("idCliente")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
body("numLote")
.isInt().
withMessage("Solo se aceptan valores enteros para el numLote"),
body("fechaEntrada")
.isDate().
withMessage("Solo se aceptan valores de fechas para el fechaEntradas"),
body("idSucursal")
.isInt().
withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorEntrada.Editar);

ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorEntrada.Eliminar);
module.exports = ruta;