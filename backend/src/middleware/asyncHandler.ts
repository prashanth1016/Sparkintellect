import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async route handler to catch errors and forward them to Express next(err)
 * preventing unhandled promise rejections from crashing the server process.
 */
export function asyncHandler(
  fn: (req: Request | any, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
