const { validationResult } = require('express-validator');
const salida = require("../modelos/salidas");
const Producto = require("../modelos/Producto");
const Seccion = require("../modelos/Seccion");
const { Op } = require("sequelize");
const detalles_Salida = require('../modelos/detalles_Salida');

exports.Inicio = (req, res) => {
  const modulo_Detalles_Salida = {
    modulo: "detalles_Salida",
    descripcion: 'Gestiona las operaciones con el modelo de detalles_Salida',
    rutas: [
      {
        ruta: '/api/detalles_Salida/listar',
        descripcion: 'Lista los de productos',
        metodo: 'GET',
        parametros: 'n/a'
      },
      {
        ruta: '/api/detalles_Salida/guardar',
        descripcion: 'Guarda los datos de los detalles de una salida',
        metodo: 'POST',
        parametros: 'n/a'
      },
      {
        ruta: '/api/detalles_Salida/editar',
        descripcion: 'Modifica los datos de los detalles de una salida',
        metodo: 'PUT',
        parametros: 'n/a'
      },
      {
        ruta: '/api/detalles_Salida/eliminar',
        descripcion: 'Elimina los datos de los detalles de una salida',
        metodo: 'DELETE',
        parametros: 'n/a'
      },
    ]
  }
  res.json(modulo_Detalles_Salida);
}

exports.Listar = async (req, res) => {
  const listar_Detalles_Salida = await detalles_Salida.findAll();
  res.json(listar_Detalles_Salida);
}

exports.BuscarId  = async (req, res) => {
  const validacion = validationResult(req);
  if(!validacion.isEmpty()){
    console.log(validacion.errores);
    res.json({ msj: 'Errores en los datos enviados'})
  }
  else{
    const { idProducto } = req.query
    const listar_Detalles_Salida = await detalles_Salida.findAll({
      where:{
        idProducto: { [Op.like]: idProducto }
      }
    });
    res.json(listar_Detalles_Salida);
  }
};


exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty) {
    console.log(validacion.errors);
    res.json({ msj: 'Errores en los datos' })
  } else {
    const { idSalida, idProducto, tamanio, precio, lotes, idSeccion } = req.body;

    if (!idSalida || !idProducto || !tamanio || !precio || !lotes || !idSeccion) {
      res.json({ msj: "debe enviar los datos del detalle salida" });
    } else {
      var buscarSalida = await salida.findOne({ where: { id: idSalida } });
      var buscarProducto = await Producto.findOne({ where: { id: idProducto } });
      var buscarSeccion = await Seccion.findOne({ where: { id: idSeccion } });

      if (!buscarSalida) {
        res.json({ msj: "La Salida no existe" });
      }
      else if (!buscarProducto) {
        res.json({ msj: "El producto no existe" });
      }

      else if (!buscarSeccion) {
        res.json({ msj: "La Seccion no existe" });
      }

      else {
        await detalles_Salida.create({
          idSalida: idSalida,
          idProducto: idProducto,
          tamanio: tamanio,
          precio: precio,
          lotes: lotes,
          idSeccion: idSeccion
        }).then((data) => {
          res.json({ msj: "Registro guardado correctamente" })
        }).catch((e) => {
          var errors = '';
          e.errors.forEach(element => {
            console.log(element.message);
            errors += element.message;
          });
          res.json({ errors });
          console.log(e);
        })
      }
    }
  }
}

exports.Editar = async (req, res) => {
  const { idSalida, idProducto } = req.query;
  const { tamanio, precio, lotes, idSeccion } = req.body;

  if (!idSalida || !idProducto || !tamanio || !precio || !lotes || !idSeccion) {
    res.json({ msj: "Debe enviar los datos completos" });
  } else {
    var buscarDetalleSalida = await detalles_Salida.findOne({ where: { idSalida: idSalida, idProducto: idProducto } });
    if (!buscarDetalleSalida) {
      res.send('El id del detalles_Salida no existe');
    } else {
      var buscarSalida = await salida.findOne({ where: { id: idSalida } });
      var buscarProducto = await Producto.findOne({ where: { id: idProducto } });
      var buscarSeccion = await Seccion.findOne({ where: { id: idSeccion } });

      if (!buscarSalida) {
        res.json({ msj: "La Salida no existe" });
      }
      else if (!buscarProducto) {
        res.json({ msj: "El producto no existe" });
      }

      else if (!buscarSeccion) {
        res.json({ msj: "La Seccion no existe" });
      } else {
        buscarDetalleSalida.idSalida = idSalida;
        buscarDetalleSalida.idProducto = idProducto;
        buscarDetalleSalida.tamanio = tamanio;
        buscarDetalleSalida.precio = precio;
        buscarDetalleSalida.lotes = lotes;
        buscarDetalleSalida.idSeccion = idSeccion;
        await buscarDetalleSalida.save()
          .then((data) => {
            console.log(data);
            res.send('Modificado correctamente');
          })
          .catch((e) => {
            console.log(e);
            res.send('Error al Guardar los cambios');
          })
      }
    }
  }
}

exports.Eliminar = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.json({ msj: "Debe enviar el ID del dato" });
  } else {
    await detalles_Salida.destroy({ where: { id: id } })
      .then((data) => {
        res.send('Datos Eliminados: ' + data)
      })
      .catch((e) => {
        res.send('Error al eliminar el Registro')
      })
  }
}
