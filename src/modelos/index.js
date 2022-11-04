//aqui van los modelos
//How to create a foreign key with an existing column in sequelize: https://sequelize.org/docs/v6/other-topics/legacy/
const Categoria = require("./Categoria");
const Seccion = require("./Seccion");
const Personal = require("./Personal");
const salidas = require("./salidas");
const detalles_Salida = require("./detalles_Salida");
const Sucursal = require("./Sucursal");
const Cliente = require("./Cliente");
const Rol = require('./rol');
const Usuario = require('./usuario');
const Producto = require('./Producto');
const Entrada = require('./Entrada');
const EntradaDetalles = require('./EntradaDetalle');

exports.CrearModelos = () => {

  //Debido a que las tablas de Producto y Clientes aun no estaban en Github dejo una lineas comentadas para hacer la relacion entre ellas

  Seccion.hasMany(Categoria);
  Categoria.belongsTo(Seccion);

  Categoria.hasMany(Producto);
  Producto.belongsTo(Categoria);

  Sucursal.hasMany(Entrada);
  Entrada.belongsTo(Sucursal);

  Sucursal.hasMany(Personal);
  Personal.belongsTo(Sucursal);

  Sucursal.hasMany(salidas);
  salidas.belongsTo(Sucursal);

  Cliente.hasMany(salidas, {foreignKey: 'id'});
  salidas.belongsTo(Cliente, {foreignKey: 'idCliente'});

  salidas.hasMany(detalles_Salida, { foreignKey: 'id' });
  detalles_Salida.belongsTo(salidas, { foreignKey: 'idSalida' });

  Producto.hasMany(detalles_Salida, { foreignKey: 'id' });
  detalles_Salida.belongsTo(Producto, { foreignKey: 'idProducto' });

  Seccion.hasMany(detalles_Salida, { foreignKey: 'id' });
  detalles_Salida.belongsTo(Seccion, { foreignKey: 'idSeccion' });

  Cliente.hasMany(Entrada, { foreignKey: 'id' });
  Entrada.belongsTo(Cliente, { foreignKey: 'idCliente' });

  Entrada.hasMany(EntradaDetalles, { foreignKey: 'idEntrada' });
  EntradaDetalles.belongsTo(Entrada, { foreignKey: 'idEntrada' });

  EntradaDetalles.belongsToMany(Producto, { through: 'EntradaDetalles_has_Producto', foreignKey: 'idProducto' });
  Producto.belongsToMany(EntradaDetalles, { through: 'EntradaDetalles_has_Producto', foreignKey: 'id' });

  Seccion.hasMany(EntradaDetalles, { foreignKey: 'id' })
  EntradaDetalles.belongsTo(Seccion, { foreignKey: 'idSeccion' });


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

  Personal.sync()
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

  EntradaDetalles.sync().then((data) => {
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

  Sucursal.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  detalles_Salida.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  Cliente.sync()
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

  Rol.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })
  Usuario.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })

  Producto.sync().then((data) => {
    console.log('Modelo creado correctamente');
    console.log(data);
  })//sincronizar

    .catch((error) => {
      console.log('Error al crear el modelo');
      console.log(error);
    })
};
