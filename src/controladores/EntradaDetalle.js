
const { where } = require("sequelize");
const Entrada= require("../modelos/Entrada");
const Producto = require("../modelos/Producto");
const Seccion = require("../modelos/Seccion");
const { validationResult } = require("express-validator");
const { query } = require("express");
const EntradaDetalle = require("../modelos/EntradaDetalle");

exports.Inicio = (req, res) => {
  const moduloEntradaDetalle = {
    modulo: "EntradaDetalle",
    descripcion: "Gestiona las operaciones con el modelo de detalles de entrada",
    rutas: [
      {
        ruta: "/api/entradadetalles/listar",
        descripcion: "Lista los detalles entradas de productos",
        metodo: "GET", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradadetalles/guardar", 
        descripcion: "Guarda los datos de una entrada de producto",
        metodo: "POST", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradadetalles/editar",
        descripcion: "Modifica los detalles de una entrada de producto",
        metodo: "PUT", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/entradadetalles/eliminar",
        descripcion: "Elimina los datos de una entrada de producto",
        metodo: "DELETE", 
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloEntradaDetalle);
};


exports.Listar = async (req, res) => {
  const listarEntradaDetalles = await EntradaDetalle.findAll();
  res.json(listarEntradaDetalles);
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarEntradaDetalles = await EntradaDetalle.findAll({
      where:{
        id: id
      }
    });
    res.json(listarEntradaDetalles);
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
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const {idEntrada, idProducto,tamanio, numLote, precio, fechaVencimiento, idSeccion} = req.body;
    console.log(tamanio, numLote, precio, fechaVencimiento);
    if (!idEntrada || !idProducto || !tamanio || !numLote || !precio || !fechaVencimiento || !idSeccion) {
      res.json({ msj: "Debe enviar los datos completos de la entrada" });
    }else{
      var buscarEntrada = await Entrada.findOne({where: {id:idEntrada}});
        if(!buscarEntrada){
          res.json({msj: "debe de enviar los datos completos"});
        }else
        {
            var buscarProducto = await Producto.findOne({where: {id:idProducto}});
            if(!buscarProducto){
            res.json({msj: "debe de enviar los datos completos"});
            }else{
                var buscarSeccion = await Seccion.findOne({where: {id:idSeccion}});
                if(!buscarSeccion){
                res.json({msj: "debe de enviar los datos completos"});
                }else{
                    await EntradaDetalle.create({
                        idEntrada:idEntrada,
                        idProducto:idProducto,
                        tamanio: tamanio, 
                        numLote:numLote,
                        precio:precio,
                        fechaVencimiento:fechaVencimiento, 
                        idSeccion:idSeccion
                
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
    }
  }
};

exports.Editar = async (req, res) => {
  const { id } = req.query;
  const { idEntrada, idProducto,tamanio, numLote, precio, fechaVencimiento, idSeccion} = req.body;
  console.log(id); 
  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!idEntrada || !idProducto || !tamanio || !numLote || !precio || !fechaVencimiento || !idSeccion) {
      res.send("Debe enviar los datos completos de la entrada");
    } else {
      var buscarEntradaDetalle = await EntradaDetalle.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarEntrada) {
        res.send("El id de la entrada no existe");
      } else {
        buscarEntradaDetalle.idEntrada=idEntrada,
        buscarEntradaDetalle.idProducto=idProducto,
        buscarEntradaDetalle.tamanio=tamanio,
        buscarEntradaDetalle.numLote=numLote,
        buscarEntradaDetalle.precio=precio,
        buscarEntradaDetalle.fechaVencimiento=fechaVencimiento,
        buscarEntradaDetalle.idSeccion=idSeccion;
        await buscarEntradaDetalle
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
    await EntradaDetalle.destroy({ where: { id: id } })
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