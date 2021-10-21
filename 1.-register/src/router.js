const express = require('express');
const router = express.Router();

const { addUser, loginUser } = require('./controller');

router.post('/addUser', addUser);
router.post('/login', loginUser);

module.exports = router;