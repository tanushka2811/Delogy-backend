import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { requiredEnv } from "../config/env.js";

export const connectDB = async () => {
  const mongoUri = requiredEnv("MONGODB_URI");

  try {
    const connectionInstance = await mongoose.connect(
      mongoUri,
      {
        dbName: DB_NAME,
      }
    );
    console.log(
      "MongoDB connection successful",
      "DB host",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
