const {DataTypes, BOOLEAN} = require('sequelize');
const db = require('../configuraciones/db');
var datetime = Date.now();

const salidas = db.define('salidas',{
  id:{type:DataTypes.INTEGER,primaryKey: true, allowNull: false, autoIncrement:true},
  idCliente:{type:DataTypes.INTEGER, allowNull: false,
    validate: {isInt: true}
  },
  fecha_Salida:{type: DataTypes.DATE, allowNull: false,
    validate: {isDate: true/*, isBefore: datetime.toString().slice(0,10)*/}
  }
},
{
  tablaName: 'salidas'
});

module.exports = salidas;