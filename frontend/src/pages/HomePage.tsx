import { TripHero } from '@/features/trips';

const HomePage = () => (
  <main className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
    <TripHero onPlanTrip={() => undefined} onJoinTrip={() => undefined} />
  </main>
);

export default HomePage;
