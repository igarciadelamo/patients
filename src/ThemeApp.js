import React, { Component } from 'react';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

class ThemeApp extends Component {

  render() {
      return (
          <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <App />
          </MuiThemeProvider>
      );
  }
}

export default ThemeApp;
