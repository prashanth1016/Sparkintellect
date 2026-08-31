import { describe, it, expect } from "@jest/globals";
import { AuthService } from "../src/services/auth.service.js";

describe("AuthService Unit Tests", () => {
  it("should hash a password using Argon2id and successfully verify it", async () => {
    const plainPassword = "SuperSecurePassword123!";
    const hash = await AuthService.hashPassword(plainPassword);

    expect(hash).toBeDefined();
    expect(hash.startsWith("$argon2id$")).toBe(true);

    const isMatch = await AuthService.verifyPassword(hash, plainPassword);
    expect(isMatch).toBe(true);

    const isWrong = await AuthService.verifyPassword(hash, "WrongPassword");
    expect(isWrong).toBe(false);
  });

  it("should generate random tokens for password resets", () => {
    const token1 = AuthService.generateRandomToken();
    const token2 = AuthService.generateRandomToken();

    expect(token1).toHaveLength(64);
    expect(token2).toHaveLength(64);
    expect(token1).not.toEqual(token2);
  });
});
