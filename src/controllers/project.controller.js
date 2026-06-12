const Project = require("../models/Project");


// ======================
// GET PROJECTS
// ======================

const getProjects = async (req, res) => {

    try {

        const projects = await Project.find()
            .populate("owner", "name email role");

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================
// CREATE PROJECT
// ======================

const createProject = async (req, res) => {

    try {

        const { title, description } = req.body;

        const project =
            await Project.create({
                title,
                description,
                owner: req.user.id
            });

        res.status(201).json({
            success: true,
            data: project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================
// UPDATE PROJECT
// ======================

const updateProject = async (req, res) => {

    try {

        const project =
            await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const isOwner =
            project.owner.toString() === req.user.id;

        if (
            !isOwner &&
            req.user.role !== "ADMIN"
        ) {

            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }

        project.title =
            req.body.title || project.title;

        project.description =
            req.body.description ||
            project.description;

        await project.save();

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================
// DELETE PROJECT
// ======================

const deleteProject = async (req, res) => {

    try {

        const project =
            await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};