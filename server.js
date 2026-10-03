const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");
const authMiddleware = require("./middleware/auth");

// ===============================
// DATABASE
// ===============================
connectDB();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// ===============================
// FRONTEND
// ===============================
app.use(
    express.static(
        path.join(__dirname, "frontend")
    )
);

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// ===============================
// HEALTH CHECK
// ===============================
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI CareerCopilot Backend Working 🚀"
    });
});

// ===============================
// HOME
// ===============================
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "frontend/index.html"
        )
    );
});

// ===============================
// SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("");
    console.log("====================================");
    console.log("🤖 AI CareerCopilot");
    console.log("====================================");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("====================================");
    console.log("");
});