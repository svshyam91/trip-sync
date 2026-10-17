export const TRIP_STATUS = {
  CREATED: 'created',
  STARTED: 'started',
  ENDED: 'ended',
} as const;

export const LOCAL_DEV_CREATED_BY = 'local-dev';

export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];
