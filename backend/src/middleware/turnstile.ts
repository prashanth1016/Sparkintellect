import { Request, Response, NextFunction } from "express";
import { config } from "../config/index.js";

export async function verifyTurnstile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // If turnstile is not enabled or secret key is omitted in dev, bypass
  if (!config.CLOUDFLARE_TURNSTILE_ENABLED || !config.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    return next();
  }

  const token = req.body["cf-turnstile-response"] || req.headers["cf-turnstile-response"];

  if (!token) {
    res.status(400).json({
      success: false,
      error: "Bot verification required. Please complete the security challenge.",
      code: "TURNSTILE_MISSING",
    });
    return;
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const formData = new URLSearchParams();
    formData.append("secret", config.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append("response", token.toString());
    if (ip && typeof ip === "string") {
      formData.append("remoteip", ip);
    }

    const cfResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const outcome = (await cfResponse.json()) as { success: boolean; "error-codes"?: string[] };

    if (!outcome.success) {
      res.status(400).json({
        success: false,
        error: "Bot challenge verification failed. Please refresh and try again.",
        code: "TURNSTILE_FAILED",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Turnstile verification error:", error);
    // In case Cloudflare API is temporarily unreachable, allow to proceed with standard rate limiting
    next();
  }
}
