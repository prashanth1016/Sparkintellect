
const argon2 = require("argon2");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

rl.question("Enter your new admin password: ", async (password) => {
  try {
    if (!password || password.length < 8) {
      throw new Error("Use a password with at least 12 characters.");
    }

    const hash = await argon2.hash(password);
    console.log("\nGenerated Argon2 hash:\n");
    console.log(hash);
  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
});
