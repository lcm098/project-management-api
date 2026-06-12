const express = require("express");
const { body } = require("express-validator");

const validate =
require("../middleware/validate.middleware");

const {
    register,
    login,
    refreshAccessToken,
    logout
} = require("../controllers/auth.controller");

const router = express.Router();


// REGISTER

router.post(
    "/register",

    body("name")
        .notEmpty(),

    body("email")
        .isEmail(),

    body("password")
        .isLength({ min: 6 }),

    validate,

    register
);


// LOGIN

router.post(
    "/login",

    body("email")
        .isEmail(),

    body("password")
        .notEmpty(),

    validate,

    login
);


// REFRESH TOKEN

router.post(
    "/refresh-token",
    refreshAccessToken
);


// LOGOUT

router.post(
    "/logout",
    logout
);

module.exports = router;