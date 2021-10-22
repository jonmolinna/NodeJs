const { Schema, model } = require('mongoose');

const postShema = new Schema({
    title: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

const Post = model('Post', postShema);

module.exports = Post;