#!/usr/bin/env node

/**
 * SparkIntellect - Argon2id Password Hash Generator Utility
 * 
 * Usage:
 *   node scripts/generate-argon2-hash.js "YourSecurePassword123!"
 */

import argon2 from "argon2";
import readline from "readline";

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64 MB
  timeCost: 3, // 3 iterations
  parallelism: 4, // 4 threads
};

async function main() {
  let password = process.argv[2];

  if (!password) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    password = await new Promise((resolve) => {
      rl.question("Enter plaintext password to hash with Argon2id: ", (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  if (!password || password.length < 8) {
    console.error("❌ Password must be at least 8 characters long.");
    process.exit(1);
  }

  console.log("\n🔒 Hashing password with Argon2id parameters:");
  console.log("   • Type: Argon2id");
  console.log("   • Memory Cost: 64 MB (65536 KB)");
  console.log("   • Time Cost: 3 Iterations");
  console.log("   • Parallelism: 4 Threads\n");

  const hash = await argon2.hash(password, ARGON2_OPTIONS);

  console.log("================================================================================");
  console.log("ARGON2ID HASH OUTPUT:");
  console.log(hash);
  console.log("================================================================================\n");
  console.log("Copy this hash into your bootstrap script or MongoDB shell command.");
}

main().catch((err) => {
  console.error("Error generating hash:", err);
  process.exit(1);
});
