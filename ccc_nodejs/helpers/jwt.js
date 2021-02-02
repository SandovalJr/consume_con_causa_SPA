const jwt = require('jsonwebtoken');

const generaJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }

        jwt.sign(payload, "Hol@C0m0E5t4S!!!!!", {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        });
    });

}

module.exports = {
    generaJWT
}