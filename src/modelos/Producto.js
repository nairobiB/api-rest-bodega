const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Producto = db.define(
    'Producto',
    {
        nombreProducto: { type: DataTypes.STRING(50), allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        precioUnitario:{ type: DataTypes.DOUBLE,allowNull: false},
        precioVenta:{ type: DataTypes.DOUBLE, allowNull: false},
        idCategoria:{ type: DataTypes.INTEGER, allowNull: false},
        imagen:{type: DataTypes.STRING(250), allowNull:true}
    },
    {
        tableName: 'productos'
    }
);

module.exports = Producto;