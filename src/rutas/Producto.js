const { Router } = require("express");
const controladorProducto = require("../controladores/Producto");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorProducto.Inicio);
ruta.get("/listar", controladorProducto.Listar);
ruta.post("/guardar", 
body("nombreProducto")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres"
    ),
body("precioUnitario")
    .isDecimal().
    withMessage("Solo se aceptan valores enteros para el precioUnitario"),
body("precioVenta")
    .isDecimal().
    withMessage("Solo se aceptan valores enteros para el precioVenta"),
body("idCategoria")
    .isInt().
    withMessage("Solo se aceptan valores enteros para el idCategoria"),
controladorProducto.Guardar);

ruta.put("/editar", 
query("nombreProducto")
.isLength({ min: 3, max: 50 })
.withMessage(
  "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
),
query("precioUnitario")
    .isDecimal().
    withMessage("Solo se aceptan valores enteros para el precioUnitario"),
query("precioVenta")
    .isDecimal().
    withMessage("Solo se aceptan valores enteros para el precioVenta"),
query("idCategoria")
    .isInt().
    withMessage("Solo se aceptan valores enteros para el idCategoria"),
controladorProducto.Editar);
ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorProducto.Eliminar);
module.exports = ruta;