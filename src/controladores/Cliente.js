const { where } = require("sequelize");
const Cliente = require("../modelos/Cliente");
const { validationResult } = require("express-validator");
const { query } = require("express");
const { Op } = require("sequelize");

exports.Inicio = (req, res) => {
  const moduloCliente = {
    modulo: "clientes",
    descripcion: "Gestiona las operaciones con el modelo de clientes",
    rutas: [
      {
        ruta: "/api/clientes/listar",
        descripcion: "Lista los clientes",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/clientes/guardar",
        descripcion: "Guarda los datos de un clientes",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/clientes/editar",
        descripcion: "Modifica los datos de un clientes",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/clientes/eliminar",
        descripcion: "Elimina los datos de un clientes",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloCliente);
};

exports.Listar = async (req, res) => {
  const listarClientes = await Cliente.findAll();
  res.json(listarClientes);
};

exports.BuscarId = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.errores);
    res.json({ msj: "Errores en los datos enviados" });
  } else {
    const { id } = req.query;
    const listarClientes = await Cliente.findAll({
      where: {
        id: id,
      },
    });
    res.json(listarClientes);
  }
};

exports.BuscarNombre = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreCompleto } = req.query;
    const listarClientes = await Cliente.findAll({
      attributes: [["nombreCompleto", "Nombre completo"]], //solo mostrar estos campos
      where: {
        nombreCompleto: {
          [Op.like]: nombreCompleto,
        },
      },
    });
    res.json(listarClientes);
  }
};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreCompleto, direccion, correo, telefono, fechaNac, RTN } = req.body;
    console.log(nombreCompleto);
    if (!nombreCompleto || !direccion || !correo || !telefono || !fechaNac || !RTN) {
      res.json({ msj: "Debe enviar los datos completos de los clientes" });
    } else {
      await Cliente.create({
        nombreCompleto: nombreCompleto,
        direccion: direccion,
        correo,
        telefono,
        fechaNac,
        RTN,
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
  const { nombreCompleto, direccion, correo, telefono, fechaNac, RTN } = req.body;

  console.log(id);

  if (!id) {
    res.send("Ingrese el ID");
  } else {
    if (!nombreCompleto || !direccion || !correo || !telefono || !fechaNac || !RTN) {
      res.send("Ingrese el los datos completos");
    } else {
      var buscarCliente = await Cliente.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarCliente) {
        res.send("El id del cliente no existe");
      } else {
        buscarCliente.nombreCompleto = nombreCompleto;
        buscarCliente.direccion = direccion;
        buscarCliente.correo = correo;
        buscarCliente.telefono = telefono;
        buscarCliente.fechaNac = fechaNac;
        buscarCliente.RTN = RTN;

        await buscarCliente
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
    await Cliente.destroy({ where: { id: id } })
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
