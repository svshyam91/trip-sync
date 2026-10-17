import type { LocationRow, Trip } from '../../models/trip.model.js';

export function mapTrip(trip: Trip, location: LocationRow) {
  return {
    tripId: trip.trip_id,
    name: trip.name,
    arriveBy: trip.arrive_by,
    status: trip.status,
    createdAt: trip.created_at,
    destination: {
      name: location.name,
      address: location.address ?? '',
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    },
  };
}
