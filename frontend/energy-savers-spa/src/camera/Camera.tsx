import * as React from "react";
import Fab from "@mui/material/Fab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import { getVideoFeed, savePicture, stopCamera } from "./functions";
import Grid from "@mui/material/Grid";

export const Camera = () => {
  const cameraFeedRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const [height, setHeight] = React.useState(window.innerHeight - 500);
  const [width] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    getVideoFeed(width, height, feed);
    return () => {
      feed.srcObject && stopCamera(feed.srcObject as MediaStream);
    };
  }, [cameraFeedRef, height, width]);

  const takePicture = () => {
    const video = cameraFeedRef.current;
    const srcObject = video?.srcObject;
    const imgPreview = canvasRef.current;
    if (!imgPreview || !video || !srcObject) {
      return;
    }

    if (!srcObject) {
      return;
    }

    const { imageData, height } = savePicture(video, imgPreview, width);
    setHeight(height);
    setImgSrc(imageData);

    stopCamera(srcObject as MediaStream);
  };

  const revertPreview = () => {
    setImgSrc("");
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }
    getVideoFeed(width, height, feed);
  };

  return (
    <>
      {imgSrc ? (
        <Grid container>
          <Grid item xs={12}>
            <img src={imgSrc} alt="Preview" height={height} width={width} />
          </Grid>
          <Grid item xs={3}>
            <Fab onClick={revertPreview}>
              <ReplayIcon />
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Fab onClick={() => console.log("sending")}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <video ref={cameraFeedRef} height={height} width={width} playsInline={true} />
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <Fab onClick={takePicture}>
              <CameraAltIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
      <canvas style={{ display: "none" }} ref={canvasRef} height={height} width={width} />
    </>
  );
};
