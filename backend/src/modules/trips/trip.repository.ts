import db from '../../config/db.js';
import type { TripStatus } from '../../constants/trip.constants.js';
import type { Trip } from '../../models/trip.model.js';

const createTrip = async (
  tripId: string,
  name: string,
  arriveBy: Date,
  status: TripStatus,
  createdAt: Date,
  destinationLocationId: string,
) => {
  const text = `INSERT INTO trips (trip_id, name, arrive_by, status, created_at, destination_location_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [
    tripId,
    name,
    arriveBy,
    status,
    createdAt,
    destinationLocationId,
  ];

  const result = await db.query<Trip>(text, values);

  return result.rows[0];
};

export { createTrip };
