const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Rol = db.define(
    'Rol',
    {
        nombreRol: { type: DataTypes.STRING(50), allowNull: false,
            unique: {arg: true, msg: 'No se permiten nombres de roles duplicados'},
            validate: {
                len: [3, 50]
            }
        },
    },
    {
        tableName: 'roles'
    }
);

module.exports = Rol;