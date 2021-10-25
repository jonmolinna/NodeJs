const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const User = require('./User');
const config = require('./config');
const verifyToken = require('./verifyToken');

router.post('/register', async (req, res, next) => {
    const { name, username, password } = req.body;

    const user = new User ({
        name,
        username,
        password
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ user, token })
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user){
        return res.status(404).send("The username doesn't exists");
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
        expiresIn: 60 * 60 * 24
    });


    res.json({ auth: true, token})
});

router.get('/user', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0});
    if(!user){
        return res.status(404).json({
            message: 'No user found'
        })
    }

    res.json({ user })
});

module.exports = router;