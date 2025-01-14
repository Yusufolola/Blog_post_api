const Category = require("../models/Category/Category");
const HttpError = require("../models/errorModel");

const createCategory = async (req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.create({title, user: req.user.id});
        res.json({status: " created successfully",
            info: category,
        })
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json({status: "success",
            info: categories,
        })
    } catch (error) {

        return next(new HttpError(error))
    }
}

const getSingleCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.json({status: "success",
            info: category,
        })
    } catch (error) {

        return next(new HttpError(error))
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({status: "success",
            info: "deleted successfully",
        })
    } catch (error) {

        return next(new HttpError(error))
    }
}











module.exports = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    deleteCategory,
}