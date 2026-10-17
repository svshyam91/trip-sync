import type { NextFunction, RequestHandler, Response } from 'express';

import * as tripService from './trip.service.js';

const createTrip: RequestHandler = async (req, res, next) => {
  try {
    const body: unknown = req.body;
    const { name, destinationPlaceId, arriveBy } = (body ?? {}) as Record<
      string,
      unknown
    >;

    // TODO: Refactor using zod
    if (
      typeof name !== 'string' ||
      typeof destinationPlaceId !== 'string' ||
      (typeof arriveBy !== 'string' && typeof arriveBy !== 'number')
    ) {
      res.status(400).json({
        error:
          "Missing or invalid body. 'name' and 'destinationPlaceId' must be strings, 'arriveBy' must be a date.",
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
      destinationPlaceId,
      arriveByDate,
    );

    res.status(201).json(response);
  } catch (error) {
    handleTripHttpError(error, res, next);
  }
};

const getTrip: RequestHandler = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    if (typeof tripId !== 'string' || tripId.trim() === '') {
      res.status(400).json({
        error: "Missing or invalid 'tripId'.",
      });

      return;
    }

    const response = await tripService.getTrip(tripId.trim());

    res.status(200).json(response);
  } catch (error) {
    handleTripHttpError(error, res, next);
  }
};

type HttpError = Error & { statusCode?: number };

const handleTripHttpError = (
  error: unknown,
  res: Response,
  next: NextFunction,
) => {
  const statusCode =
    error instanceof Error &&
    typeof (error as HttpError).statusCode === 'number'
      ? (error as HttpError).statusCode
      : undefined;

  if (statusCode === 400 || statusCode === 404) {
    res.status(statusCode).json({ error: (error as Error).message });

    return;
  }

  next(error);
};

export { createTrip, getTrip };
