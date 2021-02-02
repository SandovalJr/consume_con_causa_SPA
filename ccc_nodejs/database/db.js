const { Sequelize, Model, DataTypes } = require("sequelize");
const db = {};
const sequelize = new Sequelize("consume_con_causa", "root", "root2020", {
//const sequelize = new Sequelize("consume_con_causa", "root", "", {
  //Pass Local root2020
  host: "localhost",
  dialect: "mysql",
  // se cambio de false a 1 por un warning
  operatorsAliases: 1,

  pool: {
    max: 5, //numero maximo de conexiones
    min: 0, //numero minimo de conexiones
    acquire: 30000, //tiempo de inactividad en milisegundos para ser liberada la conexion
    idle: 10000,
  },
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Model = Model;
db.DataTypes = DataTypes;

console.log("Conexion Realizada");

module.exports = db;
