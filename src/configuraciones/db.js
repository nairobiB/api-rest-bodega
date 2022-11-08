const sequelize = require("sequelize");
const db = new sequelize("bodega", "devs", "movil2", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
});
module.exports = db;

/*const sequelize = require("sequelize");
const db = new sequelize(
  process.env.BASE_NOMBRE, //nombre de la base de datos
  process.env.BASE_USUARIO,
  process.env.BASE_CONTRASENA, //contraseña del usuario
  {
    host: process.env.BASE_SERVIDOR,
    dialect: "mysql",
    port: process.env.BASE_PUERTO,
  }
);
module.exports = db;*/
