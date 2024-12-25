const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user: {
        type: Object,
        required: true,
    },
    description:{
        type: String,
        required: [true, 'please write your comments here'],
    },
},{ timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;