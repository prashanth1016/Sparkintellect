import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

/**
 * Checks if a value is a valid MongoDB 24-character hexadecimal ObjectId string.
 */
export function isValidObjectId(id: unknown): boolean {
  if (typeof id !== "string") return false;
  const trimmed = id.trim();
  if (!/^[0-9a-fA-F]{24}$/.test(trimmed)) {
    return false;
  }
  return mongoose.Types.ObjectId.isValid(trimmed);
}

/**
 * Express middleware to validate an ObjectId parameter in req.params.
 */
export function validateObjectIdParam(paramName = "id") {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = req.params[paramName];
    if (!isValidObjectId(value)) {
      res.status(400).json({
        success: false,
        error: `Invalid resource identifier format for '${paramName}'.`,
        code: "INVALID_IDENTIFIER",
      });
      return;
    }
    next();
  };
}
