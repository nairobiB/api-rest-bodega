const salida = require('../modelos/salidas');
const {validationResult} = require('express-validator');

exports.Inicio = (req, res) =>{
  const moduloSalidas ={
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

exports.Listar = async (req, res)=>{
  const listarSalidas = await salida.findAll();
  res.json({operacion:'listar'});
}

exports.Guardar = async (req, res)=>{
  const validacion = validationResult(req);
  if(!validacion.isEmpty){
    console.log(validacion.errors);
    res.json({msj: 'Errores en los datos'})
  }else{
    const{idProducto} = req.body;
    const{idCliente} = req.body;
    const{producto} = req.body;
    const{precio} = req.body;
    const{fecha_Salida} = req.body;
    const{hora_Salida} = req.body;
    if(!idProducto||!idCliente||!producto||!precio||!fecha_Salida||!hora_Salida){
      res.json({msj: "debe enviar todos los datos"});
    }else{
      await salida.create({
        idProducto:idProducto,
        idCliente:idCliente,
        producto:producto,
        precio:precio,
        fecha_Salida:fecha_Salida,
        hora_Salida:hora_Salida,
      }).then((data)=>{
        res.json({msj: "Registro guardado correctamente"})
      }).catch((e)=>{
        var errors = '';
        e.errors.forEach(element => {
          console.log(element.message);
          errors += element.message;
        });
        res.json({errors});
        console.log(e);
      })
    }
  }
}

exports.Editar = async (req, res)=>{
  const {id} = req.query;
  const{idProducto} = req.body;
  const{idCliente} = req.body;
  const{producto} = req.body;
  const{precio} = req.body;
  const{fecha_Salida} = req.body;
  const{hora_Salida} = req.body;
  if(!id||!idProducto||!idCliente||!producto||!precio||!fecha_Salida||!hora_Salida){
    res.json({msj: "Debe enviar los datos completos"});
  }else{
    var buscarSalida = await salida.findOne({where: {id:id}});
    if(!buscarSalida){
      res.send('El id del salida no existe');
    }else{
      buscarSalida.idProducto=idProducto;
      buscarSalida.idCliente=idCliente;
      buscarSalida.producto=producto;
      buscarSalida.precio=precio;
      buscarSalida.fecha_Salida=fecha_Salida;
      buscarSalida.hora_Salida=hora_Salida;
      await buscarSalida.save()
      .then((data)=>{
        console.log(data);
        res.send('Modificado correctamente');
      })
      .catch((e)=>{
        console.log(e);
        res.send('Error al Guardar los cambios');
      })
    }
  }
}

exports.Eliminar = async (req, res)=>{
    const {id} = req.query;
    if(!id){
      res.json({msj: "Debe enviar el ID del dato"});
    }else{
      await salida.destroy({where:{id:id}})
      .then((data)=>{
        res.send('Datos Eliminados: ' + data)
      })
      .catch((e)=>{
        res.send('Error al eliminar el Registro')
      })
  }
}