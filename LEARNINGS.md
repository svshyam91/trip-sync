# LEARNINGS.md

Decision log. Newest first. Do not store secrets here.

## 2026-10-09 — Shared Cursor MCP, rest of `.cursor/` local

**Decision:** Commit `.cursor/mcp.json` (`mui-mcp`, `playwright`) so Cursor clones get the same project MCP. Keep an identical root `.mcp.json` for portable/other clients. Gitignore `.cursor/*` except `!.cursor/mcp.json`.

**Why:** Cursor’s project path is `.cursor/mcp.json`; other tools use root `.mcp.json`. Neither file has secrets (`npx` only). Committing the whole `.cursor/` folder would mix personal rules and local junk into git.

**Rejected:** Tracking all of `.cursor/`. Relying on root `.mcp.json` alone for Cursor (Cursor does not document that path).
