const { response } = require("express");
const { generaJWT } = require("../helpers/jwt");
const Cliente = require("../models/Cliente");
const Empresa = require("../models/Empresa");



const renewToken = async(req, res = response) => {
    const uid = req.uid;

    const token = await generaJWT(uid);

    const empresaDB = await Empresa.findAll({
        where: {
            correo: uid
        }
    });

    if(!empresaDB){
        const usuarioDB = await Cliente.findAll({
            where: {
                correo: uid
            }
        })
        if(!usuarioDB){
            return res.status(404).json({
                ok: false, 
                msg: 'Email no encontrado'
            });
        }
        res.json({
            ok: true,
            token,
            usuario: usuarioDB
        })
    }

    res.json({
        ok: true,
        token,
        empresa: empresaDB
    })
}

module.exports = {
    renewToken
}