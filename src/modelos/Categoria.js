const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Categoria = db.define(
    'Categoria',
    {
        nombreCategoria: { type: DataTypes.STRING(50), allowNull: false,
            unique: {arg: true, msg: 'No se permiten nombres de categoría duplicados en el tipo'},
            validate: {
                len: [3, 50]
            }
        },
    },
    {
        tableName: 'categorias'
    }
);

module.exports = Categoria;