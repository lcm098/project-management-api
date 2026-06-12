const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const authorize =
require("../middleware/role.middleware");

const {

    getProfile,

    updateProfile,

    getAllUsers,

    changeUserRole

} = require("../controllers/user.controller");


// ======================
// USER PROFILE
// ======================

router.get(
    "/me",
    verifyToken,
    getProfile
);

router.put(
    "/me",
    verifyToken,
    updateProfile
);


// ======================
// ADMIN ROUTES
// ======================

router.get(
    "/",
    verifyToken,
    authorize("ADMIN"),
    getAllUsers
);

router.patch(
    "/:id/role",
    verifyToken,
    authorize("ADMIN"),
    changeUserRole
);

module.exports = router;