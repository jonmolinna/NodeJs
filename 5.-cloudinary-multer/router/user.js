const router = require('express').Router();

const cloudinary = require('../utils/cloudinary.js');
const upload = require('../utils/multer.js');
const User = require('../model/User.js');

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create instance of user
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });

        // Save user
        await user.save();
        res.json(user);

    } catch (error) {
        console.log(error)
    }
});

router.get("/", async (req, res) => {
    try {
        let user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // Find user by id
        let user = await User.findById(req.params.id);
        // Delete imagen from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
        // Delete user from db
        await user.remove();
        res.json(user);
    } catch (err) {
        
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || user.name,
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id,
        };

        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });

        res.json(user);
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;

// Solo usaremos 
// "public_id", "secure_url"

// cuando user frontend
// <input type="file" name="image" />