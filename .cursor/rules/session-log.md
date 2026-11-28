# Cursor rule: session log (NEW — Nov 27, 2026, Mohammad's yes)

Copy this file into a repo as `.cursor/rules/session-log.md`. One copy per repo you code in.

## Where the truth lives

- Project session log: `/home/mo/home/projects/<project>/LOG.md` on the home server (srv-lin-core-01, Tailscale 100.112.222.67, user `mo`).
- Active chats index: `/home/mo/home/notes/active-chats.md`.
- If this workspace is open on the server (Cursor Remote-SSH), read/write these paths directly.
- If this workspace is local (e.g. the Windows PC), read them with: `ssh mo@100.112.222.67 cat /home/mo/home/projects/<project>/LOG.md` — the PC is on Tailscale, so plain SSH works. Write with ssh too (append via `ssh mo@100.112.222.67 "cat >> /home/mo/home/projects/<project>/LOG.md"`).

## At the start of a session

- Read the project's LOG.md and the active-chats index. Start from the last "Next:" line. Do not re-ask what was already decided.

## At the end of a session — finish the job yourself

- Do NOT stop and ask "say when to commit". Committing, pushing, and logging are part of the job.
- Commit only the files for this job, on the job's feature branch (cut from current main). Never commit directly to main.
- Push the branch, so the next machine gets it. Never leave uncommitted work as the only copy.
- Append one line to the project's LOG.md: `YYYY-MM-DD — Cursor on <computer> — <what changed> — Next: <next step>`.
- Update that project's row in notes/active-chats.md (last update + next step).
- End with a short summary: branch name, commit, what changed, and the next step.

## Still ask Mohammad first — never do these on your own

- Merging to main, deploying to live, anything touching the live database.
- Anything spending money or deleting data.
- If the commit, push, or log step fails, say exactly what failed and stop. Do not silently leave it undone.

---

## How to apply (job for Cursor on dev-01, after Slice 1 lands)

Copy this file to `.cursor/rules/session-log.md` in every repo Cursor codes in: kingdom-os, waqt-lilab, gamenightlab-home, sensorium-season-2, darna. Commit and push each one (own branch per repo, or direct to main only if the repo's rule is a docs-only change he already approved — otherwise a branch). Repos live under `C:\Users\engmh\Documents\Codex\` (kingdom-os, gamenightlab-home), `C:\Users\engmh\Documents\Git\` (waqt-lilab, sensorium), and darna wherever its checkout is — find it first.
