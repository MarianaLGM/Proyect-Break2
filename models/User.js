//.models/User

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required:true
    },
    contraseña:{
        type: String,
        required:true
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;