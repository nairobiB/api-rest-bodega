const {DataTypes, BOOLEAN} = require('sequelize');
const db = require('../configuraciones/db');
var datetime = Date.now();

const salidas = db.define('salidas',{
  id:{type:DataTypes.INTEGER,primaryKey: true, allowNull: false, autoIncrement:true},
  idProducto:{type:DataTypes.INTEGER, allowNull: false,
    validate: {isInt: true}
  },
  idCliente:{type:DataTypes.INTEGER, allowNull: false,
    validate: {isInt: true}
  },
  producto:{type: DataTypes.STRING(75), allowNull: false,
    validate: {len: [3,50], notEmpty: true, isAlphanumeric: true}
  },
  precio:{type: DataTypes.DOUBLE, allowNull: false,
    validate: {isFloat: true, min: 1}
  },
  fecha_Salida:{type: DataTypes.DATE, allowNull: false,
    validate: {isDate: true, isBefore: datetime.toISOString().slice(0,10)}
  },
  hora_Salida:{type: DataTypes.STRING(75), allowNull: false,
    validate: {notEmpty: true}
  }
},
{
  tablaName: 'salidas'
});

module.exports = salidas;