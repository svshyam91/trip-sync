import { googlePlacesClient } from '#integrations/google/places/google-places.client.js';

import {
  LOCAL_DEV_CREATED_BY,
  TRIP_STATUS,
} from '../../constants/trip.constants.js';
import { generateRandomString } from '../../shared/utils/generate-random-string.js';

import { mapCreatedTrip } from './trip.mapper.js';
import * as tripRepository from './trip.repository.js';

type HttpError = Error & { statusCode?: number };

const createHttpError = (message: string, statusCode: number): HttpError => {
  const error: HttpError = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const createTrip = async (
  name: string,
  destinationPlaceId: string,
  arriveBy: Date,
) => {
  if (arriveBy.getTime() <= Date.now()) {
    throw createHttpError("'arriveBy' must be in the future.", 400);
  }

  const details =
    await googlePlacesClient.getPlaceDetails(destinationPlaceId);

  if (!details) {
    throw createHttpError(
      'Could not load destination coordinates for this place.',
      400,
    );
  }

  const persisted = await tripRepository.createLocationAndTrip({
    tripId: generateRandomString(),
    name,
    arriveBy,
    status: TRIP_STATUS.CREATED,
    createdAt: new Date(),
    createdBy: LOCAL_DEV_CREATED_BY,
    destination: {
      name: details.name,
      address: details.address,
      lat: details.lat,
      lng: details.lng,
    },
  });

  return mapCreatedTrip(persisted.trip, persisted.location);
};

export { createTrip };
