import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: { main: "#5b5bd6" },
    background: { default: "#f7f7fb" },
  },
  shape: { borderRadius: 16 },
  spacing: 4,
  typography: {
    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          minHeight: "2.75rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      [theme.breakpoints.up("sm")]: { fontSize: "1.75rem" },
      [theme.breakpoints.up("md")]: { fontSize: "2rem" },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      [theme.breakpoints.up("md")]: { fontSize: "1.0625rem" },
    },
  },
});

export default theme;
