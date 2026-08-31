import { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale keys every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}, 5 * 60 * 1000);

export interface RateLimiterOptions {
  windowMs: number; // e.g. 15 * 60 * 1000
  max: number; // e.g. 5
  message?: string;
  keyGenerator?: (req: Request) => string;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const {
    windowMs,
    max,
    message = "Too many requests. Please try again later.",
    keyGenerator = (req) => {
      const forwarded = req.headers["x-forwarded-for"];
      const ip = (typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress) || "unknown";
      return `${ip}:${req.baseUrl || ""}${req.path}`;
    },
  } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = keyGenerator(req);
    const now = Date.now();

    let record = rateLimitStore.get(key);
    if (!record) {
      record = { timestamps: [] };
      rateLimitStore.set(key, record);
    }

    // Filter out timestamps outside current sliding window
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

    if (record.timestamps.length >= max) {
      const oldestInWindow = record.timestamps[0];
      const resetTime = oldestInWindow + windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

      res.setHeader("Retry-After", retryAfterSeconds.toString());
      res.setHeader("X-RateLimit-Limit", max.toString());
      res.setHeader("X-RateLimit-Remaining", "0");
      res.setHeader("X-RateLimit-Reset", Math.ceil(resetTime / 1000).toString());

      res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds,
        code: "RATE_LIMIT_EXCEEDED",
      });
      return;
    }

    // Record this hit
    record.timestamps.push(now);

    res.setHeader("X-RateLimit-Limit", max.toString());
    res.setHeader("X-RateLimit-Remaining", (max - record.timestamps.length).toString());

    next();
  };
}

// Preset rate limiters according to specification
export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5,
  message: "Too many failed login attempts. Please wait 15 minutes before trying again.",
  keyGenerator: (req) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const email = req.body?.email || "";
    return `auth:login:${ip}:${email}`;
  },
});

export const contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5,
  message: "Too many contact submissions from your IP. Please wait 10 minutes.",
});

export const applyRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 3,
  message: "Too many application submissions. Please wait 10 minutes before submitting again.",
});

export const uploadRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 10,
  message: "File upload rate limit reached. Please wait 10 minutes.",
});

export const publicApiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 min
  max: 100,
  message: "API rate limit exceeded. Please slow down your requests.",
});

export const adminApiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 min
  max: 120,
  message: "Admin API rate limit exceeded.",
});
