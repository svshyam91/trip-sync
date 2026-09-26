import type { TripStatus } from '../constants/trip.constants.js';

export type Trip = {
  id: string;
  trip_id: string;
  name: string;
  arrive_by: Date | null;
  status: TripStatus;
  created_at: Date;
  started_at: Date | null;
  ended_at: Date | null;
  destination_location_id: string;
};
