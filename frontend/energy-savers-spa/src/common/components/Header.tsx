import { AppBar, Toolbar, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';

export const Header = () => {
  return (
  <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, display: "block" }}>
          Greenie
        </Typography>
        <Typography variant="h6">23</Typography>
        <LightModeIcon sx={{ color: "yellow" }} />
      </Toolbar>
    </AppBar>
  );
};
