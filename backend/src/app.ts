import cookieParser from 'cookie-parser';
import express from 'express';

import { NotFoundError } from '#errors/app-error.js';
import { errorHandler } from '#middlewares/error-handler.js';

import authRoutes from './modules/auth/auth.routes.js';
import placeRoutes from './modules/places/place.routes.js';
import tripRoutes from './modules/trips/trip.routes.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(tripRoutes);
app.use(placeRoutes);
app.use(authRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

app.use((req, _res, next) => {
  next(new NotFoundError(`Route ${req.path} not found`));
});

app.use(errorHandler);

export default app;
