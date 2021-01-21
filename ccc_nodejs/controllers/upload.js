const path = require('path');

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { actualizarImagen } = require('../helpers/actualizarImg');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'wolf-code',
    api_key: '622561925972199',
    api_secret: '1QsmR8t0FawDTGPeYsXqkhnhL04'
});

const uploadImg = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['empresa', 'producto'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false, 
            msg: 'No es empresa ni producto'
        });
    }

    console.log(req.body);

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false, 
            msg: 'No hay ningun archivo'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok: false, 
            msg: 'Extencion no es permitida'
        })
    }

    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;
    
    file.mv(path, (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false, 
                msg: 'Error al mover la imagen'
            })
        }

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true, 
            msg: 'Archivo subido', 
            nombreArchivo
        })
    })

    // cloudinary.uploader.upload(file.tempFilePath, {public_id: `Causa/empresa/${nombreArchivo}`, tags: `blog`}, 
    //     function(err, image){
    //         if(err) res.send(err);
    //         console.log('File upload with cloudinary');
    //         // res.json(image);
    //     }
    // );
}

module.exports = {
    uploadImg
}