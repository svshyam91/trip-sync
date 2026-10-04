import { type IconName } from '@/components/ui/Icon';

export interface LocationOption {
  id: string;
  name: string;
  category: string;
  tag: string;
  icon: IconName;
  dist: string;
  drive: string;
}

export interface CreateTripValues {
  tripName: string;
  arriveBy: string;
  destination: LocationOption | null;
}

export type TripRole = 'admin' | 'participant';

export interface Trip {
  id: string;
  name: string;
  /** Local `YYYY-MM-DDTHH:mm` string, same format as the create form. */
  arriveBy: string;
  destination: LocationOption;
  /** Shared stops, owned by the host. */
  commonStops: LocationOption[];
  /** The current user's private stops. Never shown to other participants. */
  myStops: LocationOption[];
  /** The current user's role in this trip. */
  role: TripRole;
  host: string;
}
