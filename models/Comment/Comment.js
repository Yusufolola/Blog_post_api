const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },
    content:{
        type: String,
        required: [true, 'please write your comments here'],
    },
},{ timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;