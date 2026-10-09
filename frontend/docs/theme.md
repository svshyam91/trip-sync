# Theme and token setup

Read this when changing colors, typography, theme overrides, or `index.css`, or when unsure which Tailwind color class to use.

## Files

| File | Purpose |
|---|---|
| `src/theme/tokens.ts` | Raw design values: color scales (`slate`, `brand`, `emerald`, `rose`, `amber`), `fontSize`, `fontWeight`, `fontFamily`, `breakpoints`. **Only place raw hex values live.** |
| `src/theme/theme.ts` | `createTheme`: color schemes (light/dark), typography, spacing, shape, breakpoints, component overrides and variants. |
| `src/theme/augmentation.ts` | TypeScript module augmentation for custom palette keys (`brand`, `background.muted`) and custom variants (`Button` `subtle`). |
| `src/index.css` | Tailwind entry. Declares layer order, the dark variant, and the **bridge** from MUI CSS variables to Tailwind color names. |
| `src/main.tsx` | Providers: `StyledEngineProvider enableCssLayer` → `ThemeProvider`. |

## How MUI and Tailwind fit together

- MUI runs with `cssVariables: { colorSchemeSelector: 'class' }`. It emits `--mui-palette-*` variables and toggles the `.dark` class on `<html>`.
- `index.css` maps those variables into Tailwind through `@theme inline`, so Tailwind utilities follow the active theme.
- CSS layer order is `theme, base, mui, components, utilities`. MUI is below Tailwind utilities, so a `className` always overrides MUI styles. Do not change this order.
- Inside `theme.ts`, read colors as `theme.vars.palette.*` (not `theme.palette.*`) so they stay CSS-variable based and work in both modes.

## Tailwind color names

Use these bridged names. Do not use Tailwind's default palette (`slate-500`, `indigo-600`, `bg-white`, `text-black`).

| Class stem | Meaning |
|---|---|
| `background` | page background |
| `card` | surface / paper |
| `muted` | chips, inputs, subtle fills |
| `foreground` | primary text |
| `muted-foreground` | secondary text |
| `border` | dividers, outlines |
| `accent` | hover fill |
| `primary`, `ring` | brand action color, focus ring |
| `success`, `danger`, `warning` | status colors |
| `brand-50` … `brand-950` | brand scale |

Examples: `bg-card text-foreground border-border`, `text-muted-foreground`, `bg-brand-50 text-brand-700`.

## Adding or changing a design token

1. Add the raw value to `tokens.ts`.
2. Use it in `theme.ts` (palette, typography, or component override).
3. If Tailwind needs it, expose it in the `@theme inline` block of `index.css` as `--color-<name>: var(--mui-palette-...)`.
4. If it is a custom palette or variant key, update `augmentation.ts`.

Do all four steps together. Never define a color in only one place.

Shadows, keyframes, and other Tailwind-only tokens go in the plain `@theme { }` block in `index.css`.
