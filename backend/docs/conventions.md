# Conventions

Read this when writing controller/service code, naming things, or using zod.

## Naming

- Files: `<entity>.<layer>.ts` (`auth.service.ts`), see [architecture.md](architecture.md). Constants: `<entity>.constants.ts`.
- Controller handlers are named for the user-facing action (`guestLogin`, `createTrip`). Services/repositories are named for the operation (`resolveGuestSession`, `createGuestUser`, `findUserById`).
- Zod schemas: `camelCase` + `Schema` suffix (`cookieSchema`); inferred types are PascalCase (`Cookie`).
- Constants: `UPPER_SNAKE_CASE`, flat and descriptive (`AUTH_COOKIE_NAME`), not a grab-bag object. Use an `as const` object only for a real set of alternatives.

## Controller shape

```ts
const handler: RequestHandler = async (req, res, next) => {
  try {
    const input = someSchema.safeParse(req.body);

    if (!input.success) {
      res.status(400).json({ error: 'Invalid request.' });

      return;
    }

    const result = await someService.doThing(input.data);

    res.status(201).json({ thing: result });
  } catch (error) {
    next(error);
  }
};
```

Real example: `src/modules/auth/auth.controller.ts`. The `try/catch → next(error)` and the `400` body above reflect current code, not a standard; error handling is not standardized yet.

- Never `return res.json(...)`; send, then `return;` only where an early exit is needed. Never send twice (return after an early response).
- Decide per endpoint whether invalid input is a `400` or a fall-through (e.g. a bad cookie on a guest endpoint just means "no session").
- A create-or-reuse endpoint returns `201` when it creates and `200` when it reuses.
- Don't echo zod error details for security-sensitive endpoints.

## Validation

- Use `safeParse`, not `parse`, for external input, so invalid input is a value you handle rather than a throw.
- Zod v4: top-level formats (`z.uuid()`, `z.email()`), not `z.string().uuid()`.
