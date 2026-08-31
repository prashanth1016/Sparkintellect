import { describe, it, expect, jest } from "@jest/globals";
import { createRateLimiter } from "../src/middleware/rateLimiter.js";
import { Request, Response } from "express";

describe("Rate Limiter Middleware Tests", () => {
  it("should allow requests under the limit and block requests over the limit", () => {
    const limiter = createRateLimiter({
      windowMs: 1000,
      max: 2,
      message: "Limit exceeded",
      keyGenerator: () => "test_ip_123",
    });

    const mockReq = {
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as Request;

    const mockRes = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    // Request 1 -> allowed
    limiter(mockReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(1);

    // Request 2 -> allowed
    limiter(mockReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(2);

    // Request 3 -> blocked with 429
    limiter(mockReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(2); // not called again
    expect(mockRes.status).toHaveBeenCalledWith(429);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        code: "RATE_LIMIT_EXCEEDED",
      })
    );
  });
});
