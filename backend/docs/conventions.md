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
    const input = someSchema.parse(req.body);
    const result = await someService.doThing(input);

    res.status(201).json({ thing: result });
  } catch (error) {
    next(error);
  }
};
```

Real example: `src/modules/auth/auth.controller.ts`. `try/catch → next(error)` is the existing pattern. Express 5 also forwards rejected promises from async handlers, so the `try/catch` is optional, but not yet decided; follow the surrounding code.

- Never `return res.json(...)`; send, then `return;` only where an early exit is needed. Never send twice (return after an early response).
- Decide per endpoint whether invalid input is an error or a fall-through (e.g. a bad cookie on a guest endpoint just means "no session").
- A create-or-reuse endpoint returns `201` when it creates and `200` when it reuses.

## Validation

- Use `safeParse` where invalid input is an expected value you handle (e.g. an optional cookie). Use `parse` where invalid input should fail the request: the `ZodError` reaches `errorHandler`, which responds `422`.
- Zod v4: top-level formats (`z.uuid()`, `z.email()`), not `z.string().uuid()`.

## Error handling

Errors live in `src/errors/`; `src/middlewares/error-handler.ts` turns them into responses (`{ error: { code, message, details? } }`).

- **Throw, don't respond.** Throw an `AppError` subclass and let `errorHandler` respond. Don't hand-build error JSON in new code.
- **Add a new error** as a code in `error.constants.ts` (it fixes the status and default message); don't pass a status separately.
- **Security-sensitive endpoints** (login, tokens): don't let a `ZodError` through, since its issues become the response `details`. Throw an error without `details`.
- **Legacy:** `trips/` and `places/` still hand-build `400` responses; migrate them when touched.
