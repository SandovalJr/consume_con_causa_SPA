const fs = require('fs');

const Empresa = require('../models/Empresa');
const Producto = require('../models/Producto');

const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo;
    
    switch (tipo) {
        case 'empresa':
            const empresa = Empresa.findOne({
                where: {
                    id_empresa: id
                }
            }).catch(function (error){
                return res.status(500).json({
                    ok: false, 
                    error
                })
            });

            console.log('Buscando imagen');

            if(!empresa){
                console.log('No se encontro registro');
                return res.status(400).json({
                    ok: false,
                    msg: 'No se encontro registro'
                })
            }

            pathViejo = `./uploads/empresa/${empresa.imagen}`;
            borrarImagen(pathViejo);

            empresa.imagen = nombreArchivo;

            Empresa.update({imagen: nombreArchivo}, {
                where: {
                    id_empresa: id
                }
            }).then(function (updateEmpresa){
                return res.status(200).json({
                    ok: true, 
                    msg: 'Actualizado'
                })
            }).catch(function(error){
                return res.status(500).json({
                    ok: false, 
                    msg: 'Error',
                    error
                })
            });

            break;
    
        default:
            break;
    }
} 

module.exports = {
    actualizarImagen
}