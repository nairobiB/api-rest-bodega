const { where } = require("sequelize");
const Personal = require("../modelos/Personal");
const Sucursal = require("../modelos/Sucursal");
const Rol = require("../modelos/rol");
const { validationResult } = require("express-validator");
const { query } = require("express");
const { Op } = require("sequelize");

exports.Inicio = (req, res) => {
  const moduloPersonal = {
    modulo: "personal",
    descripcion: "Gestiona las operaciones con el modelo de personal",
    rutas: [
      {
        ruta: "/api/Personal/listar",
        descripcion: "Lista los personal",
        metodo: "GET",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/personal/guardar",
        descripcion: "Guarda los datos de un personal",
        metodo: "POST",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/personal/editar",
        descripcion: "Modifica los datos de un personal",
        metodo: "PUT",
        parametros: "Ninguno",
      },
      {
        ruta: "/api/personal/eliminar",
        descripcion: "Elimina los datos de un personal",
        metodo: "DELETE",
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloPersonal);
};

exports.Listar = async (req, res) => {
  const listarPersonal = await Personal.findAll();
  res.json(listarPersonal);
};

exports.BuscarId = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.errores);
    res.json({ msj: "Errores en los datos enviados" });
  } else {
    const { id } = req.query;
    const listarPersonal = await Personal.findAll({
      where: {
        id: id,
      },
    });
    res.json(listarPersonal);
  }
};

exports.BuscarNombre = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreCompleto } = req.query;
    const listarPersonal = await Personal.findAll({
      attributes: [["nombreCompleto", "Nombre completo"]], //solo mostrar estos campos
      where: {
        nombreCompleto: {
          [Op.like]: nombreCompleto,
        },
      },
    });
    res.json(listarPersonal);
  }
};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } 
  else {
    const { nombreCompleto, direccion, correo, telefono, fechaNac, RolId, SucursalId } = req.body;
    console.log(nombreCompleto);
    if (!nombreCompleto || !direccion || !correo || !telefono || !fechaNac || !RolId || !SucursalId) {
      res.json({ msj: "Debe enviar los datos completos de la personal" });
    }else{
      var buscarRol = await Rol.findOne({where: {id:RolId}});
      var buscarSucursal = await Sucursal.findOne({where: {id:SucursalId}});
      if(!buscarRol || !SucursalId){
          res.json({msj: "Debe ingresar los Ids correctos"});
      }
      else {
      await Personal.create({
        nombreCompleto: nombreCompleto,
        direccion: direccion,
        correo,
        telefono,
        fechaNac,
        RolId,
        SucursalId
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
  }
};

exports.Editar = async (req, res) => {
  const { id } = req.query;
  const { nombreCompleto, direccion, correo, telefono, fechaNac, RolId, SucursalId } = req.body;

  console.log(id);

  if (!id) {
    res.send("Ingrese el ID");
  } else {
    if (!nombreCompleto || !direccion || !correo || !telefono || !fechaNac || !RolId || !SucursalId) {
      res.send("Ingrese el los datos completos");
    } else {
      var buscarPersonal = await Personal.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarPersonal) {
        res.send("El id del personal no existe");
      } else {
        buscarPersonal.nombreCompleto = nombreCompleto;
        buscarPersonal.direccion = direccion;
        buscarPersonal.correo = correo;
        buscarPersonal.telefono = telefono;
        buscarPersonal.fechaNac = fechaNac;
        buscarPersonal.RolId = RolId;
        buscarPersonal.SucursalId = SucursalId;

        await buscarPersonal
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
    await Personal.destroy({ where: { id: id } })
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
