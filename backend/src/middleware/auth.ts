import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { User, IUser } from "../models/User.js";

export interface AuthRequest extends Request {
  user?: IUser;
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    // 1. Check HttpOnly Cookie
    if (req.cookies && req.cookies.spark_session) {
      token = req.cookies.spark_session;
    }

    // 2. Check Authorization Header (Bearer token)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Authentication required. Please sign in.",
        code: "UNAUTHORIZED",
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        error: "User account not found.",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    if (user.status !== "active") {
      res.status(403).json({
        success: false,
        error: "Account has been deactivated. Please contact the CEO.",
        code: "ACCOUNT_INACTIVE",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired session token.",
      code: "INVALID_TOKEN",
    });
  }
}
