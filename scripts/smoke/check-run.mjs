import { spawn } from "node:child_process";

function run(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { stdio: "pipe", shell: true });
    let output = "";

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
        return;
      }

      reject(new Error(output || `Command failed: ${command}`));
    });
  });
}

async function main() {
  await run("corepack pnpm build");
  await run("corepack pnpm dev --help");
  console.log("Run smoke check passed.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
