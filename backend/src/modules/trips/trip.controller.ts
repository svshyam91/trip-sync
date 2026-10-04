import type { RequestHandler } from 'express';

import * as tripService from './trip.service.js';

const createTrip: RequestHandler = async (req, res, next) => {
  try {
    const body: unknown = req.body;
    const { name, destinationLocationId, arriveBy } = (body ?? {}) as Record<
      string,
      unknown
    >;

    // TODO: Refactor using zod
    if (
      typeof name !== 'string' ||
      typeof destinationLocationId !== 'string' ||
      (typeof arriveBy !== 'string' && typeof arriveBy !== 'number')
    ) {
      res.status(400).json({
        error:
          "Missing or invalid body. 'name' and 'destinationLocationId' must be strings, 'arriveBy' must be a date.",
      });

      return;
    }

    const arriveByDate = new Date(arriveBy);

    if (isNaN(arriveByDate.getTime())) {
      res.status(400).json({ error: "'arriveBy' must be a valid date." });

      return;
    }

    const response = await tripService.createTrip(
      name,
      destinationLocationId,
      arriveByDate,
    );

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export { createTrip };
