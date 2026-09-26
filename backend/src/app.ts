import express from 'express';
import tripRoutes from './modules/trips/trip.routes.js';

const app = express();

app.use(express.json());

app.use(tripRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

export default app;
