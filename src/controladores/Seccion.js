const { where } = require("sequelize");
const Seccion = require("../modelos/Seccion"); 
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { query } = require("express");

exports.Inicio = (req, res) => {
  const moduloSeccion = {
    modulo: "secciones",
    descripcion: "Gestiona las operaciones con el modelo de secciones",
    rutas: [
      {
        ruta: "/api/Secciones/listar",
        descripcion: "Lista las secciones de productos",
        metodo: "GET", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/secciones/guardar", 
        descripcion: "Guarda los datos de una seccion de productos",
        metodo: "POST", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/secciones/editar",
        descripcion: "Modifica los datos de una seccion de los productos",
        metodo: "PUT", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/secciones/eliminar",
        descripcion: "Elimina los datos de una seccion de productos",
        metodo: "DELETE", 
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloSeccion);
};


exports.Listar = async (req, res) => {
  const listarSecciones = await Seccion.findAll();
  res.json(listarSecciones);
};

/*exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarSecciones = await Seccion.findAll({
      where:{
        id: id
      }
    });
    res.json(listarSecciones);
  }

};*/

exports.buscarnombreSeccion  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { nombreSeccion } = req.query
    const listarSecciones = await Seccion.findAll({
      where:{
        nombreSeccion: { [Op.like]: nombreSeccion}
      }
    });
    res.json(listarSecciones);
  }

};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreSeccion } = req.body;
    console.log(nombreSeccion);
    if (!nombreSeccion) {
      res.json({ msj: "Debe enviar el nombre de la seccion" });
    } else {
      await Seccion.create({
        nombreSeccion: nombreSeccion,
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
  const { nombreSeccion } = req.body;


  console.log(id); 

  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!nombreSeccion) {

      res.send("Ingrese el nombreSeccion");
    } else {
      var buscarSeccion = await Seccion.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarSeccion) {
        res.send("El id de la seccione no existe");
      } else {
        buscarSeccion.nombreSeccion = nombreSeccion;
        await buscarSeccion
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
    await Seccion.destroy({ where: { id: id } })
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