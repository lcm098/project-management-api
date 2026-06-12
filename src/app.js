const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const errorHandler = require("./middleware/error.middleware");
const app = express();

// Security Middleware
app.use(helmet());

app.use(errorHandler);

app.use(
    "/api/v1/projects",
    projectRoutes
);

// CORS
app.use(cors());

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorHandler);

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Project Management API Running"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;