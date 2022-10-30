
const { where } = require("sequelize");
const Categoria = require("../modelos/Categoria");
const Seccion = require("../modelos/Seccion");
const { validationResult } = require("express-validator");
const { query } = require("express");

exports.Inicio = (req, res) => {
  const moduloCategoria = {
    modulo: "categorias",
    descripcion: "Gestiona las operaciones con el modelo de categorias",
    rutas: [
      {
        ruta: "/api/Categorias/listar",
        descripcion: "Lista los categorias de productos",
        metodo: "GET", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/categorias/guardar", 
        descripcion: "Guarda los datos de un categoria de producto",
        metodo: "POST", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/categorias/editar",
        descripcion: "Modifica los datos de un categoria de producto",
        metodo: "PUT", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/categorias/eliminar",
        descripcion: "Elimina los datos de un categoria de producto",
        metodo: "DELETE", 
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloCategoria);
};


exports.Listar = async (req, res) => {
  const listarCategorias = await Categoria.findAll();
  res.json(listarCategorias);
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarCategorias = await Categoria.findAll({
      where:{
        id: id
      }
    });
    res.json(listarCategorias);
  }

};

exports.buscarnombreCategoria  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { nombreCategoria } = req.query
    const listarCategorias = await Categoria.findAll({
      where:{
        nombreCategoria: nombreCategoria
      }
    });
    res.json(listarCategorias);
  }

};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreCategoria, SeccionId } = req.body;
    console.log(nombreCategoria);
    if (!nombreCategoria || !SeccionId) {
      res.json({ msj: "Debe enviar los datos completos de la categoria" });
    }else{
      var buscarSeccion = await Seccion.findOne({where: {id:SeccionId}});
        if(!buscarSeccion){
          res.json({msj: "debe de enviar los datos completos"});
        }else{
          await Categoria.create({
          nombreCategoria: nombreCategoria,
          SeccionId : SeccionId
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
  const { nombreCategoria } = req.body;


  console.log(id); 

  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!nombreCategoria) {

      res.send("Ingrese el nombreCategoria");
    } else {
      var buscarCategoria = await Categoria.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarCategoria) {
        res.send("El id del categoria no existe");
      } else {
        buscarCategoria.nombreCategoria = nombreCategoria;
        await buscarCategoria
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