# Styling guide

Read this when writing or changing any component's look. Token and theme details are in [theme.md](theme.md).

## Order of preference

Go to the next step only when the previous one cannot do the job.

1. **MUI component props.** `variant`, `color`, `size`, `fullWidth`, `disabled`, `startIcon`, etc. Layout components count too: `Stack` (`direction`, `spacing`) for rows and columns, `Grid` (`size`, `columns`) for 2-D grids. Use `color="inherit"` on `Typography` instead of a text-color class when the color comes from the parent.
   ```tsx
   <Button variant="contained" color="primary" size="small" startIcon={<Icon name="plus" />}>
   ```
2. **Theme for anything repeated.** If the same styling is needed in 2+ places, add it to `src/theme/theme.ts` (`components.MuiX.styleOverrides` or `variants`) instead of copying classes. Example: `variant="subtle"` on `Button` already exists.
3. **Tailwind `className` for what MUI props do not cover.** Positioning (`relative`, `absolute`), `overflow`, gradients, blur, borders, shadows, rounded corners, margin, padding, sizing, responsive visibility, alignment (`items-center`), text utilities. Reach for raw `flex`/`grid` only when `Stack`/`Grid` cannot express it.
   ```tsx
   <Stack spacing={3} className="relative overflow-hidden rounded-3xl p-4">
   ```
4. **`sx` only when Tailwind cannot reach.** That means targeting MUI internal slots (`'& .MuiButton-startIcon'`) or using `theme.vars.*` values computed at runtime. Do not use `sx` for plain layout or spacing.

## Never

- Write plain CSS files or `<style>` blocks for components. Global CSS lives only in `src/index.css`.
- Use `styled()` or `makeStyles` for things Tailwind or the theme can do.
- Hardcode hex or rgb colors. Use semantic tokens (see [theme.md](theme.md)).
- Use inline `style={{}}` except for truly dynamic values (a computed gradient, a coordinate).
- Use `!important`, or arbitrary values (`w-[137px]`) when a theme token or standard scale value exists.
- Use `@mui/icons-material`. Icons come from `<Icon name="..." />` only.

## Mobile first

- Write the base style for the smallest screen, then add larger breakpoints.
- Tailwind: unprefixed classes are mobile. Enhance with `sm:`, `md:`, `lg:`, `xl:`. Never use `max-*:` to patch desktop designs down to mobile.
  ```tsx
  className = 'flex flex-col gap-3 md:flex-row md:gap-6'; // correct
  ```
- MUI `sx` / props: object form with `xs` first. `sx={{ p: { xs: 3, md: 6 } }}`.
- Breakpoints are identical in MUI and Tailwind: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Touch targets at least 40×40px on mobile. No hover-only interactions. Use `dvh`, not `vh`, for full-height layouts.
- Check every new screen at 375px width first.

## Dark mode

- Semantic tokens switch automatically. Do not add `dark:` variants for them.
- Use `dark:` only for something with no token (rare).
- Never branch on the mode in JS to pick colors. `useColorScheme()` is for the toggle UI only.

## Spacing, radius, typography

- Spacing unit is **4px** in both systems: MUI `sx={{ p: 3 }}` = 12px = Tailwind `p-3`.
- Default radius is 12px (`rounded-xl`).
- Use MUI `Typography` with a `variant` for text, not raw `<h1>`/`<p>` with ad-hoc font classes. Custom variants (`overline`, `subtitle1`, `h4`) are in `theme.ts`. Add new variants there, with module augmentation if needed.
- Do not set `font-family` in components. It comes from the theme.
