const{Router}= require('express');
const controladorDetallesSalida = require('../controladores/detalles_Salida');
const ruta = Router();
ruta.get('/listar',controladorDetallesSalida.Listar);
ruta.post('/guardar',controladorDetallesSalida.Guardar);
ruta.put('/editar',controladorDetallesSalida.Editar);
ruta.delete('/eliminar',controladorDetallesSalida.Eliminar);
module.exports = ruta;