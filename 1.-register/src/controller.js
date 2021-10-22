const User = require('./User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validaciones
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

function roles(rol){
    if(rol === "admin") return true
    if(rol === "user") return true
    if(rol === "superadmin") return true
    return false;
};

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
        if(name.trim() === "") errors.name = "Ingrese un Nombre";
        if(username.trim() === "") errors.username = "Ingrese un Usuario";
        if(email.trim() === "") errors.email = "Ingrese un Correo Electronico";
        if(role.trim() === "") errors.role = "Ingrese un Rol";
        if(!password) errors.password = "Ingrese una Contraseña";
        if(!confirmPassword) errors.confirmPassword = "Confirme la Contraseña"

        if(Object.keys(errors).length > 0){
            throw errors
        }

        if(name.length <= 3) errors.name = "El nombre debe tener mas de tres caracteres";
        if(nameRegex.test(name) === false) errors.name = "Nombre solo Acepta letras y espacio";
        if(username.length <= 4) errors.username = "El usuario debe tener mas de 4 caracteres";
        if(usernameRegex.test(username) === false) errors.username = `${username} no es un usuario valido`;
        if(roles(role.toLowerCase().trim()) === false) errors.role ="Rol solo acepta admin, user o superadmin";
        if(emailRegex.test(email) === false) errors.email = `${email} no es un email valido`;
        if(password !== confirmPassword) errors.password = "Las contraseñas no son iguales";

        if(Object.keys(errors).length > 0){
            throw errors
        }

        const usuario = await User.findOne({ username });
        if(usuario) throw errors.username = "Usuario ya Existe";

        // Hash Password
        let contrasena = await bcrypt.hash(password, 6)

        const user = await User.create({ name, username, email, role, password: contrasena });
        return res.json({ user })
        
    } catch (error) {
        return res.status(500).json({ error })
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

    } catch (error) {
        return res.status(500).json({ error })
    }

};

module.exports = {
    addUser,
    loginUser
};