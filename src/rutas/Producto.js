const { Router } = require("express");
const controladorProducto = require("../controladores/Producto");
const {body, query}= require('express-validator');
const { ValidarAutendicado } = require("../configuraciones/passport");
const path = require('path');
const multer = require('multer');
const ruta = Router();

const storageProductos = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img/productos'));
    },
    filename: function (req, file, cb){
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
    }
});
const uploadProductos = multer({storage: storageProductos

});

ruta.get("/", controladorProducto.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorProducto.Listar);

  ruta.get(
    "/buscarnombre", 
    query("nombreProducto")
      .isLength({ min: 1, max: 50 })
      .withMessage(
        "Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres"
      ),
    controladorProducto.BuscarNombre
  );

ruta.post("/guardar", ValidarAutendicado,
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

ruta.put("/editar", ValidarAutendicado,
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
ruta.delete("/eliminar", ValidarAutendicado,
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorProducto.Eliminar);
ruta.post('/imagen', ValidarAutendicado,
uploadProductos.single('img'), 
controladorProducto.RecibirImagen);
module.exports = ruta;