import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC5",
    },
    background: {
      default: "#292929",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#D8D8D8",
      secondary: "#bdbdbd",
    },
  },
  overrides: {
    Paper: {
      background: "#121212",
    },
    MuiAppBar: {
      backgroundColor: "#1f1f1f",
    },
  },
  typography: {
    subtitle1: {
      color: "#bdbdbd",
    },
  },
});

export default theme;
