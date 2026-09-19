import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LocationPinIcon } from "./LocationShare/LocationShare";

type LocationHeaderProps = {};

export default function LocationHeader({}: LocationHeaderProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        mb: 3,
        px: 2,
        py: 1.5,
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "grey.50",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ minWidth: 0, flexWrap: "nowrap", alignItems: "center" }}
      >
        <Grid
          sx={{
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "primary.light",
            color: "primary.dark",
            flexShrink: 0
          }}
        >
          <LocationPinIcon />
        </Grid>

        <Grid sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            component="p"
            sx={{ fontWeight: 700, lineHeight: 1.4, wordBreak: "break-word" }}
          >
            Gurgaon, Haryana, India
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: { xs: "flex-start", sm: "flex-end" }
        }}
      >
        <Grid container>
          <Button variant="contained" size="small">
            Share location
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
