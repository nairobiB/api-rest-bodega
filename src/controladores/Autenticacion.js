const { validationResult } = require("express-validator");
const passport = require("../configuraciones/passport");
const Usuario = require("../modelos/usuario");
//const Personal = require("../modelos/Personal");
const { Op } = require("sequelize");
const msjRes = require("../componentes/mensaje");
const EnviarCorreo = require("../configuraciones/correo");
const gpc = require("generate-pincode");
function validacion(req) {
  var errores;
  var validaciones = validationResult(req);
  var error = {
    mensaje: "",
    parametro: "",
  };
  if (validaciones.errors.length > 0) {
    validaciones.errors.forEach((element) => {
      error.mensaje = element.msg;
      error.parametro = element.param;
      //errores.push(error);
    });
  }
  return errores;
}
/*exports.Pin = async (req, res) => {
  var errores = validacion(req);
  console.log(errores);
  if (errores) {
    msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
  } else {
    const { correo } = req.body;
    var buscarUsuario = await Usuario.findOne({
      where: {
        correo: correo,
      },
    });
    if (!buscarUsuario) {
      errores = [
        {
          mensaje: "El correo no exite o no esta vinculado con ningun usuario",
          parametro: "correo",
        },
      ];
      msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
    } else {
      const pin = gpc(4);
      const data = {
        correo: correo,
        pin: pin,
      };
      console.log(pin);
      if (await EnviarCorreo.EnviarCorreo(data)) {
        buscarUsuario.codigo = pin;
        await buscarUsuario.save();
        msjRes(
          "Peticion ejecutada correctamente",
          200,
          { msj: "Correo Enviado" },
          errores,
          res
        );
      } else {
        errores = [
          {
            mensaje: "Error al enviar el correo",
            parametro: "correo",
          },
        ];
        msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
      }
    }
  }
};

exports.Recuperar = async (req, res) => {
  var msj = validacion(req);
  console.log(msj);
  if (msj) {
    msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
  } else {
    const busuario = req.query.usuario;
    const { pin, contrasena } = req.body;
    var buscarUsuario = await Usuario.findOne({
      where: {
        [Op.or]: {
          correo: busuario,
          usuario: busuario,
        },
      },
    });
    console.log(buscarUsuario);
    if (!buscarUsuario) {
      var errores = [
        {
          mensaje: "El correo o usuario no existe",
          parametro: "usuario",
        },
      ];
      msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
    } else {
      if (pin != buscarUsuario.codigo) {
        var errores = [
          {
            mensaje: "El pin es incorrecto o ha expirado",
            parametro: "pin",
          },
        ];
        msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
      } else {
        //const hash = bcrypt.hashSync(contrasena, 10);
        buscarUsuario.contrasena = contrasena;
        buscarUsuario.estado = "AC";
        buscarUsuario.fallidos = 0;
        buscarUsuario.codigo = "0000";
        await buscarUsuario
          .save()
          .then((data) => {
            console.log(data);
            msjRes("Peticion ejecutada correctamente", 200, data, [], res);
          })
          .catch((error) => {
            msjRes("Peticion ejecutada correctamente", 200, [], error, res);
          });
      }
    }
  }
};*/
exports.InicioSesion = async (req, res) => {
  var msj = validacion(req);
  if (msj) {
    msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
  } else {
    try {
      const { usuario, contrasena } = req.body;
      var buscarUsuario = await Usuario.findOne({
        attributes: ["usuario", "contrasena", "correo", "id"],
        /*include: {
          model: Personal,
          attributes: [
            "nombreCompleto",
            "direccion",
            "correo",
            "telefono",
            "fechaNac",
          ],
        },*/
        where: {
          [Op.or]: {
            usuario: usuario,
            correo: usuario,
          },
          activo: "AC",
        },
      });
      if (!buscarUsuario) {
        var errores = [
          {
            mensaje: "El usuario no existe o se encuentra bloqueado",
            parametro: "usuario",
          },
        ];
        msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
      } else {
        console.log(buscarUsuario);
        if (
          buscarUsuario.VerificarContrasena(
            contrasena,
            buscarUsuario.contrasena
          )
        ) {
          const token = passport.getToken({ id: buscarUsuario.id });
          const data = {
            token: token,
            usuario: {
              usuario: buscarUsuario.usuario,
              correo: buscarUsuario.correo,
              /*nombreCompleto: buscarUsuario.Personal.nombreCompleto,
              direccion: buscarUsuario.Personal.direccion,
              telefono: buscarUsuario.Personal.telefono,
              fechaNac: buscarUsuario.Personal.fechaNac,*/
            },
          };
          msjRes("Peticion ejecutada correctamente", 200, data, [], res);
        } else {
          var errores = [
            {
              mensaje: "El usuario no existe o la contraseña es incorrecta",
              parametro: "contrasena",
            },
          ];
          buscarUsuario.fallidos = buscarUsuario.fallidos + 1;
          await buscarUsuario
            .save()
            .then((data) => {
              console.log(data);
            })
            .catch((er) => {
              console.log(er);
              errores = er;
            });
          msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
        }
      }
    } catch (error) {
      console.log(error);
      errores = "Error al conectar con la base de datos";
      msjRes("Error al Ejecutar la Peticion", 500, [error], errores, res);
    }
  }
};

exports.Error = async (req, res) => {
  var errores = [
    {
      mensaje: "Debe enviar las credenciales correctas",
      parametro: "autenticacion",
    },
  ];
  msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
};
