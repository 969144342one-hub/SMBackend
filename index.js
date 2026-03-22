// Library Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// File Imports
import myMiddleware from "./Middlware.js";
import userRoutes from "./routes/userRoutes.js";
import AllGames from "./routes/getAllGames.js";
import notiFection from "./routes/notiFection.js";
import { connectDB } from "./Mongoose.js";

const app = express();

// --- Config ---
const PORT = process.env.PORT || 5000;

const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,https://main.d1osaocppprg4.amplifyapp.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// --- Connect MongoDB BEFORE routes ---
app.use(async (req,res,next)=>{
  await connectDB()
  next()
})

// --- Middleware ---
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(myMiddleware);

// --- Health Check ---
app.get("/", (req, res) =>
  res.json({
    message: "Satta Matka API is running!",
    mongodb_status:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString(),
  })
);

app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    mongodb_connected: mongoose.connection.readyState === 1,
    time: new Date().toISOString(),
  })
);

// --- Routes ---
app.use("/user", userRoutes);
app.use("/AllGames", AllGames);
app.use("/Notification", notiFection);

// --- Local Development Server ---
if (
  process.env.NODE_ENV !== "production" &&
  !process.env.AWS_LAMBDA_FUNCTION_NAME
) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
  });
}

// Export for Lambda
export default app;