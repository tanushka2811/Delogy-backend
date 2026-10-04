import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { requiredEnv } from "../config/env.js";

interface JwtPayload {
  id: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    res.status(401).json({ success: false, message: "Access token required" });
    return;
  }

  try {
    const secret = requiredEnv("JWT_SECRET");
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
