const express = require("express");
const { addComment, getAllComments } = require("../controllers/comment");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.post('/comment', isAuthenticated ,addComment);
router.get('/comment',  getAllComments);
module.exports = router;