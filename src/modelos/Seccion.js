const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Seccion = db.define(
    'Seccion',
    {
        nombreSeccion: { type: DataTypes.STRING(50), allowNull: false,
            unique: {arg: true, msg: 'No se permiten nombres de las secciones duplicadas'},
            validate: {
                len: [3, 50]
            }
        },
    },
    {
        tableName: 'secciones'
    }
);

module.exports = Seccion;