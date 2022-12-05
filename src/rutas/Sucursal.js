const { Router } = require("express");
const { ValidarAutendicado } = require("../configuraciones/passport");
const controladorSucursales = require("../controladores/Sucursal");
const { body, query } = require("express-validator");
const ruta = Router();

ruta.get("/", controladorSucursales.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorSucursales.Listar);
ruta.get(
  "/buscarnombre", ValidarAutendicado,
  query("nombreSucursal")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del tipo con una longitud de 5 - 150 caracteres"
    ),
  controladorSucursales.BuscarNombre
);
ruta.get(
  "/buscarid", ValidarAutendicado,
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorSucursales.BuscarId
);
ruta.post(
  "/guardar", ValidarAutendicado,
    body("nombreSucursal")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
    ),
    body("Direccion")
    .isLength({ min: 10, max: 80 })
    .withMessage(
      "Debe escribir el nombre de la sucursal con una longitud de 10 - 80 caracteres"
    ),
  controladorSucursales.Guardar
);
ruta.put(
  "/editar", ValidarAutendicado,
  query("nombreSucursal")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Debe escribir el nombre de la categoría con una longitud de 3 - 50 caracteres"
    ),
  controladorSucursales.Editar
);
ruta.delete(
  "/eliminar", ValidarAutendicado,
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorSucursales.Eliminar
);
module.exports = ruta;