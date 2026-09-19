import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import LocationHeader from "./components/LocationHeader";
import LocationShare from "./components/LocationShare/LocationShare";
import theme from "./theme";
import { APIProvider } from "@vis.gl/react-google-maps";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <APIProvider apiKey={apiKey}>
        <Grid
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
        </Grid>
      </APIProvider>
    </ThemeProvider>
  );
}

export default App;
