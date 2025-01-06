const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "please choose a category"],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

},{ timestamps: true,});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;