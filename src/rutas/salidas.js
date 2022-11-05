const{Router}= require('express');
const controladorSalidas = require('../controladores/salidas');
const ruta = Router();
ruta.get('/listar',controladorSalidas.Listar);
ruta.post('/guardar',controladorSalidas.Guardar);
ruta.put('/editar',controladorSalidas.Editar);
ruta.delete('/eliminar',controladorSalidas.Eliminar);
module.exports = ruta;