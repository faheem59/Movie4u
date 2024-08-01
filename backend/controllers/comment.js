const Comment = require('../models/Comments'); 
const User = require('../models/Users');      
const Movie = require('../models/Movies');     

exports.addComment = async (req, res) => {
    try {
        const { imdbID } = req.query
        const {comment, rating} = req.body
        const userId = req.user.id;
       

        const movie = await Movie.findOne({ imdbID: imdbID }); 
     
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

       
        // const addedComment = populatedCommentDoc.comments.find(c => c._id === newComment._id);

        res.status(201).json({ message: 'Comment added successfully', populatedCommentDoc });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
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

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};