//aqui van los modelos
const Categoria = require('./Categoria');
const Seccion = require('./Seccion');
const Rol = require('./rol');
const Usuario = require('./usuario');

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
    Rol.sync().then((data) =>{
        console.log('Modelo creado correctamente');
        console.log(data);
    })//sincronizar

    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })
    Usuario.sync().then((data) =>{
        console.log('Modelo creado correctamente');
        console.log(data);
    })//sincronizar

    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })




}