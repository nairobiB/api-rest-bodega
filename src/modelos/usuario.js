const { DataTypes } = require("sequelize");
const db = require("../configuraciones/db");
const bcrypt = require("bcrypt");
const Usuario = db.define(
  "Usuario",
  {
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        arg: true,
        msg: "No se permiten nombres de usuarios duplicados",
      },
      validate: {
        len: [3, 50],
      },
    },
    contrasena: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [5, 65],
      },
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        arg: true,
        msg: "No se permiten correos de usuarios duplicados",
      },
      validate: {
        len: [5, 50],
      },
    },
    permisos: {
      type: DataTypes.STRING(15), allowNull: true,
      validate: {
        len: [3, 15]
      }
    },

    codigo: {
      type: DataTypes.STRING(10),
      allowNull: true, defaultValue: '0000'
    },
    fallido: {
      type: DataTypes.INTEGER,
      allowNull: true, defaultValue: 0
    },


    activo: {
      type: DataTypes.ENUM("AC", "IN", "BL"),
      allowNull: true,
      defaultValue: "AC",
    },

    imagen: { type: DataTypes.STRING(250), allowNull: true }
  },
  {
    tableName: 'usuarios',
    hooks: {
      beforeCreate(usuario) {
        const hash = bcrypt.hashSync(usuario.contrasena, 10);
        usuario.contrasena = hash;
      },
      beforeUpdate(usuario) {
        if (usuario.contrasena) {
          const hash = bcrypt.hashSync(usuario.contrasena, 10);
          usuario.contrasena = hash;
        }
        if (usuario.fallido >= 5)
          usuario.estado = 'BL';
      },
    },
  }
);

Usuario.prototype.VerificarContrasena = (con, com) => {
  return bcrypt.compareSync(con, com);
};

module.exports = Usuario;
