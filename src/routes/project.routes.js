const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const authorize =
require("../middleware/role.middleware");

const {

    getProjects,
    createProject,
    updateProject,
    deleteProject

} = require("../controllers/project.controller");


// GET PROJECTS

router.get(
    "/",
    verifyToken,
    getProjects
);


// CREATE PROJECT

router.post(
    "/",
    verifyToken,
    authorize("MANAGER", "ADMIN"),
    createProject
);


// UPDATE PROJECT

router.put(
    "/:id",
    verifyToken,
    authorize("MANAGER", "ADMIN"),
    updateProject
);


// DELETE PROJECT

router.delete(
    "/:id",
    verifyToken,
    authorize("ADMIN"),
    deleteProject
);

module.exports = router;