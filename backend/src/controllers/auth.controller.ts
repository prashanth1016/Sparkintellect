import { Request, Response } from "express";
import crypto from "crypto";
import { User } from "../models/User.js";
import { AuthService } from "../services/auth.service.js";
import { EmailService } from "../services/email.service.js";
import { config } from "../config/index.js";
import { AuthRequest } from "../middleware/auth.js";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password, mfaCode } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide both email and password.",
        code: "MISSING_CREDENTIALS",
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      // Mitigate timing attacks by dummy verification
      await AuthService.hashPassword("dummy_password_constant_time");
      res.status(401).json({
        success: false,
        error: "Invalid email or password.",
        code: "INVALID_CREDENTIALS",
      });
      return;
    }

    // Check account lockout
    if (user.lockUntil && user.lockUntil > new Date()) {
      const waitMinutes = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
      res.status(429).json({
        success: false,
        error: `Account is temporarily locked due to excessive failed attempts. Try again in ${waitMinutes} minutes.`,
        code: "ACCOUNT_LOCKED",
      });
      return;
    }

    // Verify Argon2id password
    const isValid = await user.verifyPassword(password);

    if (!isValid) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
      }
      await user.save();

      res.status(401).json({
        success: false,
        error: "Invalid email or password.",
        code: "INVALID_CREDENTIALS",
      });
      return;
    }

    // Check active status
    if (user.status !== "active") {
      res.status(403).json({
        success: false,
        error: "Account has been deactivated. Please contact the CEO.",
        code: "ACCOUNT_INACTIVE",
      });
      return;
    }

    // Reset failed login counter on success
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT token
    const token = AuthService.generateToken(user);

    // Set secure HttpOnly cookie
    res.cookie("spark_session", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Authentication successful.",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    });
  }

  static async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("spark_session", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      success: true,
      message: "Successfully logged out.",
    });
  }

  static async me(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Not authenticated" });
      return;
    }

    res.json({
      success: true,
      user: {
        id: req.user._id.toString(),
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions,
      },
    });
  }

  static async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, error: "Email is required." });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user && user.status === "active") {
      const resetToken = AuthService.generateRandomToken();
      user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await user.save();

      await EmailService.sendPasswordResetEmail(user.email, resetToken);
    }

    // Always respond with success to prevent user enumeration
    res.json({
      success: true,
      message: "If an active account exists for this email, password recovery instructions have been sent.",
    });
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = req.body;

    if (!token || !newPassword || newPassword.length < 8) {
      res.status(400).json({
        success: false,
        error: "Valid token and a password of at least 8 characters are required.",
      });
      return;
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: "Password reset token is invalid or has expired.",
      });
      return;
    }

    user.passwordHash = await AuthService.hashPassword(newPassword);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Your password has been successfully updated. You may now log in.",
    });
  }
}
