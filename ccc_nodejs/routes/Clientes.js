//aquí declaramos las rutas para nuestro user
const express = require("express");
const clientes = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");
const bcrypt = require("bcrypt");

clientes.use(cors());

process.env.SECRET_KEY = "secret";

clientes.get("/", (req, res) => {
  res.json({ status: "API WORKS" });
});

// Lista clientes
clientes.get("/listarclientes", (req, res) => {
  Cliente.findAll({
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

// Lista cliente informacion
clientes.get("/informacionCliente/:id_cliente", (req, res) => {
  Cliente.findAll({
    where: {
      id_cliente: req.params.id_cliente,
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

// Eliminar clientes
clientes.get("/deleteCliente/:id_cliente", (req, res) => {
  Cliente.destroy({
    where: {
      id_cliente: req.params.id_cliente,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// ACTUALIZAR USUARIO
clientes.put("/actualizarClienteInfo/:id_cliente", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
    genero: req.body.genero,
    password: req.body.password,
    admin: false,
  };

  // Encriptar contraseña
  userData.password = bcrypt.hashSync(userData.password, 10);
  // res.send(console.log(userData));

  // console.log(userData);
  Cliente.update(userData, {
    where: {
      id_cliente: req.params.id_cliente,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});
clientes.put("/actualizarClienteInfoSINPASSWORD/:id_cliente", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
    genero: req.body.genero,
    password: req.body.password,
    admin: false,
  };
  // console.log(userData);
  Cliente.update(userData, {
    where: {
      id_cliente: req.params.id_cliente,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// REGISTRO
clientes.post("/registerCliente", (req, res) => {
  const today = new Date();

  // res.send(console.log(req.body));
  const clientesData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
    genero: req.body.genero,
    password: req.body.password,
    admin: false,
    created: today,
  };

  // Encriptar contraseña
  clientesData.password = bcrypt.hashSync(clientesData.password, 10);
  // res.send(console.log(userData));

  Cliente.findOne({
    where: {
      correo: req.body.correo,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        Cliente.create(clientesData)
          .then((user) => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({ token: token });
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

module.exports = clientes;