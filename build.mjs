import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, "dist");
const output = resolve(dist, "output");
rmSync(dist, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, "index.html"), resolve(output, "index.html"));
if (existsSync(resolve(root, "public"))) {
  cpSync(resolve(root, "public"), output, { recursive: true });
}
console.log("Static leader suite built in dist/");
