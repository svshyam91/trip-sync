# LEARNINGS.md

Decision log. Newest first. Do not store secrets here.

## 2026-10-11 — Create trip persists Place Details; `created_by` stub; `withTransaction`

**Decision:** `POST /trips` takes `destinationPlaceId`, calls Google Get Place (not autocomplete), inserts `locations` then `trips` in one `withTransaction`. `created_by` is `'local-dev'` until auth. JSON is camelCase; Postgres stays snake_case.

**Why:** Autocomplete has no lat/lng. The schema requires `created_by`. A helper plus `getDb()` is the Spring `REQUIRED` pattern so later writes can join the same transaction.

**Rejected:** Client sending lat/lng. Storing search text only. GET trip / UI in this slice. Putting Get Place inside the DB transaction.

## 2026-10-09 — Shared Cursor MCP, rest of `.cursor/` local

**Decision:** Commit `.cursor/mcp.json` (`mui-mcp`, `playwright`) so Cursor clones get the same project MCP. Keep an identical root `.mcp.json` for portable/other clients. Gitignore `.cursor/*` except `!.cursor/mcp.json`.

**Why:** Cursor’s project path is `.cursor/mcp.json`; other tools use root `.mcp.json`. Neither file has secrets (`npx` only). Committing the whole `.cursor/` folder would mix personal rules and local junk into git.

**Rejected:** Tracking all of `.cursor/`. Relying on root `.mcp.json` alone for Cursor (Cursor does not document that path).
