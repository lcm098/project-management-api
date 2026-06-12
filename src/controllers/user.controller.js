const User = require("../models/User");


// =========================
// GET MY PROFILE
// =========================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select("-password -refreshToken");

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// UPDATE MY PROFILE
// =========================

const updateProfile = async (req, res) => {

    try {

        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name },
            {
                new: true,
                runValidators: true
            }
        ).select("-password -refreshToken");

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET ALL USERS
// =========================

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password -refreshToken");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// CHANGE USER ROLE
// =========================

const changeUserRole = async (req, res) => {

    try {

        const { role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            {
                new: true
            }
        ).select("-password -refreshToken");

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    changeUserRole
};