# AGENTS.md

## Cursor Cloud specific instructions

CX ENERTECH is a single Nuxt 4 marketing website (frontend + Nitro SSR only). There is **no backend service, database, or environment variables** — content is static (e.g. `app/utils/projects.ts`).

### Services

| Service | Command | Notes |
|---|---|---|
| Nuxt dev server | `npm run dev` | The only service. Serves the full app on `http://localhost:3000`. This is all that's needed to test end-to-end. |

Standard scripts are documented in `README.md` / `package.json` (`dev`, `build`, `preview`, `generate`). There are **no `lint` or `test` scripts** in this repo.

### Non-obvious notes

- Dependencies are already installed on startup by the update script (`npm install`, which runs `nuxt prepare` via `postinstall`). Just run `npm run dev`.
- `npm install` emits an `EBADENGINE` warning for `@babel/types` wanting Node `>=22.18.0` (VM has 22.14.0). This is harmless — install, prepare, and dev server all work fine.
- The quotation form at `/contact/quotation` is client-side only: submitting shows an in-page success state ("ได้รับคำขอแล้ว") without any network/API call. Good smoke-test of interactivity.
- `@nuxt/fonts` fetches Google Fonts at dev/build time; if outbound internet is blocked, the site still renders with fallback fonts (cosmetic only).
