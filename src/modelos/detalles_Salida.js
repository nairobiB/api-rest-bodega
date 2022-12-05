const {DataTypes, BOOLEAN} = require('sequelize');
const db = require('../configuraciones/db');

// how to create a compound key = https://stackoverflow.com/questions/59163675/composite-primary-key-in-sequelize#:~:text=You%20can%20create%20composite%20primary,E.g.&text=how%20can%20we%20associate%20a%20table%20to%20this%20composite%20key.

const detalles_Salida = db.define('detalles_Salida',{
  idSalida:{type:DataTypes.INTEGER,primaryKey: true, unique: false, 
    allowNull: false,
    validate: {isInt: true}},
  idProducto:{type:DataTypes.INTEGER,primaryKey: true, unique: true
    ,allowNull: false,
    validate: {isInt: true}},
  tamanio:{type: DataTypes.DOUBLE, allowNull: false,
    validate: {isFloat: true, min: 1}
  },
  precio:{type: DataTypes.DOUBLE, allowNull: false,
    validate: {isFloat: true, min: 1}
  },
  lotes:{type: DataTypes.STRING(75), allowNull: false,
    validate: {len: [3,50], notEmpty: true, isAlphanumeric: true}
  },
  idSeccion:{type:DataTypes.INTEGER, allowNull: false,
    validate: {isInt: true}}
},
{
  tablaName: 'detalles_Salida'
});

module.exports = detalles_Salida;