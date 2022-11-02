//aqui van los modelos
const Categoria = require("./Categoria");
const Seccion = require("./Seccion");
const Personal = require("./Personal");
const Sucursal = require("./Sucursal");
const Cliente = require("./Cliente");

exports.CrearModelos = () => {
  Seccion.hasMany(Categoria);
  Categoria.belongsTo(Seccion);

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

    Sucursal.sync()
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
};
