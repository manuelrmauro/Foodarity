import { React } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from './redux/store';
import './App.css';
import { AppRouter } from './routers/AppRouter';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
