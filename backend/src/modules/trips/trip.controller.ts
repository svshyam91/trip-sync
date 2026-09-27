import type { RequestHandler } from 'express';

import * as tripService from './trip.service.js';

const createTrip: RequestHandler = async (req, res, next) => {
  try {
    const { name, destinationLocationId, arriveBy } = req.body;

    const response = await tripService.createTrip(
      name,
      destinationLocationId,
      arriveBy,
    );

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export { createTrip };
