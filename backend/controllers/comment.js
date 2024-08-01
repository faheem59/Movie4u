const Comment = require('../models/Comments');
const User = require('../models/Users');
const Movie = require('../models/Movies');
const respondWithStatus = require('../utils/responseStatus');
const message = require('../utils/message');

exports.addComment = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const { comment, rating } = req.body;
        const userId = req.user.id;

        const movie = await Movie.findOne({ imdbID: imdbID });

        if (!movie) {
            return respondWithStatus(res, 404, message.error.movieNotFound);
        }

        const user = await User.findById(userId);
        if (!user) {
            return respondWithStatus(res, 404, message.error.userNotFound);
        }

        const newComment = {
            movie: imdbID,
            user: userId,
            comment,
            rating,
        };

        let commentDoc = await Comment.findOne();
        if (!commentDoc) {
            commentDoc = new Comment({ comments: [] });
        }

        commentDoc.comments.push(newComment);
        await commentDoc.save();

        const populatedCommentDoc = await Comment.findById(commentDoc._id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-_id name'
                }
            })
            .exec();

        respondWithStatus(res, 201, message.success.commnetAddSuccess, { populatedCommentDoc });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-_id name'
                }
            })
            .exec();

        respondWithStatus(res, 200, message.success.getAllcommnet, { comments });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};
