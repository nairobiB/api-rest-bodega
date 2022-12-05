const { Router } = require("express");
const controladorEntrada = require("../controladores/Entrada");
const { ValidarAutendicado } = require("../configuraciones/passport");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorEntrada.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorEntrada.Listar); 

ruta.get(
    "/buscarid", 
    query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
    controladorEntrada.BuscarId
  );

ruta.post("/guardar", ValidarAutendicado,
body("idCliente")
.isInt().
withMessage("Solo se aceptan valores enteros para el idCliente"),
body("fechaIngreso")
.isDate().
withMessage("Solo se aceptan fechas para la fecha entrada"),
body("SucursalId")
.isInt().
withMessage("Solo se aceptan valores enteros para el SucursalId"),
controladorEntrada.Guardar);

ruta.put("/editar", ValidarAutendicado,
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
body("SucursalId")
.isInt().
withMessage("Solo se aceptan valores enteros para el SucursalId"),
controladorEntrada.Editar);

ruta.delete("/eliminar", ValidarAutendicado,
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorEntrada.Eliminar);
module.exports = ruta;