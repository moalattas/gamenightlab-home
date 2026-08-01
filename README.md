# GameNightLab Home

Static public homepage for **https://gamenightlab.com**

This repository contains **only** the company marketing homepage (HTML/CSS/assets). It does **not** include Kingdom OS application code, Backend_Forge, Frontend_Hall, OAuth, nginx, or pilot deployment configuration.

Version: **Home v0.1.0**

## Journey

```
https://gamenightlab.com
  → Explore Kingdom OS
https://kingdom.gamenightlab.com
  → Enter Kingdom OS
https://app.gamenightlab.com
```

Primary CTA: **Explore Kingdom OS** → `https://kingdom.gamenightlab.com/`  
Contact: `pilot@gamenightlab.com`

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | Homepage (`/`) |
| `styles.css` | Brand styles (aligned with kingdom-os-landing tokens) |
| `assets/favicon.svg` | Favicon |
| `assets/og-card.svg` | Open Graph card |
| `scripts/validate-links.mjs` | Static CTA/link checks |

For Cloudflare Pages, the **production output is the repository root** (no build step).

## Local preview

```bash
npx --yes serve -l 5055
```

Open http://127.0.0.1:5055/

## Cloudflare Pages deployment

Suggested project name: **`gamenightlab-home`**

### Option A — Direct upload (no build)

1. Create a Cloudflare Pages project named `gamenightlab-home`.
2. Upload / connect this repository.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (repository root)
4. After the first successful deploy, attach custom domains:
   - `gamenightlab.com`
   - `www.gamenightlab.com`

### Option B — Git-connected project

1. Connect the `moalattas/gamenightlab-home` GitHub repository.
2. Production branch: `main` (after this PR merges).
3. Same build settings as Option A (no build; output `/`).

### DNS note (do not change from this repo)

Existing Cloudflare DNS for the zone currently points **root** and **www** at:

`parkingpage.namecheap.com`

That parking target is **outside** this repository. After the Pages project is live, use Cloudflare’s custom-domain flow for `gamenightlab.com` and `www.gamenightlab.com` so Pages becomes the origin and replaces the Namecheap parking page. Do **not** edit DNS from application code.

## Validation

```bash
# static link check (requires network for remote HEAD)
node scripts/validate-links.mjs

# whitespace / conflict markers
git diff --check
```

## Out of scope

- Redesigning `kingdom.gamenightlab.com` or `app.gamenightlab.com`
- Changing DNS, Cloudflare tunnel, OAuth, nginx, or the pilot app
- Fake social / careers / docs links
