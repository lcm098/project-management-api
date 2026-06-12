const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../services/token.service");


// ======================
// REGISTER
// ======================

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================
// LOGIN
// ======================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const accessToken =
            generateAccessToken(user);

        const refreshToken =
            generateRefreshToken(user);

        user.refreshToken = refreshToken;

        await user.save();

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================
// REFRESH TOKEN
// ======================

const refreshAccessToken = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {

            return res.status(401).json({
                success: false,
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user =
            await User.findById(decoded.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.refreshToken !== refreshToken) {

            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const accessToken =
            generateAccessToken(user);

        res.status(200).json({
            success: true,
            accessToken
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
};


// ======================
// LOGOUT
// ======================

const logout = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        const user =
            await User.findOne({
                refreshToken
            });

        if (user) {

            user.refreshToken = null;

            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    register,
    login,
    refreshAccessToken,
    logout
};