const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
    },
    description: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
    }
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('Todo', TodoSchema)