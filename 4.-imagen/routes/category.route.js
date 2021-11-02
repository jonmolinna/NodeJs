const express = require('express');
const router = express.Router();

// now use multer
const uploadMulter = require('../middlewares/upload.js');

// validation
const validation = require('../middlewares/validation.js');

// controller
const { createCategory } = require('../controllers/category.controllers.js');

// now let's valid this file
router.post('/category', uploadMulter, validation, createCategory);

module.exports = router;