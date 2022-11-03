//Fase 1: git add .
//Fase 2: git commit -m"comentario"
//Fase 3: git push origin dev
//Comando para cambiar entre ramas: git checkout main
//Para el pull: git pull origin main
//recuperar una version anterior: git log, copiar el id mas reciente de rama y git checkout Id_de_la_rama


const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require('./configuraciones/db');
const Modelos = require('./modelos');


app.set("port", 4001);
//Puerto que se utilizará
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Bienvenido a la API");
});

app.use('/api/secciones', require('./rutas/Seccion'));
app.use('/api/categorias', require('./rutas/Categoria'));
app.use('/api/productos', require('./rutas/Producto'));
/*app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto ${app.get("port")}`);
});*/

app.listen(app.get('port'), ()=>{//esta tiene que ser la ultima linea del codigo
  console.log('Servidor iniciado en el puerto ' + app.get('port'));
  db.authenticate().then(() =>{
      console.log('Se estableció la conexión con la base de datos');
      Modelos.CrearModelos();
  })
  .catch((error) => {
      console.log('Error en la conexión');
      console.log(error);
  })
});


//Hola no soy Emo