import React from 'react';
import { Router } from './Router';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import TryIcon from '@mui/icons-material/Try';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './common/theme';
import { Header } from './common/components/Header';
import { NavigationBar } from './common/components/NavigationBar';

const links = [
  { link: "/", label: "Home", icon: <HomeIcon /> },
  { link: "/scan", label: "Scan", icon: <TryIcon /> },
  // { link: "/planet", label: "Planet", icon: <WindowIcon /> }
];

function App() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(links[currentTab].link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

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
