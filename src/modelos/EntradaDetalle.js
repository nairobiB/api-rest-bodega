const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const EntradaDetalle = db.define(
    'EntradaDetalle',
    {
        idEntrada: { type: DataTypes.INTEGER, allowNull: false, primaryKey:true, unique: false},
        idProducto: { type: DataTypes.INTEGER, allowNull: false,primaryKey:true, unique: true},
        Tamanio: { type: DataTypes.STRING(50), allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        numLote: { type: DataTypes.INTEGER, allowNull: false},
        precio:{type: DataTypes.DOUBLE, allowNull: false},
        fechaVencimiento:{type: DataTypes.DATE, allowNull: false},
        idSeccion: { type: DataTypes.INTEGER, allowNull: false}

    },
    {
        tableName: 'entradasDetalle'
    }
);

module.exports = EntradaDetalle;