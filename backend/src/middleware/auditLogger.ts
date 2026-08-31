import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.js";
import { AuditLog } from "../models/AuditLog.js";

export function logAuditEvent(action: string) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    // Intercept finish event to capture final status
    const originalSend = res.send;

    res.send = function (body?: any) {
      res.send = originalSend;

      const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
      const userAgent = req.headers["user-agent"] || "unknown";
      const isSuccess = res.statusCode >= 200 && res.statusCode < 400;

      // Async write to AuditLog
      AuditLog.create({
        actorId: req.user?._id?.toString(),
        actorName: req.user?.name,
        actorEmail: req.user?.email,
        actorRole: req.user?.role,
        action,
        targetResource: req.params?.id || req.baseUrl || req.path,
        ipAddress: typeof ipAddress === "string" ? ipAddress.split(",")[0] : "unknown",
        userAgent,
        status: isSuccess ? "success" : "failure",
        metadata: {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
        },
      }).catch((err) => {
        console.error("Failed to write audit log:", err);
      });

      return originalSend.call(this, body);
    };

    next();
  };
}
