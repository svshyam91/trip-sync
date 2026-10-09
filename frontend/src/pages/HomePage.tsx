import { TripHero } from '@/features/trips';

interface HomePageProps {
  onPlanTrip: () => void;
}

const HomePage = ({ onPlanTrip }: HomePageProps) => (
  <main className="mx-auto min-h-0 w-full max-w-4xl flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
    <TripHero onPlanTrip={onPlanTrip} onJoinTrip={() => undefined} />
  </main>
);

export default HomePage;
