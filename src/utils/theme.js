import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#949DB2",
      main: "#777E89",
      dark: "#2B4255",
    },
    highlight: {
      light: "#15edaf",
      main: "#0fd9db",
    },
    success: {
      main: "#00C292",
    },
    warning: {
      main: "#FEC90F",
    },
    info: {
      main: "#03C9D7",
    },
  },

  typography: {
    fontFamily: [
      " DM Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
