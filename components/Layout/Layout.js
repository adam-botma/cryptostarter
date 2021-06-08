import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import "@fontsource/roboto";

import styles from '../../styles.module.css';

import Navbar from "../Navbar/Navbar";
import Header from '../Header/Header';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

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

const Layout = (props) => {

return (
  // <ThemeProvider theme={theme}>
    <div className={styles.homepageContainer}>
      <style jsx global>{`
        * > body {
          margin: 0;
          box-sizing: border-box;
        }
      `}</style>
      <Header />
      {props.children}
    </div>
    // <CssBaseline />
  // </ThemeProvider>
);
}

export default Layout;
