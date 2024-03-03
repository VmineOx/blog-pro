const router = require("express").Router();
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCntrl } = require("../controllers/usersController");
const {verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");


// /api/users/profile
router.route("/profile").get( verifyTokenAndAdmin , getAllUsersCtrl);

// /api/users/profile/:id
router.route("/profile/:id")
        .get(validateObjectId,getUserProfileCtrl)
        .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCntrl)

module.exports = router; 