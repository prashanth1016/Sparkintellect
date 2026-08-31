import dns from "node:dns";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { config } from "./config/index.js";
import { connectDB, disconnectDB } from "./db/connection.js";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Use reliable public DNS resolvers for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Trust proxy for rate limiting behind Cloudflare/Render reverse proxies
app.set("trust proxy", 1);

// Security Middleware (Helmet with CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://challenges.cloudflare.com"],
        frameSrc: ["'self'", "https://challenges.cloudflare.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'", ...config.ALLOWED_ORIGINS],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration supporting credentials (cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (
        config.ALLOWED_ORIGINS.includes(origin) ||
        config.NODE_ENV === "development"
      ) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy violation: origin not permitted.")
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "cf-turnstile-response",
    ],
  })
);

// Body and Cookie parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser(config.SESSION_SECRET));

// Request Logging
if (config.NODE_ENV !== "test") {
  app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"));
}

// Health Check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "SparkIntellect API Engine",
    environment: config.NODE_ENV,
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
  });
});

// API v1 Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server & Connect to DB
async function startServer() {
  await connectDB();

  const server = app.listen(config.PORT, () => {
    console.log(
      `🚀 SparkIntellect Backend running on port ${config.PORT} [${config.NODE_ENV}]`
    );
  });

  // Graceful Shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Closing server gracefully...`);

    server.close(async () => {
      await disconnectDB();
      console.log("👋 Process terminated.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

if (process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("Fatal startup error:", err);
    process.exit(1);
  });
}

export { app };