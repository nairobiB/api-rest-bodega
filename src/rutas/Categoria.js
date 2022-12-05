const { Router } = require("express");
const controladorCategorias = require("../controladores/Categoria");
const { ValidarAutendicado } = require("../configuraciones/passport");
const { body, query } = require("express-validator");
const ruta = Router();

ruta.get("/", controladorCategorias.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorCategorias.Listar);
ruta.get(
  "/buscarnombre", 
  query("nombreCategoria")
    .isLength({ min: 1, max: 150 })
    .withMessage(
      "Debe escribir el nombre del tipo con una longitud de 5 - 150 caracteres"
    ),
  controladorCategorias.BuscarNombre
);
ruta.get(
  "/buscarid", 
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorCategorias.BuscarId
);
ruta.post(
  "/guardar", ValidarAutendicado,
  body("nombreCategoria")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
    ),
  controladorCategorias.Guardar
);
ruta.put(
  "/editar", ValidarAutendicado,
  query("nombreCategoria")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
    ),
  controladorCategorias.Editar
);
ruta.delete(
  "/eliminar", ValidarAutendicado,
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorCategorias.Eliminar
);
module.exports = ruta;
