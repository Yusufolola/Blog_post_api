const Comment = require("../models/Comment/Comment");
const HttpError = require("../models/errorModel");
const Post = require("../models/Post/Post");
const User = require("../models/User/User");

const createComment = async (req, res, next) => {
    const { content } = req.body; 
    try {
        const post = await Post.findById(req.params.postId);
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

        await post.save({validateBeforeSave:true});
        await commenter.save({validateBeforeSave:true});

        res.json({
            status: "comment successfully created",
            info: comment,
        });

    } catch (error) {
        return next(new HttpError(error.message, 500)); 
    }
};

const editComment = async (req, res, next) => {
    console.log(req.body);
    const { content } = req.body;

    // Validate that content is provided in the request
    if (!content || content.trim() === "") {
        return next(new HttpError("Content cannot be empty", 400));
    }

    try {
        // Find the post by its ID
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        // Find the comment by its ID
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(new HttpError("Comment not found", 404));
        }

        // Check if the comment belongs to the found post
        if (comment.post.toString() !== req.params.postId) {
            return next(new HttpError("Comment does not belong to this post", 400));
        }

        // Check if the user making the request is the owner of the comment
        if (comment.user.toString() !== req.user.id.toString()) {
            return next(new HttpError("Unauthorized", 403));
        }

        // Update the comment's content
        comment.content = content;

        // Save the updated comment
        await comment.save();

        res.json({
            status: "Comment successfully updated",
            info: comment,
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};


const deleteComment = async (req, res, next) => {
    try {
        // Find the post by its ID
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        // First find the comment to verify ownership
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(new HttpError("Comment not found", 404));
        }

        // Check if the user making the request is the owner of the comment
        if (comment.user.toString() !== req.user.id.toString()) {
            return next(new HttpError("Unauthorized", 403));
        }

        // Remove the comment reference from the post's comments array
        post.comments = post.comments.filter(
            (commentId) => commentId.toString() !== req.params.commentId
        );

        // Save the updated post
        await post.save({ validateBeforeSave: true });

        // Use findByIdAndDelete to delete the comment
        await Comment.findByIdAndDelete(req.params.commentId);

        res.json({
            status: "Comment successfully deleted",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};




module.exports = {
    createComment, editComment, deleteComment,
}