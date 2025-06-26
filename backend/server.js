// index.js or server.js (entry point)

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import userRoutes from "./routes/user.routes.js";

import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

// For __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load environment variables (optional in dev)
const NODE_ENV = process.env.NODE_ENV || "development";
if (NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS (adjust origin for production frontend)
app.use(
  cors({
    origin: "https://frontend-dev-latest.onrender.com", // frontend domain
    credentials: true, // allow cookies/auth headers
  })
);

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api/v1/watch", protectRoute, userRoutes);

// Removed frontend static serving (since served separately)

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
