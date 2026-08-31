import { Request, Response, NextFunction } from "express";
import { config } from "../config/index.js";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isClientError = err.name === "ValidationError" || err.name === "CastError";
  const statusCode = err.statusCode || (isClientError ? 400 : 500);

  const errorMsg =
    err.name === "CastError"
      ? `Invalid resource identifier format for '${err.path}'.`
      : err.message || "An unexpected internal server error occurred.";

  const errorCode =
    err.code || (err.name === "CastError" ? "INVALID_IDENTIFIER" : "INTERNAL_ERROR");

  console.error(`❌ [${req.method} ${req.originalUrl}] Error:`, {
    message: err.message,
    name: err.name,
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    error: errorMsg,
    code: errorCode,
    ...(config.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
