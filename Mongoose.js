import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    const conn = await mongoose.connect("mongodb+srv://dengeramprkash:FStqAMvgbejjutf4@cluster0.0usngiq.mongodb.net", {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};