const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "clientes",
  {
    id_cliente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    correo: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    fecha_de_nacimiento: {
      type: Sequelize.STRING,
    },
    genero: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    admin: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
