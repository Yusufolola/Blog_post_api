const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "input a title"],
        trim: true,
    },
    
    description:{
        type: String,
        required: [true, "input a description"],
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:[true, "choose a category"],
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    views:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],

    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "please include the authors name"]
    },

},
{
    timestamps:true
})


const Post = mongoose.model("Post", postSchema);
module.exports = Post;