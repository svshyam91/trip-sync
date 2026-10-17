import { getDb, withTransaction } from '../../config/db.js';
import type { TripStatus } from '../../constants/trip.constants.js';
import type { LocationRow, Trip } from '../../models/trip.model.js';

interface CreateLocationAndTripParams {
  tripId: string;
  name: string;
  arriveBy: Date;
  status: TripStatus;
  createdAt: Date;
  createdBy: string;
  destination: { name: string; address: string; lat: number; lng: number };
}

const createLocationAndTrip = async ({
  tripId,
  name,
  arriveBy,
  status,
  createdAt,
  createdBy,
  destination,
}: CreateLocationAndTripParams) => {
  return withTransaction(async () => {
    const db = getDb();

    const locationResult = await db.query<LocationRow>(
      `INSERT INTO locations (name, address, latitude, longitude)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, address, latitude, longitude`,
      [destination.name, destination.address, destination.lat, destination.lng],
    );

    const location = locationResult.rows[0];

    if (!location) {
      throw new Error('Failed to insert destination location.');
    }

    const tripResult = await db.query<Trip>(
      `INSERT INTO trips (
         trip_id, name, arrive_by, status, created_at,
         destination_location_id, created_by
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [tripId, name, arriveBy, status, createdAt, location.id, createdBy],
    );

    const trip = tripResult.rows[0];

    if (!trip) {
      throw new Error('Failed to insert trip.');
    }

    return { trip, location };
  });
};

export { createLocationAndTrip };
