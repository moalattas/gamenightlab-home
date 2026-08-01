#!/usr/bin/env node
/**
 * Static link + CTA validation for GameNightLab home.
 * Validates the Cloudflare deploy tree under public/ only.
 * No secrets. Fails closed on missing primary CTA or broken local assets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const htmlPath = path.join(publicRoot, "index.html");
const MAX_ASSET_BYTES = 25 * 1024 * 1024;

const errors = [];

if (!fs.existsSync(htmlPath)) {
  console.error("FAIL validate-links");
  console.error(" - Missing public/index.html");
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");

function mustInclude(label, needle) {
  if (!html.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

mustInclude("primary kingdom CTA href", 'href="https://kingdom.gamenightlab.com/"');
mustInclude("canonical kingdom journey note", "https://app.gamenightlab.com/");
mustInclude("contact email", "mailto:pilot@gamenightlab.com");
mustInclude("Explore Kingdom OS label", "Explore Kingdom OS");

if (/waitlist/i.test(html)) errors.push("Contains waitlist copy/link — not allowed");
if (/href="http:\/\//i.test(html)) errors.push("Found non-HTTPS http:// link");

const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
const localAssets = hrefs.filter(
  (h) => !h.startsWith("http") && !h.startsWith("mailto:") && !h.startsWith("#") && h !== "/"
);
for (const rel of localAssets) {
  const target = path.join(publicRoot, rel.replace(/^\//, ""));
  if (!fs.existsSync(target)) errors.push(`Missing local asset under public/: ${rel}`);
}

const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/assets/favicon.svg",
  "public/assets/og-card.svg",
  "README.md",
  "wrangler.jsonc",
];
for (const rel of requiredFiles) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing required file: ${rel}`);
}

// Count Explore CTAs → kingdom only
const exploreMatches = [
  ...html.matchAll(/href="(https:\/\/[^"]+)"[^>]*>\s*Explore Kingdom OS\s*</g),
];
for (const m of exploreMatches) {
  if (m[1] !== "https://kingdom.gamenightlab.com/") {
    errors.push(`Explore Kingdom OS points to unexpected URL: ${m[1]}`);
  }
}
if (exploreMatches.length < 2) {
  errors.push(`Expected at least 2 Explore Kingdom OS CTAs, found ${exploreMatches.length}`);
}

// Cloudflare asset size gate: every file under public/ must be < 25 MiB
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const size = fs.statSync(full).size;
    if (size >= MAX_ASSET_BYTES) {
      errors.push(
        `Asset exceeds 25 MiB: ${path.relative(root, full)} (${(size / (1024 * 1024)).toFixed(1)} MiB)`
      );
    }
  }
}
walk(publicRoot);

// Ensure deploy boundary files are not inside public/
for (const forbidden of ["node_modules", "package.json", "scripts", ".git"]) {
  if (fs.existsSync(path.join(publicRoot, forbidden))) {
    errors.push(`Forbidden path inside public/: ${forbidden}`);
  }
}

if (errors.length) {
  console.error("FAIL validate-links");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("PASS validate-links");
console.log(`public/ tree OK; hrefs=${hrefs.length}; Explore CTAs=${exploreMatches.length}`);
