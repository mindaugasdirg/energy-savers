import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  revertPreview: () => void;
  sendPhoto: () => void;
}

export const PhotoPreviewControls = ({ revertPreview, sendPhoto }: Props) => (
  <>
    <Grid item container xs={6} justifyContent="center">
      <IconButton onClick={revertPreview}>
        <ReplayIcon />
      </IconButton>
    </Grid>
    <Grid item container xs={6} justifyContent="center">
      <IconButton onClick={sendPhoto}>
        <SendIcon />
      </IconButton>
    </Grid>
  </>
);
