const{Router}= require('express');
const controladorSalidas = require('../controladores/salidas');
const { ValidarAutendicado } = require("../configuraciones/passport");
const ruta = Router();
const {body, query}= require('express-validator');

ruta.get('/listar', ValidarAutendicado, controladorSalidas.Listar);

ruta.get(
    "/buscarid", 
    query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
    controladorSalidas.BuscarId
  );

ruta.post('/guardar', ValidarAutendicado,
body("idCliente").isInt().withMessage("Solo se aceptan valores enteros para el idCliente"),
body("fecha_Salida").isDate().withMessage("Solo se aceptan valores enteros para el numLote"),
body("SucursalId").isInt().withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorSalidas.Guardar);

ruta.put('/editar', ValidarAutendicado,
query("id").isInt().withMessage("Solo se aceptan valores enteros para el id de entrada"),
body("idCliente").isInt().withMessage("Solo se aceptan valores enteros para el idCliente"),
body("fecha_Salida").isDate().withMessage("Solo se aceptan valores de fechas para el fecha_Salida"),
body("idSucursal").isInt().withMessage("Solo se aceptan valores enteros para el idSucursal"),
controladorSalidas.Editar);

ruta.delete('/eliminar', ValidarAutendicado, controladorSalidas.Eliminar);
module.exports = ruta;