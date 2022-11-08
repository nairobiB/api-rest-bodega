const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db');
const Usuario = db.define(
    'Usuario',
    {
        usuario: { type: DataTypes.STRING(50), allowNull: false,
            unique: {arg: true, msg: 'No se permiten nombres de roles duplicados'},
            validate: {
                len: [3, 50]
            }
        },
        contrasena: {type: DataTypes.STRING(20), allowNull: false,
            validate: {
                len: [5, 20]
            }
        },
        permisos: {type: DataTypes.STRING(15), allowNull: true,
            validate: {
                len: [3, 15]
            }
        }, 
        imagen:{type: DataTypes.STRING(250), allowNull:true}
    },
    {
        tableName: 'usuarios'
    }
);

module.exports = Usuario;