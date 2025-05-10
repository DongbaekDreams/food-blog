import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f9fbe7',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
