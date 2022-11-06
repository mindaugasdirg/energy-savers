import React from "react";
import "./App.css";
import { Router } from "./Router";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import TryIcon from "@mui/icons-material/Try";
import LightModeIcon from "@mui/icons-material/LightMode";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
    <>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1, display: "block" }}
          >
            Greenie
          </Typography>
          <Typography variant="h6">23</Typography>
          <LightModeIcon sx={{ color: "yellow" }} />
        </Toolbar>
      </AppBar>
      <Paper elevation={1}>
        <Router />
      </Paper>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={currentTab}
          onChange={(_event, selectedTab) => setCurrentTab(selectedTab)}
        >
          {links.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default App;
