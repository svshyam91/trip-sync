import { CreateTripForm, type CreateTripValues } from '@/features/trips';

interface CreateTripPageProps {
  onBack: () => void;
  onSubmit: (values: CreateTripValues) => void;
}

const CreateTripPage = ({ onBack, onSubmit }: CreateTripPageProps) => (
  <main className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-3 pt-4 sm:px-4 sm:pt-6">
    <CreateTripForm onBack={onBack} onSubmit={onSubmit} />
  </main>
);

export default CreateTripPage;
