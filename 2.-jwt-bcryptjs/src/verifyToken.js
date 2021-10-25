const jwt = require('jsonwebtoken');
const config = require('./config');

function verifyToken (req, res, next){
    const token = req.headers['authorization'];
    
    // if(!token){
    //     return res.status(401).json({
    //         auth: false,
    //         message: 'No token provided'
    //     })
    // }
    // const decoded = jwt.verify(token, config.secret);
    // req.userId = decoded.id;
    // next();

    // Otra forma de Hacer 2
    if(!token) return res.status(401).json({
        auth: false,
        message: 'No tienes autorizacion'
    });

    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, config.secret);
    req.userId = decoded.id
    next();
};

module.exports = verifyToken;

// En los req puedes almacenar variables y datos