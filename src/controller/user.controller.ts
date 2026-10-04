
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import type { IUserDocument } from "../models/user.model.js";
import { requiredEnv } from "../config/env.js";

// Helper to generate JWT
const generateToken = (user: IUserDocument): string => {
  return jwt.sign(
    { id: user._id, role: user.role },
    requiredEnv("JWT_SECRET"),
    { expiresIn: "1h" }
  );
};

// Signup Controller
export const signup: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already registered" });
      return;
    }

    const newUser = new UserModel({ username, email, password, role: "user" });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

// Login Controller
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
