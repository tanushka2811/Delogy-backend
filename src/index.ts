import "dotenv/config";
import { connectDB } from "./db/index.js";
import app from "./app.js";
import { requiredEnv } from "./config/env.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    const port = Number(requiredEnv("PORT")) || 8000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exitCode = 1;
  }
};

void startServer();
