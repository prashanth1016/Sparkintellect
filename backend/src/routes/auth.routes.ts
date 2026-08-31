import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { loginRateLimiter } from "../middleware/rateLimiter.js";
import { logAuditEvent } from "../middleware/auditLogger.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/login", loginRateLimiter, logAuditEvent("auth.login"), asyncHandler(AuthController.login));
router.post("/logout", authenticateToken, logAuditEvent("auth.logout"), asyncHandler(AuthController.logout));
router.get("/me", authenticateToken, asyncHandler(AuthController.me));
router.post("/forgot-password", asyncHandler(AuthController.forgotPassword));
router.post("/reset-password", asyncHandler(AuthController.resetPassword));

export default router;
