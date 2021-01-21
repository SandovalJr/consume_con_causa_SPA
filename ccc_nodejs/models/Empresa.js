const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "Empresas",
  {
    id_empresa: {
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
    nombre_empresa: {
      type: Sequelize.STRING,
    },
    correo: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    giro_empresa: {
      type: Sequelize.STRING,
    },
    direccion: {
      type: Sequelize.STRING,
    },
    cp: {
      type: Sequelize.INTEGER,
    },
    ciudad: {
      type: Sequelize.STRING,
    },
    rfc: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    imagen: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.STRING,
    },
    link_fb: {
      type: Sequelize.STRING,
    },
    link_whatsapp: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
