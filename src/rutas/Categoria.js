const { Router } = require("express");
const controladorCategorias = require("../controladores/Categoria");
const {body, query}= require('express-validator');
const ruta = Router();

ruta.get("/", controladorCategorias.Inicio);
ruta.get("/listar", controladorCategorias.Listar);
ruta.post("/guardar", 
body("nombreCategoria")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
    ),
controladorCategorias.Guardar);
ruta.put("/editar", 
query("nombreCategoria")
.isLength({ min: 3, max: 50 })
.withMessage(
  "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
),
controladorCategorias.Editar);
ruta.delete("/eliminar", 
query("id").isInt().
withMessage("Solo se aceptan valores enteros para el id"),
controladorCategorias.Eliminar);
module.exports = ruta;