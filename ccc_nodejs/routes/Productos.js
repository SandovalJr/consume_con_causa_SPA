//aquí declaramos las rutas para nuestro user
const express = require("express");
const productos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Producto = require("../models/Producto");
const bcrypt = require("bcrypt");

productos.use(cors());

process.env.SECRET_KEY = "secret";

productos.get("/Productosapiwork", (req, res) => {
  res.json({ status: "API PRODUCTOS WORKS" });
});

// registro producto
productos.post("/registerProducto", (req, res) => {
  const today = new Date().toJSON();
  const productoData = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
    genero: req.body.genero,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    marca: req.body.marca,
    otras_caracteristicas: req.body.otras_caracteristicas,
    created: today,
    nombre_empresa: req.body.nombre_empresa,
    imagen: req.body.imagen,
  };
  console.log(productoData);
  Producto.findOne({
    where: {
      nombre: req.body.nombre,
    },
  })
    .then((producto) => {
      if (!producto) {
        Producto.create(productoData)
          .then(function (producto) {
            res.status(200).json(productoData);
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// Listar productos por empresa
productos.get("/LPE/:nombre_empresa", (req, res) => {
  console.log(req.body.nombre_empresa);
  Producto.findAll({
    where: {
      nombre_empresa: req.params.nombre_empresa,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("data no hay");
      }
    })
    .catch((errr) => {
      res.send("error" + errr);
    });
});
// Listar productos en general
productos.get("/LPEGeneral", (req, res) => {
  // console.log(req.body.nombre_empresa);
  Producto.findAll({
    where: {},
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("data no hay");
      }
    })
    .catch((errr) => {
      res.send("error" + errr);
    });
});

// Eliminar productos
productos.get("/eliminarProducto/:id_producto", (req, res) => {
  Producto.destroy({
    where: {
      id_producto: req.params.id_producto,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Informacion para editar
productos.get("/InformacionProducto/:id_producto", (req, res) => {
  Producto.findOne({
    where: {
      id_producto: req.params.id_producto,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Editar informacion de los productos
productos.put("/actualizarProducto/:id_producto", (req, res) => {
  const productoData = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
    genero: req.body.genero,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    marca: req.body.marca,
    otras_caracteristicas: req.body.otras_caracteristicas,
    nombre_empresa: req.body.nombre_empresa,
    imagen: req.body.imagen,
  };

  console.log("---------------------");
  console.log(productoData);

  Producto.update(productoData, {
    where: {
      id_producto: req.params.id_producto,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = productos;