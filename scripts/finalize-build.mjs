import { mkdir, rename } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = new URL("../dist/", import.meta.url);
const englishFile = new URL("en.html", outputDirectory);
const englishDirectory = new URL("en/", outputDirectory);
const englishIndex = new URL("index.html", englishDirectory);

await mkdir(englishDirectory, { recursive: true });
await rename(englishFile, englishIndex);

console.log(`Finalized localized index at ${join("dist", "en", "index.html")}`);
