const { model, Schema } = require('mongoose');

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Ingrese un Nombre'],
        validate: {
            validator: (name) => nameRegex.test(name),
            message: (props) => `${props.value} no es un Nombre valido`,
        },
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Ingrese un Username'],
        validate: {
            validator: (username) => usernameRegex.test(username),
            message: (props) => `${props.value} no es un Usuario valido`,
        },
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Ingrese un Correo Electronico"],
        validate: {
            validator: (email) => emailRegex.test(email),
            message: (props) => `${props.value} no es un email valido`,
        }
    },
    role: {
        type: String,
        required: [true, 'Ingrese un Rol'],
        enum: {
            values: ["user", "admin", "superadmin"],
            message: "No es un rol Valido",
        }
    },
    password: {
        type: String,
        required: [true, "Ingrese una Contraseña"]
    }
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;