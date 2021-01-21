//aquí declaramos las rutas para nuestro user
const express = require("express");
const ventasproductos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const VentProdu = require("../models/Venta_Producto");
ventasproductos.use(cors());
process.env.SECRET_KEY = "secret";

ventasproductos.get("/apiventprod", (req, res) => {
  res.json({ status: "API venta" });
});

// REGISTRO VENTAS DE PRODUCTOS
ventasproductos.post("/RegisterVentaProductos", (req, res) => {
  const today = new Date().toJSON();
  const VentaData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    tipo_pago: req.body.tipo_pago,
    nombre_producto: req.body.nombre_producto,
    descripcion_producto: req.body.descripcion_producto,
    cantidad_producto: req.body.cantidad_producto,
    total_compra: req.body.total_compra,
    imagen_producto: req.body.imagen_producto,
    fecha_compra: today,
    estatus_compra: "NoPagado",
    nombre_empresa: req.body.nombre_empresa,
  };

  console.log(VentaData);
  VentProdu.create(VentaData)
    .then(function (VENTAS) {
      res.status(200).json(VENTAS);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

//-----------------  CLIENTE --------------------------//

//(list)  Mostrar las compras de cada cliente estatus no pagado
ventasproductos.get("/ListNPVentas/:correo", (req, res) => {
  VentProdu.findAll({
    where: {
      correo: req.params.correo,
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

//(list)  Mostrar las compras de cada cliente estatus pagado
ventasproductos.get("/ListPVentas/:correo", (req, res) => {
  VentProdu.findAll({
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

//-----------------  EMPRESAS --------------------------//





//--------------------- ADMINISTRADOR --------------------------//

//(list)  Mostrar las donaciones a las empresas en general (aun no pagadas)
ventasproductos.get("/ListEmpresaVentasNoPagadas", (req, res) => {
  VentProdu.findAll({
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

// (list) Mostrar las donaciones a las empresas en general (pagadas)
ventasproductos.get("/ListEmpresasVentasPagadas", (req, res) => {
  VentProdu.findAll({
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
ventasproductos.put("/actualizarAPagado/:id_ventap", (req, res) => {
  const datapagado = {
    estatus_compra: "Pagado",
  };
  // console.log(datapagado);
  VentProdu.update(datapagado, {
    where: {
      id_ventap: req.params.id_ventap,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = ventasproductos;
// ESTUS:

// Pagado
// NoPagado