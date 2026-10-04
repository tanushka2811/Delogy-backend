import { Router } from "express";
import { signup, login } from "../controller/user.controller.js";
import { authenticateToken, type AuthRequest } from "../middleware/auth.middleware.js";

const router = Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Admin-only route
router.get("/admin", authenticateToken, (req: AuthRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ success: false, message: "Admins only" });
    return; 
  }

  res.json({ success: true, message: "Welcome Admin!" });
});

export default router;
