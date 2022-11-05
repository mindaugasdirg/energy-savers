import * as React from "react";
import Fab from "@mui/material/Fab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import { getVideoFeed, savePicture, stopCamera } from "./functions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

export const Camera = () => {
  const cameraFeedRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    let realHeight = feed.videoHeight / (feed.videoWidth / width);

    if (isNaN(realHeight)) {
      console.log("Cannot determine real height.");
      realHeight = width / (4 / 3);
    }

    setHeight(realHeight);
    getVideoFeed(width, realHeight, feed);
    return () => {
      feed.srcObject && stopCamera(feed.srcObject as MediaStream);
    };
  }, [cameraFeedRef, width]);

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

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if(!imgSrc && feed) {
      getVideoFeed(width, height, feed);
    }
  }, [height, imgSrc, width]);

  const revertPreview = () => {
    setImgSrc("");
    const feed = cameraFeedRef.current;
    
    if (!feed) {
      return;
    }

    console.log("aa");
    console.log("bb");
    getVideoFeed(width, height, feed);
    console.log("cc");
  };

  return (
    <>
      {imgSrc ? (
        <Grid container>
          <Grid item xs={12}>
            <img src={imgSrc} alt="Preview" height={height} width={width} />
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={revertPreview}>
              <ReplayIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={() => console.log("sending")}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <video ref={cameraFeedRef} height={height} width={width} playsInline={true} />
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <IconButton onClick={takePicture}>
              <CameraAltIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <canvas style={{ display: "none" }} ref={canvasRef} height={height} width={width} />
    </>
  );
};
