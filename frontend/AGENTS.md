# AGENTS.md — Frontend

Stack: React 19 · TypeScript · Vite · MUI v9.4 (`@mui/material`, Emotion) · Tailwind CSS v4 · FontAwesome · `@vis.gl/react-google-maps`.

Commands (from `frontend/`): `npm run dev` · `npm run lint` · `npm run build`

## Always follow

1. **Styling order:** MUI component props → theme override (if repeated) → Tailwind `className` → `sx` only for MUI internals or runtime theme values.
2. **Mobile first.** Unprefixed Tailwind classes are mobile; enhance with `sm: md: lg:`. Check at 375px.
3. **No hardcoded colors.** Use semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `brand-*`). Never Tailwind's default palette.
4. **Icons:** `<Icon name="..." />` only. No `@mui/icons-material`.
5. **Imports:** MUI path imports (`@mui/material/Button`), `@/` alias, type-only imports with `import { type X }`.
6. **Dependency direction:** `app → pages → features → components → lib`. Never import upward. Domain-aware code goes in `features/<name>/`, not `components/`.
7. **No** `any`, non-null `!`, `console.log`, plain CSS files, or inline `style` for static values.
8. **Before finishing:** `npm run lint` and `npx tsc -b` must pass. Works in light and dark mode.

## Read the matching doc before starting

| When you are…                                                                                 | Read                                       |
| --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Building or restyling a component, responsive or dark-mode behavior                           | [docs/styling.md](docs/styling.md)         |
| Changing colors, typography, theme overrides, `index.css`, or unsure which color class to use | [docs/theme.md](docs/theme.md)             |
| Creating or moving files, or adding cross-folder imports                                      | [docs/structure.md](docs/structure.md)     |
| Writing a new component, hook, util, or env variable                                          | [docs/conventions.md](docs/conventions.md) |
