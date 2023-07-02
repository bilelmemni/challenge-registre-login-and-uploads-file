const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Firstname: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
    },
    Lastname: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
    },
    Email: {
        type: String,
        unique:true,
        required: [true, 'Ce champs est obligatoire'],
    },
    Password: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
    },
    Age: {
        type: Number,
        required: [true, 'Ce champs est obligatoire'],
    },
    Todos: {
        type: Array,
        required: [true, 'Ce champs est obligatoire'],
    }
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('User', UserSchema)