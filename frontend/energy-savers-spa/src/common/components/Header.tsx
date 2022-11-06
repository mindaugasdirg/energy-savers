import { AppBar, Toolbar } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import { HighlightTypography } from "./ThemedTypography";
import { useRecoilState } from "recoil";
import { scoreValue } from "../atoms";

export const Header = () => {
  const [score] = useRecoilState(scoreValue);

  return (
  <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <HighlightTypography variant="h1" sx={{ flexGrow: 1, display: "block" }}>
          Greenie
        </HighlightTypography>
        <HighlightTypography variant="h3">{score}</HighlightTypography>
        <LightModeIcon sx={{ color: "yellow" }} />
      </Toolbar>
    </AppBar>
  );
};
