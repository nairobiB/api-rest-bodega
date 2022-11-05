const salida = require('../modelos/salidas');
const Cliente = require("../modelos/Cliente");
const Sucursal = require("../modelos/Sucursal");
const { validationResult } = require('express-validator');
const Producto = require('../modelos/Producto');

exports.Inicio = (req, res) => {
  const moduloSalidas = {
    modulo: "salidas",
    descripcion: 'Gestiona las operaciones con el modelo de salidas',
    rutas: [
      {
        ruta: '/api/salida/listar',
        descripcion: 'Lista las de Salidas',
        metodo: 'GET',
        parametros: 'n/a'
      },
      {
        ruta: '/api/salida/guardar',
        descripcion: 'Guarda los datos de un salida de Salidas',
        metodo: 'POST',
        parametros: 'n/a'
      },
      {
        ruta: '/api/salida/editar',
        descripcion: 'Modifica los datos de un salida de Salidas',
        metodo: 'PUT',
        parametros: 'n/a'
      },
      {
        ruta: '/api/salida/eliminar',
        descripcion: 'Elimina los datos de un salida de Salidas',
        metodo: 'DELETE',
        parametros: 'n/a'
      },
    ]
  }
  res.json(moduloSalidas);
}

exports.Listar = async (req, res) => {
  const listarSalidas = await salida.findAll();
  res.json(listarSalidas);
}

exports.Guardar = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty) {
    console.log(validacion.errors);
    res.json({ msj: 'Errores en los datos' })
  } else {
    const { fecha_Salida, SucursalId, idCliente } = req.body;
    if (!idCliente || !fecha_Salida || !SucursalId ) {
      res.json({ msj: "debe enviar todos los datos" });
    } else {
      var buscarCliente = await Cliente.findOne({ where: { id: idCliente } });
      var buscarSucursal = await Sucursal.findOne({where: { id: SucursalId }});

      if (!buscarCliente) {
        res.json({ msj: "El ID del Cliente no existe" });
      }

      else if(!buscarSucursal) {
        res.json({ msj: "El ID de la Sucursal no existe" });
      }

      else {
        await salida.create({
          idCliente: idCliente,
          fecha_Salida: fecha_Salida,
          SucursalId,
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
  const { id  } = req.query;
  const { idCliente, fecha_Salida, SucursalId } = req.body;
  
  if (!id || !idCliente ||!fecha_Salida || !SucursalId) {
    res.json({ msj: "Debe enviar los datos completos" });
  } else {
    var buscarSalida = await salida.findOne({ where: { id: id } });
    if (!buscarSalida) {
      res.send('El id del salida no existe');
    } else {
      var buscarCliente = await Cliente.findOne({ where: { id: idCliente } });
      var buscarSucursal = await Sucursal.findOne({where: { id: SucursalId }});

      if (!buscarCliente) {
        res.json({ msj: "El Cliente no existe" });
      }

      else if(!buscarSucursal) {
        res.json({ msj: "El ID de la Sucursal no existe" });
      }

      else {
        buscarSalida.idCliente = idCliente;
        buscarSalida.fecha_Salida = fecha_Salida;
        buscarSalida.SucursalId= SucursalId
        await buscarSalida.save()
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
    await salida.destroy({ where: { id: id } })
      .then((data) => {
        res.send('Datos Eliminados: ' + data)
      })
      .catch((e) => {
        res.send('Error al eliminar el Registro')
      })
  }
}