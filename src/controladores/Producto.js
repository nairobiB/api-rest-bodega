
const { where } = require("sequelize");
const Producto = require("../modelos/Producto");
const Categoria = require("../modelos/Categoria");
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

exports.Inicio = (req, res) => {
  const moduloProducto = {
    modulo: "productos",
    descripcion: "Gestiona las operaciones con el modelo de productos",
    rutas: [
      {
        ruta: "/api/productos/listar",
        descripcion: "Lista los productos",
        metodo: "GET", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/productos/guardar", 
        descripcion: "Guarda los datos de un producto",
        metodo: "POST", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/productos/editar",
        descripcion: "Modifica los datos de un producto",
        metodo: "PUT", 
        parametros: "Ninguno",
      },
      {
        ruta: "/api/productos/eliminar",
        descripcion: "Elimina los datos de un producto",
        metodo: "DELETE", 
        parametros: "Ninguno",
      },
    ],
  };
  res.json(moduloProducto);
};


exports.Listar = async (req, res) => {
  const listarProductos = await Producto.findAll();
  res.json(listarProductos);
};

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { id } = req.query
    const listarProductos = await Producto.findAll({
      where:{
        id: id
      }
    });
    res.json(listarProductos);
  }

};

exports.buscarnombreProducto  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { nombreProducto } = req.query
    const listarProductos = await Producto.findAll({
      where:{
        nombreProducto: nombreProducto
      }
    });
    res.json(listarProductos);
  }

};

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion);
    res.json({ msj: "Errores en los datos" });
  } else {
    const { nombreProducto, precioUnitario, precioVenta, idCategoria } = req.body;
    console.log(nombreProducto);
    if (!nombreProducto || !precioUnitario || !precioVenta || !idCategoria) {
      res.json({ msj: "Debe enviar los datos completos del producto" });
    }else{
      var buscarCategoria = await Categoria.findOne({where: {id:idCategoria}});
        if(!buscarCategoria){
          res.json({msj: "debe de enviar los datos completos"});
        }else{
          await Producto.create({
          nombreProducto: nombreProducto,
          precioUnitario: precioUnitario,
          precioVenta: precioVenta,
          idCategoria : idCategoria
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
  const { nombreProducto, precioUnitario, precioVenta, idCategoria } = req.body;
  console.log(id); 

  if (!id) {

    res.send("Ingrese el ID");
  } else {
    if (!nombreProducto || !precioUnitario || !precioVenta || !idCategoria || !id) {

      res.send("Ingrese los detalles del producto");
    } else {
      var buscarnombreProducto = await Producto.findOne({
        where: {
          id: id,
        },
      });

      if (!buscarnombreProducto) {
        res.send("El id del producto no existe");
      } else {
        buscarnombreProducto.nombreProducto = nombreProducto,
        buscarnombreProducto.precioUnitario = precioUnitario,
        buscarnombreProducto.precioVenta = precioVenta,
        buscarnombreProducto.idCategoria = idCategoria;
        await buscarnombreProducto
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
    await Producto.destroy({ where: { id: id } })
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
      var buscarProducto = await Producto.findOne({ where:{ id: id }});
      if(!buscarProducto){
          const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/productos/' + filename));
          if(!buscarImagen)
              console.log('La imagen no existe');
          else{
              fs.unlinkSync(path.join(__dirname, '../public/img/productos/' + filename));
              console.log('Imagen eliminada');
          }
          error.msg='El id del tipo no existe. Se elimino la imagen enviada';
          error.parametro='id';
          errores.push(error);
          MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
      }else{
          const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/productos/' + buscarProducto.imagen));
          if(!buscarImagen)
              console.log('No encontro la imagen');
          else{
              fs.unlinkSync(path.join(__dirname, '../public/img/productos/' + buscarProducto.imagen));
              console.log('Imagen eliminada');
          }
          buscarProducto.imagen=filename;
          await buscarProducto.save()
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