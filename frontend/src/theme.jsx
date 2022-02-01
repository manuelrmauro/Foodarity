import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3E2463',
    },
    secondary: {
      main: '#7ED957',
    },
    divider: '#7ED957',
    info: {
      main: '#7ED957',
    },
    warning: {
      main: '#FDFFB6',
    },
    error: {
      main: '#e25656',
    },
  },
});

export default theme;
