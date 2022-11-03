const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Entrada = db.define(
    'Entrada',
    {
        idCliente: { type: DataTypes.INTEGER, allowNull: false},
        fechaIngreso:{type: DataTypes.DATE, allowNull: false},
        idSucursal: { type: DataTypes.INTEGER, allowNull: false}
    },
    {
        tableName: 'entradas'
    }
);

module.exports = Entrada;