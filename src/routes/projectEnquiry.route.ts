import { Router } from "express";
import {
  createProjectEnquiry,
  getAllProjectEnquiries,
  getProjectEnquiryById,
  
} from "./../controller/projectEnquiry.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", createProjectEnquiry);
router.get("/",authenticateToken ,getAllProjectEnquiries);
router.get("/:id", authenticateToken, getProjectEnquiryById);


export default router;
