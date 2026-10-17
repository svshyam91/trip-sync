import { Router } from 'express';

import { createTrip, getTrip } from './trip.controller.js';

const router = Router();

router.post('/trips', createTrip);
router.get('/trips/:tripId', getTrip);

export default router;
