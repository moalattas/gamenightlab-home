# Cursor rule: session log

Copy this file into a repo as `.cursor/rules/session-log.md`. One copy per repo you code in.

## Where the truth lives

- Project session log: `/home/mo/home/projects/<project>/LOG.md` on the home server (srv-lin-core-01, Tailscale 100.112.222.67, user `mo`).
- Active chats index: `/home/mo/home/notes/active-chats.md`.
- If this workspace is open on the server (Cursor Remote-SSH), read/write these paths directly.
- If this workspace is local (e.g. the Windows PC), read them with: `ssh mo@100.112.222.67 cat /home/mo/home/projects/<project>/LOG.md` — the PC is on Tailscale, so plain SSH works.

## At the start of a session

- Read the project's LOG.md and the active-chats index. Start from the last "Next:" line. Do not re-ask what was already decided.

## At the end of a session

- Append one line to the project's LOG.md: `YYYY-MM-DD — Cursor on <computer> — <what changed> — Next: <next step>`.
- Update that project's row in notes/active-chats.md (last update + next step).
- For code: commit and push so the next machine gets it. Never leave uncommitted work as the only copy.
