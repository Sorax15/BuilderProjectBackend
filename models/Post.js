const moongose = require('mongoose');
const Schema = moongose.Schema;

const postsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = moongose.model('posts', postSchema);