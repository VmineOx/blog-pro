const router = require("express").Router();
const { createPostCntrl } = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken")

//  /api/posts
router.route("/")
.post(verifyToken, createPostCntrl);


module.exports = router; 