const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String,
        required:[true, "please input firstname"],
    },
    lastName: {type: String,
        required:[true, "please input lastname"],
    },
    avatar:{
        type: String,
    },
    password: {type: String,
        required:[true, "please input password"],
    },
    email: { type: String, required: true, unique: true },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    role:{
        type: String,
        enum: ['Admin', 'Visitor', 'Editor' ],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    postCount:{
        type:Number,
        default: 0,
    },
    profileImage: {
        type:String,
    },
    viewedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }]
},{
    timestamps:true
});


const User = mongoose.model("User", userSchema);
module.exports = User;