const{Router}= require('express');
const {body, query}= require('express-validator');
const controladorDetallesSalida = require('../controladores/detalles_Salida');
const { ValidarAutendicado } = require("../configuraciones/passport");
const ruta = Router();

ruta.get('/listar', ValidarAutendicado, controladorDetallesSalida.Listar);

ruta.get(
    "/buscarid", 
    query("idProducto").isInt().withMessage("Solo se aceptan valores enteros para el id del producto"),
    controladorDetallesSalida.BuscarId
);

ruta.post('/guardar', ValidarAutendicado,
body("idSalida").isInt().withMessage("Solo se aceptan valores enteros para el idSalida"),
body("idProducto").isInt().withMessage("Solo se aceptan valores enteros para el idProducto"),
body("tamanio").isFloat().withMessage("Solo se aceptan valores enteros para el tamanio"),
body("precio").isFloat().withMessage("Solo se aceptan valores enteros para el precio"),
body("lotes").isInt().withMessage("Solo se aceptan valores enteros para el lotes"),
body("idSeccion").isFloat().withMessage("Solo se aceptan valores enteros para el idSeccion"),
controladorDetallesSalida.Guardar);

ruta.put('/editar', ValidarAutendicado,
query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
body("idSalida").isInt().withMessage("Solo se aceptan valores enteros para el idSalida"),
body("idProducto").isInt().withMessage("Solo se aceptan valores enteros para el idProducto"),
body("tamanio").isFloat().withMessage("Solo se aceptan valores enteros para el tamanio"),
body("precio").isFloat().withMessage("Solo se aceptan valores enteros para el precio"),
body("lotes").isInt().withMessage("Solo se aceptan valores enteros para el lotes"),
body("idSeccion").isFloat().withMessage("Solo se aceptan valores enteros para el idSeccion")
,controladorDetallesSalida.Editar);

ruta.delete('/eliminar', ValidarAutendicado,
query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
controladorDetallesSalida.Eliminar);

module.exports = ruta;