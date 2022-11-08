const { where } = require("sequelize");
const MSJ = require('../componentes/mensaje');
const fs = require('fs');
const path = require('path');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametro: ''
};
const { validationResult } = require("express-validator");
const { query } = require("express");
const Usuario = require("../modelos/Usuario");
const Personal = require("../modelos/Personal");

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
        const { usuario, contrasena, permisos, correo, activo, PersonalId } = req.body;
        console.log(usuario);
        if (!usuario || !contrasena) {
        res.json({ msj: "Debe enviar los datos completos del usuario" });
        }else{
          var buscarPersonal = await Personal.findOne({ where: { id: PersonalId } });
          
          if (!buscarPersonal) {
            res.json({ msj: "El ID del Cliente no existe" });
          }

          else{
          
          if(contrasena < 5){
            res.json({ msj: "La contraseña debe tener al menos 4 caracteres" })
            console.log("La contraseña debe tener al menos 4 caracteres")
          }
            await Usuario.create({
              usuario: usuario,
              contrasena : contrasena,
              permisos : permisos,
              correo : correo,
              activo : activo,
              PersonalId: PersonalId
            })
            .then((data) => {
            res.json({ msj: "Registro guardado" });
            })
            .catch((er) => {
            var errores = "";
            /*er.errors.forEach(element => {
                //console.log(element.message);
                errores += element.message + ". ";
            });*/
            res.json( "errores" );
            console.log(er);
            });
          }
        }
    }
};


exports.Editar = async (req, res) => {
  const { id } = req.query;
  const { usuario, contrasena, permisos, correo, activo, PersonalId } = req.body;
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
      } 
      else {

        var buscarPersonal = await Personal.findOne({ where: { id: PersonalId } });
          
        if (!buscarPersonal) {
          res.json({ msj: "El ID del Cliente no existe" });
        }

        buscarUsuario.usuario = usuario;
        buscarUsuario.contrasena = contrasena;
        buscarUsuario.permisos = permisos;
        buscarUsuario.activo = activo;
        buscarUsuario.correo = correo;
        buscarUsuario.PersonalId = PersonalId;
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

exports.RecibirImagen = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.body;
  //console.log(req);
  console.log(filename);
  try {
      errores=[];
      data=[];
      var buscarUsuario = await Usuario.findOne({ where:{ id}});
      if(!buscarUsuario){
          const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/usuarios/' + filename));
          if(!buscarImagen)
              console.log('La imagen no existe');
          else{
              fs.unlinkSync(path.join(__dirname, '../public/img/usuarios/' + filename));
              console.log('Imagen eliminada');
          }
          error.msg='El id del tipo no existe. Se elimino la imagen enviada';
          error.parametro='id';
          errores.push(error);
          MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
      }else{
          const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/usuarios/' + buscarUsuario.imagen));
          if(!buscarImagen)
              console.log('No encontro la imagen');
          else{
              fs.unlinkSync(path.join(__dirname, '../public/img/usuarios/' + buscarUsuario.imagen));
              console.log('Imagen eliminada');
          }
          buscarUsuario.imagen=filename;
          await buscarUsuario.save()
          .then((data)=>{
              MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
          })
          .catch((error)=>{
              errores.push(error);
              MSJ('Peticion ejecutada correctamente', 200, [], errores, res);
          });
      }
  } catch (error) {
      console.log(error);
      errores.push(error);
      MSJ('Error al ejecutar la peticion', 500, [], errores, res);
  }
}