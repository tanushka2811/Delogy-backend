import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import projectEnquiryRouter from "./routes/projectEnquiry.route.js";
import authRouter from "./routes/user.route.js";
import { requiredEnv } from "./config/env.js"; 
const app = express();

app.use(
  cors({
    origin: requiredEnv("CORS_ORIGIN"), 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/project-enquiries", projectEnquiryRouter);
app.use("/api/v1/auth", authRouter);

export default app;
