import { Router } from './Router';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './common/theme';
import { Header } from './common/components/Header';
import { NavigationBar } from './common/components/NavigationBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Paper elevation={1} sx={{ boxShadow: "none" }}>
        <Router />
      </Paper>
      <NavigationBar />
    </ThemeProvider>
  );
}

export default App;
