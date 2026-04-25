import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const schemasDir = fileURLToPath(new URL("../schemas", import.meta.url));

function findJsonFiles(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (extname(entry) === ".json") {
      files.push(fullPath);
    }
  }
  return files;
}

const files = findJsonFiles(schemasDir);

if (files.length === 0) {
  console.log("No JSON schema files found — skipping validation.");
  process.exit(0);
}

let errors = 0;

for (const file of files) {
  const relativePath = file.replace(schemasDir + "/", "");
  try {
    JSON.parse(readFileSync(file, "utf8"));
    console.log(`✓  schemas/${relativePath}`);
  } catch (err) {
    console.error(`✗  schemas/${relativePath}\n   ${err.message}`);
    errors++;
  }
}

console.log(`\n${files.length} file(s) checked, ${errors} error(s).`);

if (errors > 0) {
  process.exit(1);
}
