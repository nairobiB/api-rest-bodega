//aqui van los modelos
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Seccion = require('./Seccion');

exports.CrearModelos = () => {
    Seccion.hasMany(Categoria);
    Categoria.belongsTo(Seccion);

    Categoria.hasMany(Producto);
    Producto.belongsTo(Categoria);

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

    Producto.sync().then((data) =>{
        console.log('Modelo creado correctamente');
        console.log(data);
    })//sincronizar
    
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })


}