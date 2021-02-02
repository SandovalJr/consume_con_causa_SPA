const jwt = require('jsonwebtoken');
const Empresa = require('../models/Empresa');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false, 
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, "Hol@C0m0E5t4S!!!!!");
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}