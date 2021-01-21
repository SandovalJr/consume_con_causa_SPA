const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "ventas_productos",
  {
    id_ventap: {
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
    tipo_pago: {
      type: Sequelize.STRING,
    },
    nombre_producto: {
      type: Sequelize.STRING,
    },
    descripcion_producto: {
      type: Sequelize.STRING,
    },
    cantidad_producto: {
      type: Sequelize.INTEGER,
    },
    total_compra: {
      type: Sequelize.FLOAT,
    },
    imagen_producto: {
      type: Sequelize.STRING,
    },
    fecha_compra: {
      type: Sequelize.STRING,
    },
    estatus_compra: {
      type: Sequelize.STRING,
    },
    nombre_empresa: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
