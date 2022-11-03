const { where } = require("sequelize");
const { validationResult } = require("express-validator");
const { query } = require("express");
const Usuario = require("../modelos/usuario");
const Rol = require('../modelos/rol');

exports.Inicio = (req, res) => {
  const moduloUsuario = {
    modulo: "usuarios",
    descripcion: "Gestiona las operaciones con el modelo de usuarios",
    rutas: [
      {
        ruta: "/api/usuarios/listar",
        descripcion: "Lista los usuarios",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/usuarios/guardar",
        descripcion: "Guarda los datos de un usuarios",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/usuarios/editar",
        descripcion: "Modifica los datos de un usuarios",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/usuarios/eliminar",
        descripcion: "Elimina los datos de un usuarios",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloUsuario);
};


exports.Listar = async (req, res) => {
  const listarUsuarios = await Usuario.findAll();
  res.json(listarUsuarios);
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarUsuarios = await Usuario.findAll({
      where:{
        id: id
      }
    });
    res.json(listarUsuarios);
  }

};

exports.buscarnombreUsuario  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { usuario } = req.query
    const listarUsuario = await Usuario.findAll({
      where:{
        usuario: usuario
      }
    });
    res.json(listarUsuario);
  }

};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
        const { usuario, contrasena } = req.body;
        console.log(usuario);
        if (!usuario || !contrasena) {
        res.json({ msj: "Debe enviar los datos completos del usuario" });
        }else{
            await Usuario.create({
              usuario: usuario,
              contrasena : contrasena
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
  const { usuario, contrasena } = req.body;
  console.log(id);

  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!usuario || !contrasena) {

      res.send("Ingrese el usuario y la contrasena");
    } else {
      var buscarUsuario = await Usuario.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarUsuario) {
        res.send("El id del usuario no existe");
      } else {
        buscarUsuario.usuario = usuario;
        buscarUsuario.contrasena = contrasena;
        await buscarUsuario
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
    await Usuario.destroy({ where: { id: id } })
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