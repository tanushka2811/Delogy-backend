import { ProjectEnquiryModel } from "../models/projectEnquiry.model.js";
import type { RequestHandler } from "express";

// Create a new project enquiry
export const createProjectEnquiry: RequestHandler = async (req, res) => {
  try {
    const enquiry = new ProjectEnquiryModel(req.body);
    const savedEnquiry = await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Project enquiry created successfully",
      data: savedEnquiry,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to create project enquiry",
      error: error.message,
    });
  }
};

// Get all project enquiries (protected)
export const getAllProjectEnquiries: RequestHandler = async (_req, res) => {
  try {
    const enquiries = await ProjectEnquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project enquiries",
      error: error.message,
    });
  }
};

// Get a single project enquiry by ID (protected)
export const getProjectEnquiryById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const enquiry = await ProjectEnquiryModel.findById(req.params.id);
    if (!enquiry) {
      res.status(404).json({ success: false, message: "Project enquiry not found" });
      return;
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project enquiry",
      error: error.message,
    });
  }
};

