//aqui van los modelos
const Categoria = require('./Categoria');
const Seccion = require('./Seccion');

exports.CrearModelos = () => {
    Seccion.hasMany(Categoria);
    Categoria.belongsTo(Seccion);

    Seccion.sync().then((data) =>{
        console.log('Modelo creado correctamente');
        console.log(data);
    })//sincronizar
    
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Categoria.sync().then((data) =>{
        console.log('Modelo creado correctamente');
        console.log(data);
    })//sincronizar
    
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })





}