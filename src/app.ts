import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import projectEnquiryRouter from "./routes/projectEnquiry.route.js";
import authRouter from "./routes/user.route.js";

const app = express();


const corsOptions = {
  origin: 'https://delogy.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/project-enquiries", projectEnquiryRouter);
app.use("/api/v1/auth", authRouter);

export default app;
