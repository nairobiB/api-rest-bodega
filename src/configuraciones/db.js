const sequelize = require('sequelize')
const db = new sequelize(
'bodega', 
'devs',
'movil2',
{
    host:'localhost',
    dialect: 'mysql',
    port: '3306',
}
);
module.exports=db
