const User = require('./User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generando Token
function generateToken(user){
    return jwt.sign(
        {
            id: user._id,
            username: user.username
        }, 
        "SECRET_KEY", 
        { expiresIn: '1h'}
    );
};

// Registrando un Usuario
const addUser = async (req, res) => {
    const { name, username, email, role, password, confirmPassword } = req.body;
    let errors = {};

    try {
        const userEmail = await User.findOne({ email });
        const userUsername = await User.findOne({ username });

        if(userUsername) errors.username = "Usuario ya Existe";
        if(userEmail) errors.email = "Email ya Existe";
        if(password !== confirmPassword) errors.password = "La constraseñas no son iguales";

        if(Object.keys(errors).length > 0){
            throw errors
        }
        
        // Hash Password
        let contrasena = await bcrypt.hash(password, 6);

        const user = await User.create({ name, username, email, role, password: contrasena });
        return res.json({user});
        
    } catch (error) {
        if(Object.keys(errors).length === 0){
            if(error.errors.name?.name === "ValidatorError"){
                errors.name = error.errors.name.message
            }
            if(error.errors.username?.name === "ValidatorError"){
                errors.username = error.errors.username.message
            }
            if(error.errors.email?.name === "ValidatorError"){
                errors.email = error.errors.email.message
            }
            if(error.errors.role?.name === "ValidatorError"){
                errors.role = error.errors.role.message
            }
            if(error.errors.password?.name === "ValidatorError"){
                errors.password = error.errors.password.message
            }
        }
        

        return res.status(500).json({ errors })
    }
};


// Login Usuario
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    let errors = {};

    try {
        if(username.trim() === "") errors.username = "Ingrese Usuario";
        if(!password) errors.password = "Ingrese Contraseña";

        if(Object.keys(errors).length > 0){
            throw errors
        }

        const usuario = await User.findOne({ username });
        if(!usuario) throw errors.username= "Usuario no econtrado";

        const correctPassword = await bcrypt.compare(password, usuario.password);
        if(!correctPassword) throw errors.password = 'La contraseña es incorrecta';

        const token = generateToken(usuario)
        
        return res.status(200).json({
            ...usuario.toJSON(),
            token
        });

    } catch (err) {
        // console.log(error)
        return res.status(500).json({ err })
    }

};

module.exports = {
    addUser,
    loginUser
};