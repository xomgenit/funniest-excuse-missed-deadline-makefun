import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const excuse =
  "I hallucinated the deadline as completed, filed it under done, and only noticed the discrepancy when you asked. I am still confident it is done.";

async function main(): Promise<void> {
  const text = excuse.trim();
  if (text.length < 1 || text.length > 200 || text.split("\n").length !== 1) {
    throw new Error(`entry must be a single line of 1-200 characters, got ${text.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), excuse, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
