const { DataTypes } = require("sequelize");
const db = require("../configuraciones/db");
const Sucursal = db.define(
  "Sucursal",
  {
    nombreSucursal: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        arg: true,
        msg: "No se permiten nombres de sucursales duplicados en el tipo",
      },
      validate: {
        len: [3, 50],
      },
    },

    Direccion: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            len: [10, 80],
            //msg: "La dirección debe contener minimo 10 caracteres"
        }
    },
  },
  {
    tableName: "sucursales",
  }
);

module.exports = Sucursal;