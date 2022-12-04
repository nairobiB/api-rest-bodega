const { where } = require("sequelize");
const Categoria = require("../modelos/rol");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { query } = require("express");
const Rol = require("../modelos/rol");

exports.Inicio = (req, res) => {
  const moduloRoles = {
    modulo: "roles",
    descripcion: "Gestiona las operaciones con el modelo de roles",
    rutas: [
      {
        ruta: "/api/roles/listar",
        descripcion: "Lista los roles",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/roles/guardar",
        descripcion: "Guarda los datos de un roles",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/roles/editar",
        descripcion: "Modifica los datos de un roles",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/roles/eliminar",
        descripcion: "Elimina los datos de un roles",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloRoles);
};


exports.Listar = async (req, res) => {
  const listarRoles = await Rol.findAll();
  res.json(listarRoles);
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarRoles = await Rol.findAll({
      where:{
        id: id
      }
    });
    res.json(listarRoles);
  }

};

exports.buscarnombreRol  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { nombreRol } = req.query
    const listarRol = await Rol.findAll({
      where:{
        nombreRol:{ [Op.like]: nombreRol}
      }
    });
    res.json(listarRol);
  }

};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
        const { nombreRol } = req.body;
        console.log(nombreRol);
        if (!nombreRol) {
        res.json({ msj: "Debe enviar los datos completos del rol" });
        }else{
            await Rol.create({
              nombreRol: nombreRol
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
  const { nombreRol } = req.body;
  console.log(id);

  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!nombreRol) {

      res.send("Ingrese el nombre del rol");
    } else {
      var buscarRol = await Rol.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarRol) {
        res.send("El id del categoria no existe");
      } else {
        buscarRol.nombreRol = nombreRol;
        await buscarRol
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
    await Categoria.destroy({ where: { id: id } })
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