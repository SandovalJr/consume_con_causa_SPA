const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "Productos",
  {
    id_producto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    categoria: {
      type: Sequelize.STRING,
    },
    precio: {
      type: Sequelize.FLOAT,
    },
    genero: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    marca: {
      type: Sequelize.STRING,
    },
    otras_caracteristicas: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.STRING,
    },
    nombre_empresa: {
      type: Sequelize.STRING,
    },
    imagen: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
