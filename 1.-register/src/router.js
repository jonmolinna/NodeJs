const express = require('express');
const router = express.Router();

const { addUser, loginUser } = require('./controller');
const { addPost } = require('./post.controller');

function ensureToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.status(403).json({ error: "No tienes acceso" })
    }
};

router.post('/addUser', addUser);
router.post('/login', loginUser);

router.post('/addPost', ensureToken, addPost);

module.exports = router;