# GameNightLab Home

Static public homepage for **https://gamenightlab.com**

This repository contains **only** the company marketing homepage (HTML/CSS/assets). It does **not** include Kingdom OS application code, Backend_Forge, Frontend_Hall, OAuth, nginx, or pilot deployment configuration.

Version: **Home v0.1.1**

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
| `public/index.html` | Homepage (`/`) — **deploy tree** |
| `public/styles.css` | Brand styles (aligned with kingdom-os-landing tokens) |
| `public/assets/` | Favicon + Open Graph card |
| `wrangler.jsonc` | Cloudflare Workers static-assets config (`assets.directory = ./public`) |
| `scripts/validate-links.mjs` | Static CTA/link + size checks |
| `package.json` | Local preview/validate scripts only (not deployed) |

**Deploy boundary:** Cloudflare must publish **`./public` only**. Never deploy the repository root (that would upload `node_modules`, including oversized binaries such as `workerd`).

## Local preview

```bash
npm run preview
# or: npx --yes serve -l 5055 public
```

Open http://127.0.0.1:5055/

## Cloudflare deployment settings

Suggested project name: **`gamenightlab-home`**

### Workers static assets / Wrangler

`wrangler.jsonc` sets:

- `name`: `gamenightlab-home`
- `assets.directory`: `./public`

Deploy with Wrangler (when you choose to publish — not part of this packaging fix):

```bash
npx wrangler deploy
```

### Cloudflare dashboard (Workers Builds / Pages-style)

| Setting | Value |
|---------|--------|
| Framework preset | **None** |
| Build command | *(leave blank)* |
| Deploy / static assets directory | **`public`** (resolves to `./public`) |
| Production branch | `main` |

Do **not** set the assets directory to `/` or `.` (repository root).

After a successful deploy, attach custom domains (human ops):

- `gamenightlab.com`
- `www.gamenightlab.com`

### DNS note (do not change from this repo)

Existing Cloudflare DNS for the zone may still point **root** and **www** at:

`parkingpage.namecheap.com`

Custom-domain activation replaces parking after Pages/Workers assets are live. Do **not** edit DNS from application code.

## Validation

```bash
node scripts/validate-links.mjs
git diff --check
```

Confirms Explore CTAs, local assets under `public/`, and every file in `public/` is under Cloudflare’s 25 MiB asset limit.

## Out of scope

- Redesigning `kingdom.gamenightlab.com` or `app.gamenightlab.com`
- Changing DNS, Cloudflare tunnel, OAuth, nginx, or the pilot app
- Fake social / careers / docs links
