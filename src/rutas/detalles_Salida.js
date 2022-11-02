const{Router}= require('express');
const controladorDetallesSalida = require('../controladores/cliente');
const ruta = Router();
ruta.get('/listar',controladorDetallesSalida.Inicio);
ruta.post('/guardar',controladorDetallesSalida.Guardar);
ruta.put('/editar',controladorDetallesSalida.Editar);
ruta.delete('/eliminar',controladorDetallesSalida.Eliminar);
module.exports = ruta;