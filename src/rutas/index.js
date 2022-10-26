const { Router } = require ('express');
const controladorinicio = require('../controladores/controladorinicio')
const ruta = Router();


ruta.get('/', controladorinicio.Inicio);