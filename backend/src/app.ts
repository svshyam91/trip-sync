import cookieParser from 'cookie-parser';
import express from 'express';

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

export default app;
