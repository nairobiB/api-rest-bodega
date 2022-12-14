const { Router } = require("express");
const controladorCliente = require("../controladores/Cliente");
const { body, query } = require("express-validator");

const ruta = Router();
ruta.get("/", controladorCliente.Inicio);
ruta.get("/listar", controladorCliente.Listar);
ruta.get(
  "/buscarid",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorCliente.BuscarId
);
ruta.post(
  "/guardar",
  body("nombreCompleto")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del cliente con una longitud de 5 - 150 caracteres"
    ),
  controladorCliente.Guardar
);

ruta.get(
  "/buscarnombre",
  query("nombreCompleto")
    .isLength({ min: 1, max: 150 })
    .withMessage(
      "Debe escribir el nombre del cliente con una longitud de 5 - 150 caracteres"
    ),
  controladorCliente.BuscarNombre
);

ruta.put(
  "/editar",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  body("nombreCompleto")
    .isLength({ min: 5, max: 150 })
    .withMessage(
      "Debe escribir el nombre del cliente con una longitud de 3 - 50 caracteres"
    ),
  controladorCliente.Editar
);
ruta.delete(
  "/eliminar",
  query("id").isInt().withMessage("Solo se aceptan valores enteros para el id"),
  controladorCliente.Eliminar
);

module.exports = ruta;
