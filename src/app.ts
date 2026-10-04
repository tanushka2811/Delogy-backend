import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import projectEnquiryRouter from "./routes/projectEnquiry.route.js";
import authRouter from "./routes/user.route.js";

const app = express();
const allowedOrigins = [
  "http://localhost:3000",        
  "https://delogy.vercel.app"     
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200, // ensures OPTIONS returns 200
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/project-enquiries", projectEnquiryRouter);
app.use("/api/v1/auth", authRouter);

export default app;
