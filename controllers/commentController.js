const Comment = require("../models/Comment/Comment");
const HttpError = require("../models/errorModel");
const Post = require("../models/Post/Post");
const User = require("../models/User/User");

const createComment = async (req, res, next) => {
    const { content } = req.body; 
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        const commenter = await User.findById(req.user.id);
        if (!commenter) {
            return next(new HttpError("User not found", 404));
        }

        const comment = await Comment.create({
            content,
            post: post._id,
            user: commenter._id,
        });

        post.comments.push(comment._id);
        commenter.comments.push(comment._id);

        await post.save();
        await commenter.save();

        res.json({
            status: "comment successfully created",
            info: comment,
        });

    } catch (error) {
        return next(new HttpError(error.message, 500)); 
    }
};
