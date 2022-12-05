const { where } = require("sequelize");
const Entrada = require("../modelos/Entrada");
const Cliente = require("../modelos/Cliente");
const Sucursal = require("../modelos/Sucursal");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { query } = require("express");

exports.Inicio = (req, res) => {
  const moduloEntrada = {
    modulo: "Entrada",
    descripcion: "Gestiona las operaciones con el modelo de entradas",
    rutas: [
      {
        ruta: "/api/entradas/listar",
        descripcion: "Lista los entradas de productos",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradas/guardar",
        descripcion: "Guarda los datos de una entrada de producto",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradas/editar",
        descripcion: "Modifica los datos de una entrada de producto",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradas/eliminar",
        descripcion: "Elimina los datos de una entrada de producto",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloEntrada);
};


exports.Listar = async (req, res) => {
  const listarEntradas = await Entrada.findAll();
  res.json(listarEntradas);
};

exports.BuscarId = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados' })
  }
  else {
    const { id } = req.query
    const listarEntradas = await Entrada.findAll({
      where: {
        id: { [Op.like]: id }
      }
    });
    res.json(listarEntradas);
  }

};

/*
exports.buscarnombreentrada  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { nombreentrada } = req.query
    const listarentradas = await entrada.findAll({
      where:{
        nombreentrada: nombreentrada
      }
    });
    res.json(listarentradas);
  }

};*/

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.errors);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { idCliente, fechaIngreso, SucursalId } = req.body;
    console.log(fechaIngreso);
    if (!idCliente || !fechaIngreso || !SucursalId) {
      res.json({ msj: "Debe enviar los datos completos de la entrada" });
    } else {
      var buscarCliente = await Cliente.findOne({ where: { id: idCliente } });
      if (!buscarCliente) {
        res.json({ msj: "debe de enviar los datos completos" });
      } else {
        var buscarSucursal = await Sucursal.findOne({ where: { id: SucursalId } });
        if (!buscarSucursal) {
          res.json({ msj: "debe de enviar los datos completos" });
        } else {
          await Entrada.create({
            idCliente: idCliente,
            fechaIngreso: fechaIngreso,
            SucursalId: SucursalId
          })
            .then((data) => {
            res.json({ msj: "Registro guardado" });
            })
            .catch((e) => {
              
              var errores = "";
              e.errors.forEach((element) => {
                console.log(element.message);
                errores += element.message + ". ";
              });
              res.json({ errores });
              console.log(errores);
            });
        }
      }
    }
  }
};

exports.Editar = async (req, res) => {
  const { id } = req.query;
  const { idCliente, fechaIngreso, SucursalId } = req.body;
  console.log(id);
  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!idCliente || !fechaIngreso || !SucursalId || !id) {

      res.send("Debe enviar los datos completos de la entrada");
    } else {
      var buscarEntrada = await Entrada.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarEntrada) {
        res.send("El id de la entrada no existe");
      } else {
        buscarEntrada.idCliente = idCliente,
          buscarEntrada.fechaIngreso = fechaIngreso,
          buscarEntrada.SucursalId = SucursalId;
        await buscarEntrada
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
    await Entrada.destroy({ where: { id: id } })
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