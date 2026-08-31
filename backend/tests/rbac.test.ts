import { describe, it, expect, jest } from "@jest/globals";
import { requirePermission, requireCEO } from "../src/middleware/rbac.js";
import { AuthRequest } from "../src/middleware/auth.js";
import { Response } from "express";

describe("RBAC Middleware Tests", () => {
  it("should allow CEO to access any permission without explicit grant", () => {
    const middleware = requirePermission("secret.permission");

    const mockReq = {
      user: {
        role: "CEO",
        permissions: [],
      },
    } as unknown as AuthRequest;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    middleware(mockReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should allow STAFF with exact permission", () => {
    const middleware = requirePermission("internship.read");

    const mockReq = {
      user: {
        role: "STAFF",
        permissions: ["internship.read", "contact.read"],
      },
    } as unknown as AuthRequest;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    middleware(mockReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should reject STAFF without permission with 403 Forbidden", () => {
    const middleware = requirePermission("employee.delete");

    const mockReq = {
      user: {
        role: "STAFF",
        permissions: ["internship.read"],
      },
    } as unknown as AuthRequest;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    middleware(mockReq, mockRes, next);
    expect(next).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: "FORBIDDEN",
      })
    );
  });

  it("should enforce requireCEO exclusively for CEO role", () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    const staffReq = {
      user: { role: "STAFF", permissions: ["*"] },
    } as unknown as AuthRequest;

    requireCEO(staffReq, mockRes, next);
    expect(next).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(403);

    const ceoReq = {
      user: { role: "CEO" },
    } as unknown as AuthRequest;

    requireCEO(ceoReq, mockRes, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
