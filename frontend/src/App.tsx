import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';

import Header from './components/layout/header/Header';
import CreateTripPage from './pages/CreateTripPage';
import HomePage from './pages/HomePage';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [page, setPage] = useState<'home' | 'create'>('home');

  return (
    <APIProvider apiKey={apiKey}>
      <Header
        onHome={() => setPage('home')}
        onCreateTrip={() => setPage('create')}
      />
      {page === 'home' ? (
        <HomePage onPlanTrip={() => setPage('create')} />
      ) : (
        <CreateTripPage
          onBack={() => setPage('home')}
          onSubmit={() => setPage('home')}
        />
      )}
      {/* <Grid
          container
          component="main"
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            minHeight: "100dvh",
            justifyContent: "center",
            boxSizing: "border-box",
            p: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Grid size={{ xs: 4, sm: 8, md: 12 }}>
            <LocationHeader />
          </Grid>

          <Grid size={{ xs: 4, sm: 6, md: 6 }}>
            <LocationShare />
          </Grid>
        </Grid> */}
    </APIProvider>
  );
}

export default App;
