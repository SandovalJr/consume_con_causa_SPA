//aquí declaramos las rutas para nuestro user
const express = require("express");
const dprods = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const DProd = require("../models/Donacion_Producto");
dprods.use(cors());
process.env.SECRET_KEY = "secret";

dprods.get("/apidp", (req, res) => {
  res.json({ status: "API DONACION dprods" });
});

// REGISTRO DONACION DE PRODUCTOS
dprods.post("/registerDonacionProduct", (req, res) => {
  const today = new Date().toJSON();
  const donacionData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    tipo_pago: req.body.tipo_pago,
    organizacion_dona: req.body.organizacion_dona,
    nombre_producto: req.body.nombre_producto,
    descripcion_producto: req.body.descripcion_producto,
    cantidad_producto: req.body.cantidad_producto,
    total_compra: req.body.total_compra,
    imagen_producto: req.body.imagen_producto,
    fecha_compra: today,
    estatus_compra: "No Pagado",
    nombre_empresa: req.body.nombre_empresa,
  };
  console.log(donacionData);
  DProd.create(donacionData)
    .then(function (Donacion) {
      res.status(200).json(Donacion);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

//(list)  Mostrar las donaciones de cada cliente estatus no pagado
dprods.get("/ListDPNP/:correo", (req, res) => {
  DProd.findAll({
    where: {
      correo: req.params.correo,
      estatus_compra: "No Pagado",
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

//(list)  Mostrar las donaciones de cada cliente estatus pagado
dprods.get("/ListDPPagado/:correo", (req, res) => {
  DProd.findAll({
    where: {
      correo: req.params.correo,
      estatus_compra: "Pagado",
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

//(list)  Mostrar las donaciones a las empresas en general (aun no pagadas)
dprods.get("/EmpresaListDNP", (req, res) => {
  DProd.findAll({
    where: {
      estatus_compra: "NoPagado",
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
// DONACIONES NO PAGADAS POR CORREO 
dprods.get("/EmpresaListDNP/:correo", (req, res) => {
  DProd.findAll({
    where: {
      estatus_compra: "NoPagado",
      	correo: req.params.correo,
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

// (list) Mostrar las donaciones a las empresas en general (pagadas)
dprods.get("/EmpresaListDPagado", (req, res) => {
  DProd.findAll({
    where: {
      estatus_compra: "Pagado",
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

//(actualizar status) Validar que ya fue entregada la entrega ()
dprods.put("/actualizarAPagado/:id_donacion", (req, res) => {
  const datapagado = {
    estatus_compra: "Pagado",
  };
  // console.log(datapagado);
  DProd.update(datapagado, {
    where: {
      id_donacion: req.params.id_donacion,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = dprods;

// ESTUS:

// PAGADO
// ESPERA