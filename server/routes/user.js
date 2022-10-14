const { register, login, blockUser, updateProfile, getUser, deactivate, activate } = require("../controllers/userController");

const router = require("express").Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/blockuser/:id").put(blockUser);

router.route("/getuser/:id").get(getUser);

router.route("/updateprofile/:id").put(updateProfile);

router.route("/deactivate").put(deactivate);

router.route("/activate").put(activate);

module.exports = router;
