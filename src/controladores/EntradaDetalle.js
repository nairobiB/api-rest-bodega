
const { where } = require("sequelize");
const Entrada= require("../modelos/Entrada");
const Producto = require("../modelos/Producto");
const Seccion = require("../modelos/Seccion");
const { validationResult } = require("express-validator");
const { query } = require("express");
const { Op } = require("sequelize");
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
  const listarEntradaDetalles= await EntradaDetalle.findAll();
  res.json(listarEntradaDetalles);
}

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { idProducto } = req.query
    const listarEntradaDetalles = await detalles_Salida.findAll({
      where:{
        idProducto: { [Op.like]: idProducto }
      }
    });
    res.json(listarEntradaDetalles);
  }
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { idEntrada } = req.query
    var buscarEntrada = await EntradaDetalle.findOne({where: {id:idEntrada}});
    res.json(buscarEntrada);
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
    const {idEntrada, idProducto,Tamanio, numLote, precio, fechaVencimiento, idSeccion} = req.body;
    var buscarEntrada = await Entrada.findOne({where: {id:idEntrada}});
        if(!buscarEntrada){
          res.json({msj: "La entrada no existe"});
        }else
        {
        if (!idEntrada || !idProducto || !Tamanio || !numLote || !precio || !fechaVencimiento || !idSeccion) {
          res.json({ msj: "Debe enviar los datos completos de la entrada" });
       }else{      
            var buscarProducto = await Producto.findOne({where: {id:idProducto}});
            if(!buscarProducto){
            res.json({msj: "El producto no existe"});
            }else{
                var buscarSeccion = await Seccion.findOne({where: {id:idSeccion}});
                if(!buscarSeccion){
                res.json({msj: "La seccion no existe"});
                }else{
                    await EntradaDetalle.create({
                        idEntrada:idEntrada,
                        idProducto:idProducto,
                        Tamanio: Tamanio, 
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
  const { idEntrada, idProducto} = req.query;
  const { Tamanio, numLote, precio, fechaVencimiento, idSeccion} = req.body;
  if (!idEntrada || !idProducto) {

    res.send("El registro no existe");
  } else {
    if (!Tamanio || !numLote || !precio || !fechaVencimiento || !idSeccion) {
      res.send("Debe enviar los datos completos de la entrada");
    } else {
      var buscarEntradaDetalle = await EntradaDetalle.findOne({
        where: {
          idEntrada: idEntrada,
          idProducto:idProducto
        },
      });

      if (!buscarEntradaDetalle) {
        res.send("El id de la entrada no existe");
      } else {
        buscarEntradaDetalle.Tamanio=Tamanio,
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
  const { idEntrada} = req.query;
  if (!idEntrada ) {
    res.json("Debe escribir el Id");
  } else {
    await EntradaDetalle.destroy({ where: { idEntrada: idEntrada } })
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