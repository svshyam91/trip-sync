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
