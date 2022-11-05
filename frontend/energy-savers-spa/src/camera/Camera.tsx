import * as React from "react";
import Fab from "@mui/material/Fab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getVideoFeed, savePicture, stopCamera } from "./functions";

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

    getVideoFeed(width, height, feed);
    return () => {
      stopCamera(feed.srcObject as MediaStream);
    };
  }, [cameraFeedRef]);

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
        <>
          <Fab onClick={revertPreview}>
            <ArrowBackIcon />
          </Fab>
          <img src={imgSrc} alt="Preview" height={height} width={width} />
        </>
      ) : (
        <>
          <video ref={cameraFeedRef} height={height} width={width} />
          <Fab onClick={takePicture}>
            <CameraAltIcon />
          </Fab>
        </>
      )}
      <canvas style={{ display: "none" }} ref={canvasRef} height={height} width={width} />
    </>
  );
};
