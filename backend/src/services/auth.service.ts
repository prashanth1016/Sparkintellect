import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/index.js";
import { User, IUser } from "../models/User.js";

const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64 MB
  timeCost: 3, // 3 iterations
  parallelism: 4, // 4 threads
};

export class AuthService {
  static async hashPassword(plainText: string): Promise<string> {
    return await argon2.hash(plainText, ARGON2_OPTIONS);
  }

  static async verifyPassword(hash: string, plainText: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plainText);
    } catch {
      return false;
    }
  }

  static generateToken(user: IUser): string {
    return jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: (config.JWT_EXPIRES_IN || "7d") as any }
    );
  }

  static generateRandomToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
