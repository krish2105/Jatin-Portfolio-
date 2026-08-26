/**
 * Renders both resume variants to PDF.
 *
 *   node --experimental-strip-types scripts/build-resume.mjs
 *
 * Content comes from src/data/portfolio.ts, so the resume and the website
 * cannot disagree. Rendered with headless Chrome rather than a PDF library
 * because it gives real font shaping and selectable text — an applicant
 * tracking system has to be able to read this.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { buildResumeHtml } from "./resume-template.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = await import(join(root, "src/data/portfolio.ts"));

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VARIANTS = [
  { key: "netsuite", file: "Jatin_Acharya_Resume.pdf" },
  { key: "seam", file: "Jatin_Acharya_Resume_ERP_ML.pdf" },
];

const outDir = join(root, "public", "resume");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

for (const variant of VARIANTS) {
  const html = buildResumeHtml(data, variant.key);
  /* Staged in the OS temp dir, not in public/. Anything written under
     public/ is served — a stray .html next to the PDF would be a live URL. */
  const htmlPath = join(tmpdir(), `jatin-resume-${variant.key}.html`);
  writeFileSync(htmlPath, html, "utf8");

  const pdfPath = join(outDir, variant.file);
  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--virtual-time-budget=6000",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "pipe" },
  );

  console.log(`built ${variant.file}`);
}
