const { Router } = require("express");
const controladorPersonal = require("../controladores/Personal");
const { ValidarAutendicado } = require("../configuraciones/passport");
const { body, query } = require("express-validator");

const ruta = Router();
ruta.get("/", controladorPersonal.Inicio);
ruta.get("/listar", ValidarAutendicado, controladorPersonal.Listar);
ruta.get(
  "/buscarid",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorPersonal.BuscarId
);
ruta.post(
  "/guardar", ValidarAutendicado,
  body("nombreCompleto")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del personal con una longitud de 5 - 150 caracteres"
    ),
  controladorPersonal.Guardar
);

ruta.get(
  "/buscarnombre", 
  query("nombreCompleto")
    .isLength({ min: 1, max: 150 })
    .withMessage(
      "Debe escribir el nombre del personal con una longitud de 1 - 150 caracteres"
    ),
  controladorPersonal.BuscarNombre
);

ruta.put(
  "/editar", ValidarAutendicado,
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  body("nombreCompleto")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del personal con una longitud de 3 - 50 caracteres"
    ),
  controladorPersonal.Editar
);
ruta.delete(
  "/eliminar", ValidarAutendicado,
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorPersonal.Eliminar
);

module.exports = ruta;
