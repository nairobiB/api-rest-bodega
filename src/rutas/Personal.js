const { Router } = require("express");
const controladorPersonal = require("../controladores/Personal");
const { body, query } = require("express-validator");

const ruta = Router();
ruta.get("/", controladorPersonal.Inicio);
ruta.get("/listar", controladorPersonal.Listar);
ruta.get(
  "/buscarid",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorPersonal.BuscarId
);
ruta.post(
  "/guardar",
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
      "Debe escribir el nombre del personal con una longitud de 5 - 150 caracteres"
    ),
  controladorPersonal.BuscarNombre
);

ruta.put(
  "/editar",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  body("nombreCompleto")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del personal con una longitud de 3 - 50 caracteres"
    ),
  controladorPersonal.Editar
);
ruta.delete(
  "/eliminar",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorPersonal.Eliminar
);

module.exports = ruta;
