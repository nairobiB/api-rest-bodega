const { DataTypes } = require("sequelize");
const db = require("../configuraciones/db");
const Cliente = db.define(
  "Cliente",
  {
    /*
    Nombre
    Direccion
    correo
    numTelefono
    CodigoPostal
    FechaNacimiento
    */

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    nombreCompleto: {
      type: DataTypes.STRING(150),
      allowNull: false,

      validate: {
        len: [5, 150],
      },
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        len: [5, 50],
      },
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    fechaNac: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    RTN: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },

  {
    tableName: "clientes",
  }
);
module.exports = Cliente;
