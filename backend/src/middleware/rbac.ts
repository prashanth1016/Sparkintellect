import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.js";

export function requirePermission(permission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        success: false,
        error: "Unauthorized",
        code: "UNAUTHORIZED",
      });
      return;
    }

    // CEO has full root privileges
    if (user.role === "CEO") {
      return next();
    }

    // Check specific permission or wildcard
    const userPerms = user.permissions || [];
    const hasAccess = userPerms.includes(permission) || userPerms.includes("*");

    if (!hasAccess) {
      res.status(403).json({
        success: false,
        error: `Forbidden: Insufficient privileges. Required permission: '${permission}'`,
        code: "FORBIDDEN",
      });
      return;
    }

    next();
  };
}

export function requireCEO(req: AuthRequest, res: Response, next: NextFunction): void {
  const user = req.user;

  if (!user || user.role !== "CEO") {
    res.status(403).json({
      success: false,
      error: "Forbidden: This operation is strictly reserved for the Chief Executive Officer.",
      code: "CEO_ONLY",
    });
    return;
  }

  next();
}
