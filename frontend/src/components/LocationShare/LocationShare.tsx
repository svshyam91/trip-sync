import { Grid, Paper, SvgIcon } from "@mui/material";
import LocationMap, { type PersonMarker } from "../Map/LocationMap";

const samplePeople: PersonMarker[] = [
  {
    id: "you",
    name: "You",
    position: { lat: 37.7749, lng: -122.4194 },
    color: "#1976d2"
  },
  {
    id: "alex",
    name: "Alex",
    position: { lat: 37.785, lng: -122.41 },
    color: "#2e7d32"
  },
  {
    id: "sam",
    name: "Sam",
    position: { lat: 37.768, lng: -122.431 },
    color: "#ed6c02"
  }
];

export function LocationPinIcon() {
  return (
    <SvgIcon aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </SvgIcon>
  );
}

const geoLocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

export default function LocationShare() {
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error getting location:", error);
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      geoLocationOptions
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: { xs: "34rem", md: "36rem" },
        boxSizing: "border-box",
        p: { xs: 3, sm: 4, md: 5 },
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center"
      }}
    >
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          justifyItems: "center"
        }}
      >
        <Grid sx={{ width: "100%" }}>
          <LocationMap people={samplePeople} height={500} />
        </Grid>
      </Grid>
    </Paper>
  );
}
