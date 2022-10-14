const { getOtherPosts, addPost, getUserPosts, editPost, deletepost, getaPost, blockPost} = require("../controllers/postController");

const router= require("express").Router();


router.route("/:id").get(getOtherPosts);

router.route("/").post(addPost);

router.route("/userposts/:id").get(getUserPosts);

router.route("/getpost/:id").get(getaPost);

router.route("/editpost/:id").put(editPost);

router.route("/deletepost/:id").delete(deletepost);

router.route("/blockpost/:id").put(blockPost);



module.exports = router;