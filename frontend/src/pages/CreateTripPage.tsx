import { CreateTripForm, type CreateTripValues } from '@/features/trips';

interface CreateTripPageProps {
  onBack: () => void;
  onSubmit: (values: CreateTripValues) => void;
}

const CreateTripPage = ({ onBack, onSubmit }: CreateTripPageProps) => (
  <main className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
    <CreateTripForm onBack={onBack} onSubmit={onSubmit} />
  </main>
);

export default CreateTripPage;
