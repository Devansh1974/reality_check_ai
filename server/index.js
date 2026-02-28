const express = require("express");
const cors = require("cors");
require("dotenv").config();

const calculateRoutes = require("./routes/calculate");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/calculate", calculateRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Reality Check API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong. Please try again.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Reality Check server running on port ${PORT}`);
});
