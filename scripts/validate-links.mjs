#!/usr/bin/env node
/**
 * Static link + CTA validation for GameNightLab home.
 * No secrets. Fails closed on missing primary CTA or broken local assets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

const errors = [];

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
const localAssets = hrefs.filter((h) => !h.startsWith("http") && !h.startsWith("mailto:") && !h.startsWith("#") && h !== "/");
for (const rel of localAssets) {
  const target = path.join(root, rel.replace(/^\//, ""));
  if (!fs.existsSync(target)) errors.push(`Missing local asset: ${rel}`);
}

const requiredFiles = ["styles.css", "assets/favicon.svg", "assets/og-card.svg", "README.md"];
for (const rel of requiredFiles) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing required file: ${rel}`);
}

// Count Explore CTAs → kingdom only
const exploreMatches = [...html.matchAll(/href="(https:\/\/[^"]+)"[^>]*>\s*Explore Kingdom OS\s*</g)];
for (const m of exploreMatches) {
  if (m[1] !== "https://kingdom.gamenightlab.com/") {
    errors.push(`Explore Kingdom OS points to unexpected URL: ${m[1]}`);
  }
}
if (exploreMatches.length < 2) {
  errors.push(`Expected at least 2 Explore Kingdom OS CTAs, found ${exploreMatches.length}`);
}

if (errors.length) {
  console.error("FAIL validate-links");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("PASS validate-links");
console.log(`Checked ${hrefs.length} hrefs; Explore CTAs=${exploreMatches.length}`);
