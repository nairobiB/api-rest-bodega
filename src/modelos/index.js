//aqui van los modelos
//How to create a foreign key with an existing column in sequelize: https://sequelize.org/docs/v6/other-topics/legacy/
const Categoria = require("./Categoria");
const Seccion = require("./Seccion");
const Personal = require("./Personal");
<<<<<<< HEAD
const salidas = require("./salidas");
const detalles_Salida = require("./detalles_Salida");
=======
const Sucursal = require("./Sucursal");
const Cliente = require("./Cliente");
>>>>>>> 3be789674308d1f6c2fdc1433eb397a508d2e4cf

exports.CrearModelos = () => {
  Seccion.hasMany(Categoria);
  Categoria.belongsTo(Seccion);

  //Debido a que las tablas de Producto y Clientes aun no estaban en Github dejo una lineas comentadas para hacer la relacion entre ellas

  // salidas.hasMany(productos, { foreignKey: 'idProducto' });
  // productos.belongsTo(salidas, { foreignKey: 'id' });
  // salidas.hasMany(clientes, { foreignKey: 'idCliente' });
  // clientes.belongsTo(salidas, { foreignKey: 'id' });

  salidas.hasMany(detalles_Salida, { foreignKey: 'idSalida' });
  detalles_Salida.belongsTo(salidas, { foreignKey: 'id' });
  salidas.hasMany(detalles_Salida, { foreignKey: 'idProducto' });
  detalles_Salida.belongsTo(salidas, { foreignKey: 'idProducto' });

  detalles_Salida.belongsTo(Seccion, { foreignKey: 'id' });
  Seccion.hasOne(detalles_Salida, { foreignKey: 'idSeccion' })

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

<<<<<<< HEAD
  salidas.sync()
=======
    Sucursal.sync()
>>>>>>> 3be789674308d1f6c2fdc1433eb397a508d2e4cf
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });

<<<<<<< HEAD
  detalles_Salida.sync()
=======
    Cliente.sync()
>>>>>>> 3be789674308d1f6c2fdc1433eb397a508d2e4cf
    .then((data) => {
      console.log("Modelo creado correctamente");
      console.log(data);
    })

    .catch((error) => {
      console.log("Error al crear el modelo");
      console.log(error);
    });
};
