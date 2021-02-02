const express = require("express");
const empresas = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");

const Empresa = require("../models/Empresa");
const Cliente = require("../models/Cliente");
const { response } = require("express");

const fs = require("fs");
const path = require("path");

const cloudinary = require("cloudinary").v2;
const { generaJWT } = require("../helpers/jwt");
const { validarJWT } = require("../middleware/validar-JWT");
const { renewToken } = require("../controllers/auth");
cloudinary.config({
  cloud_name: "wolf-code",
  api_key: "622561925972199",
  api_secret: "1QsmR8t0FawDTGPeYsXqkhnhL04",
});

empresas.use(cors());

process.env.SECRET_KEY = "secret";

empresas.get("/", (req, res) => {
  res.json({
    status: "Empresa Works",
  });
});

//Alta empresas
empresas.post("/registerEmpresa", async(req, res) => {
  const today = new Date().toJSON();
  const nowDate = today.toString();
  console.log(today);
  console.log(req.body);
  let tipo = "";

  let archivo;
  // let imagen = JSON.stringify(req.body.imagen.file);
  //let imagen = (req.body.imagen.file);
  //let encod = Buffer.from(imagen, 'base64');

  //console.log('files', req.files);

  try {
    const body = req.body;
    body.created = nowDate;
    body.password = bcrypt.hashSync(req.body.password, 10);
    body.status = 0;
    // body.imagen = req.body.imagen.name;
  // if (req.files) {
  //   archivo = req.files.imagen;
  //   let nombreCortado = archivo.name.split(".");
  //   extencion = nombreCortado[nombreCortado.length - 1];
  //   extencionesValidas = ["png", "jpg", "gif", "jpeg"];

  //   if (extencionesValidas.indexOf(extencion) < 0) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message:
  //           "Las extenciones permitidas son " + extencionesValidas.join(","),
  //         ext: extencion,
  //       },
  //     });
  //   }

  //   archivo = body.imagen.name;

  //   let a = fs.writeFile(archivo, encod, {encoding: 'base64'}, function(err){
  //     console.log('File Created')
  //   });
  //   //imagen.src = req.body.imagen.file;

  //   cloudinary.uploader.upload(
  //     archivo.tempFilePath,
  //     { public_id: `Causas/${nombreArchivo}`, tags: `blog` },
  //     function (err, image) {
  //       if (err) res.send(err);
  //       console.log("File upload with cloudinary");
  //       // res.json(image);
  //     }
  //   );
  // }

  const empresaData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    nombre_empresa: req.body.nombre_empresa,
    correo: req.body.correo,
    telefono: req.body.telefono,
    giro_empresa: req.body.giro_empresa,
    direccion: req.body.direccion,
    cp: req.body.cp,
    ciudad: req.body.ciudad,
    rfc: req.body.rfc,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,//`${req.files.name}.${extencion}`, //req.body.imagen,
    created: today,
    link_fb: req.body.link_fb,
    link_whatsapp:
      `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
    password: req.body.password,
    status: 0,
  };

    let empresaDB = await Empresa.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if(!empresaDB){
      Empresa.create(body).then(
        (empresa) => {
          let token = jwt.sign(empresa.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });

          res.json({
            ok: true,
            token,
            empresa: empresa
          });
        }
      )
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al administrador",
    });
  }
});

empresas.post("/login", async (req, res = response) => {
  console.log("Entra");
  const { correo, password } = req.body;
  try {
    let usuarioDB = await Empresa.findOne({
      where: {
        correo,
      },
    });
    if (!usuarioDB) {
      usuarioDB = await Cliente.findOne({
        where: {
          correo,
        },
      });
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "Correo Erroneo",
        });
      } else {
        console.log(usuarioDB);
        if(usuarioDB.admin == 1){
          tipo = 'admin';
        }else{
          tipo = "cliente";
        }
      }
    } else {
      tipo = "empresa";
    }

    console.log(usuarioDB);

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Pass erroneo",
      });
    }

    let token;

    // Aqui va el token
    if(usuarioDB.status){
      token = await generaJWT(usuarioDB.correo);
    }

    res.json({
      ok: true,
      tipo,
      datos: usuarioDB,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al administrador",
    });
  }
});

// listar empresas si estan o no aprobadas
empresas.get("/ListarEmpresasPorStatus/:status", (req, res) => {
  Empresa.findAll({
    where: {
      status: req.params.status,
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

// Actualizar empresa a aprovada
empresas.put("/AprobarEmpresa/:id_empresa", (req, res) => {
  console.log('Status',req.body.status);
  const userData = {
    status: 1,
  };
  Empresa.update({status: 1}, {
    where: {
      id_empresa: req.params.id_empresa
    }
  }).then(function (updatedRecords) {
      return res.status(200).json({
        ok: true
      });
    })
    .catch(function (error) {
      console.log('Enntra error');
      return res.status(500).json({
        error
      });
    });
});

// Informacion de una Empresa
empresas.get("/InformacionEmpresa/:id_empresa", (req, res) => {
  Empresa.findAll({
    where: {
      id_empresa: req.params.id_empresa,
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

// Eliminar una empresa
empresas.get("/EliminarEmpresa/:id_empresa", (req, res) => {
  Empresa.destroy({
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Actualizar datos de la empresa
// SIN PASSOWRD
empresas.put("/ActEmpresaSinpassword/:id_empresa", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    nombre_empresa: req.body.nombre_empresa,
    correo: req.body.correo,
    telefono: req.body.telefono,
    giro_empresa: req.body.giro_empresa,
    direccion: req.body.direccion,
    cp: req.body.cp,
    ciudad: req.body.ciudad,
    rfc: req.body.rfc,
    descripcion: req.body.descripcion,
    link_fb: req.body.link_fb,
    link_whatsapp:
      `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
  };
  Empresa.update(userData, {
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});
// CON PASSWORD
empresas.put("/ActEmpresaConPassword/:id_empresa", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    nombre_empresa: req.body.nombre_empresa,
    correo: req.body.correo,
    telefono: req.body.telefono,
    giro_empresa: req.body.giro_empresa,
    direccion: req.body.direccion,
    cp: req.body.cp,
    ciudad: req.body.ciudad,
    rfc: req.body.rfc,
    descripcion: req.body.descripcion,
    link_fb: req.body.link_fb,
    link_whatsapp:
      `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
    password: req.body.password,
  };
  userData.password = bcrypt.hashSync(req.body.password, 10);

  Empresa.update(userData, {
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

empresas.get('/renew', validarJWT, renewToken);

module.exports = empresas;