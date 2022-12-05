const { where } = require("sequelize");
const Sucursal = require("../modelos/Sucursal");
const Seccion = require("../modelos/Seccion");
const { validationResult } = require("express-validator");
const { query } = require("express");
const { Op } = require("sequelize");

exports.Inicio = (req, res) => {
  const moduloSucursal = {
    modulo: "sucursales",
    descripcion: "Gestiona las operaciones con el modelo de sucursales",
    rutas: [
      {
        ruta: "/api/Sucursales/listar",
        descripcion: "Lista las sucursales de la empresa",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/sucursales/guardar",
        descripcion: "Guarda los datos de una sucursal de la empresa",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/sucursales/editar",
        descripcion: "Modifica los datos de una sucursal existente de la empresa",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/sucursales/eliminar",
        descripcion: "Elimina una sucursal registrada de la empresa",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloSucursal);
};

exports.Listar = async (req, res) => {
  const listarSucursales = await Sucursal.findAll();
  res.json(listarSucursales);
};

exports.BuscarId = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.errores);
    res.json({ msj: "Errores en los datos enviados" });
  } else {
    const { id } = req.query;
    const listarSucursales = await Sucursal.findAll({
      where: {
        id: id,
      },
    });
    res.json(listarSucursales);
  }
};

exports.BuscarNombre = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreSucursal } = req.query;
    const listarSucursales = await Sucursal.findAll({
      //attributes: [["nombreSucursal", "Nombre sucursal"]], //solo mostrar estos campos
      where: {
        [Op.and]: {
          nombreSucursal: {
            [Op.like]: nombreSucursal,
          },
        },
      },
    });
    res.json(listarSucursales);
  }
};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreSucursal, Direccion } = req.body;
    console.log(nombreSucursal);
    if (!nombreSucursal || !Direccion) {
      res.json({ msj: "Debe enviar los datos completos de la sucursal" });
    } 
    else {
        await Sucursal.create({
          nombreSucursal: nombreSucursal,
          Direccion: Direccion,
        })
          .then((data) => {
            res.json({ msj: "Registro guardado" });
          })
          .catch((er) => {
            var errores = "";
            er.errors.forEach((element) => {
              console.log(element.message);
              errores += element.message + ". ";
            });
            res.json({ errores });
          });
    }
  }
};

exports.Editar = async (req, res) => {
  const { id } = req.query;
  const { nombreSucursal, Direccion } = req.body;

  console.log(id);

  if (!id) {
    res.send("Ingrese el ID");
  } else {
    if (!nombreSucursal || !Direccion) {
      res.send("Ingrese el nombreSucursal");
    } else {
      var buscarSucursal = await Sucursal.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarSucursal) {
        res.send("El id de la sucursal no existe");
      } else {
        buscarSucursal.nombreSucursal = nombreSucursal;
        buscarSucursal.Direccion = Direccion;
        await buscarSucursal
          .save()
          .then((data) => {
            console.log(data);
            res.send("Registro Modificado");
          })
          .catch((er) => {
            console.log(er);
            res.json("Error al modificar registro");
          });
      }
    }
  }
};

exports.Eliminar = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.json("Debe escribir el Id");
  } else {
    await Sucursal.destroy({ where: { id: id } })
      .then((data) => {
        if (data == 0) {
          res.send("El id no existe");
        } else {
          res.send("Registros eliminados: " + data);
        }
      })
      .catch((er) => {
        console.log(er);
        res.json("Error al eliminar Registro");
      });
  }
};