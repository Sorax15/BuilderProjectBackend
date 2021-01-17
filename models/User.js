const moongose = require('mongoose');
const Schema = moongose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = moongose.model('user', usersSchema);
