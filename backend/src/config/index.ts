import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000").transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGO_URI: z.string().default("mongodb://127.0.0.1:27017/sparkintellect"),
  SESSION_SECRET: z.string().default("default_dev_session_secret_replace_in_production_min64chars"),
  JWT_SECRET: z.string().default("default_dev_jwt_secret_replace_in_production_min64chars"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default("SparkIntellect <no-reply@sparkintellect.in>"),
  CEO_NOTIFICATION_EMAIL: z.string().default("info@sparkintellect.in"),
  CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string().optional(),
  CLOUDFLARE_TURNSTILE_ENABLED: z.string().default("false").transform((v) => v === "true"),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
  GOOGLE_SHEET_ID: z.string().optional(),
  GOOGLE_SHEET_TAB_NAME: z.string().default("Applications"),
  GOOGLE_DRIVE_RESUME_FOLDER_ID: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REFRESH_TOKEN: z.string().optional(),
  UPLOAD_DIR: z.string().default(path.join(process.cwd(), "uploads")),
  MAX_FILE_SIZE_BYTES: z.string().default("5242880").transform((v) => parseInt(v, 10)),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:3001,https://sparkintellect.in,https://www.sparkintellect.in,https://admin.sparkintellect.in")
    .transform((val) => val.split(",").map((s) => s.trim())),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Environment configuration validation failed:", parsedEnv.error.format());
  process.exit(1);
}

export const config = parsedEnv.data;
