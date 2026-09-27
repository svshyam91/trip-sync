import { generateRandomString } from '../../utils/generate-random-string.js';
import * as tripRepository from './trip.repository.js';
import { TRIP_STATUS } from '../../constants/trip.constants.js';

const createTrip = async (
  name: string,
  destinationLocationId: string,
  arriveBy: Date,
) => {
  const tripId = generateRandomString();
  const createdAt = new Date();

    // check if destinationLocationId exist in location table
    // check if arriveBy date is in future. 
    

  return tripRepository.createTrip(
    tripId,
    name,
    arriveBy,
    TRIP_STATUS.CREATED,
    createdAt,
    destinationLocationId,
  );
};

export { createTrip };
