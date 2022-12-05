//aqui van los modelos
//How to create a foreign key with an existing column in sequelize: https://sequelize.org/docs/v6/other-topics/legacy/
//Assosciation of sequelize: https://sequelize.org/docs/v6/core-concepts/assocs/  OJO LEANLO ESTA SUPER

const Categoria = require("./Categoria");
const Seccion = require("./Seccion");
const Personal = require("./Personal");
const salidas = require("./salidas");
const detalles_Salida = require("./detalles_Salida");
const Sucursal = require("./Sucursal");
const Cliente = require("./Cliente");
const Rol = require('./rol');
const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Entrada = require('./Entrada');
const EntradaDetalles = require('./EntradaDetalle');

exports.CrearModelos = () => {

  Seccion.hasMany(Categoria);
  Categoria.belongsTo(Seccion);

  Rol.hasOne(Personal);
  Personal.belongsTo(Rol);

  Sucursal.hasMany(Personal);
  Personal.belongsTo(Sucursal);

  Personal.hasOne(Usuario);
  Usuario.belongsTo(Personal);

  // Usuario.hasMany(Bitacora , {foreignKey: 'UserId'});
  // Bitacora.belongsTo(Usuario);

  Sucursal.hasMany(salidas);
  salidas.belongsTo(Sucursal);

  Sucursal.hasMany(Entrada, { foreignKey: 'SucursalId' });
  Entrada.belongsTo(Sucursal, { foreignKey: 'id' });

  Cliente.hasMany(salidas, { foreignKey: 'idCliente' });
  salidas.belongsTo(Cliente, { foreignKey: 'idCliente' });

  Cliente.hasMany(Entrada, { foreignKey: 'idCliente' });
  Entrada.belongsTo(Cliente, { foreignKey: 'idCliente' });

  salidas.hasMany(detalles_Salida, { foreignKey: 'idSalida' });
  detalles_Salida.belongsTo(salidas, { foreignKey: 'idSalida' });

  Entrada.hasMany(EntradaDetalles, { foreignKey: 'idEntrada' });
  EntradaDetalles.belongsTo(Entrada, { foreignKey: 'idEntrada' });
 
  Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });
  Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });

  Producto.hasMany(EntradaDetalles, { foreignKey: 'idProducto' });
  EntradaDetalles.belongsTo(Producto, { foreignKey: 'idProducto' });

  Producto.hasMany(detalles_Salida, { foreignKey: 'idProducto' });
  detalles_Salida.belongsTo(Producto, { foreignKey: 'idProducto' });

  Seccion.hasMany(EntradaDetalles, { foreignKey: 'idSeccion' });
  EntradaDetalles.belongsTo(Seccion, { foreignKey: 'idSeccion' });

  Seccion.hasMany(detalles_Salida, { foreignKey: 'idSeccion' });
  detalles_Salida.belongsTo(Seccion, { foreignKey: 'idSeccion' });


  Seccion.sync()
  .then((data) => {
    console.log("Modelo creado correctamente");
    console.log(data);
  })

  .catch((error) => {
    console.log("Error al crear el modelo");
    console.log(error);
  });
  Categoria.sync()
  .then((data) => {
    console.log("Modelo creado correctamente");
    console.log(data);
  })

  .catch((error) => {
    console.log("Error al crear el modelo");
    console.log(error);
  });

Producto.sync().then((data) => {
  console.log('Modelo creado correctamente');
  console.log(data);
})//sincronizar

  .catch((error) => {
    console.log('Error al crear el modelo');
    console.log(error);
  })

  Rol.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })

  Sucursal.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  Personal.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  Usuario.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })

  Cliente.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  Entrada.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })

  salidas.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });



  EntradaDetalles.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })

  detalles_Salida.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });
};
