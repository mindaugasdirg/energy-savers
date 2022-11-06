import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import TryIcon from '@mui/icons-material/Try';
import { useNavigate } from "react-router-dom";
import React from "react";

const links = [
  { link: "/", label: "Home", icon: <HomeIcon /> },
  { link: "/scan", label: "Scan", icon: <TryIcon /> },
  // { link: "/planet", label: "Planet", icon: <WindowIcon /> }
];

export const NavigationBar = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(links[currentTab].link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={0}>
      <BottomNavigation color="secondary" showLabels value={currentTab} onChange={(_event, selectedTab) => setCurrentTab(selectedTab)}>
        {links.map((item, index) => (
          <BottomNavigationAction key={index} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
