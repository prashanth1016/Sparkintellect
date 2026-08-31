import mongoose, { Schema, Document } from "mongoose";
import argon2 from "argon2";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "CEO" | "ADMIN" | "STAFF";
  permissions: string[];
  status: "active" | "inactive";
  failedLoginAttempts: number;
  lockUntil?: Date;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  lastLoginAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  verifyPassword(plainText: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["CEO", "ADMIN", "STAFF"],
      default: "STAFF",
    },
    permissions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    twoFactorSecret: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Method to verify password with Argon2id
UserSchema.methods.verifyPassword = async function (plainText: string): Promise<boolean> {
  try {
    return await argon2.verify(this.passwordHash, plainText);
  } catch {
    return false;
  }
};

export const User = mongoose.model<IUser>("User", UserSchema);
