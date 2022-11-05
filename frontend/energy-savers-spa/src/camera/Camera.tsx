import * as React from "react";
import { getVideoFeed, savePicture, stopCamera } from "./functions";
import Grid from "@mui/material/Grid";
import { useStateMachine } from "../common/hooks";
import { PhotoCaptureControls } from "./Controls/PhotoCaptureControls";
import { PhotoPreviewControls } from "./Controls/PhotoPreviewControls";
import { AlternativeSuggestions } from "./Controls/AlternativeSuggestions";

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

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!imgSrc && feed) {
      getVideoFeed(width, height, feed);
    }
  }, [height, imgSrc, width]);

  const revertPreview = () => {
    setImgSrc("");
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    getVideoFeed(width, height, feed);
    setCurrentControl(0);
  };

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
    setCurrentControl(1);
  };

  const suggestions = React.useMemo(() => [
    {
      imgSrc: "https://images.heb.com/is/image/HEBGrocery/001876588",
      name: "Chips 1",
      saving: "100g less CO2",
      score: 15
    },
    {
      imgSrc: "https://images.heb.com/is/image/HEBGrocery/001876588",
      name: "Chips 2",
      saving: "150g less CO2",
      score: 20
    },
    {
      imgSrc: "https://images.heb.com/is/image/HEBGrocery/001876588",
      name: "Chips 3",
      saving: "10g less CO2",
      score: 1
    },
  ], []);

  const onSuggestionSelected = (index: number) => {
    console.log(`clicked suggestion: ${index}`);
    setCurrentControl(0);
  }

  const sendPhoto = () => {
    console.log("sending photo");
    setCurrentControl(2);
  }

  const [currentControl, setCurrentControl] = useStateMachine([
    <PhotoCaptureControls takePicture={takePicture} />,
    <PhotoPreviewControls sendPhoto={sendPhoto} revertPreview={revertPreview} />,
    <AlternativeSuggestions onSuggestionClicked={onSuggestionSelected} suggestions={suggestions} />,
  ]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {imgSrc ? (
            <img src={imgSrc} alt="Preview" height={height} width={width} />
          ) : (
            <video ref={cameraFeedRef} height={height} width={width} playsInline={true} />
          )}
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          {currentControl}
        </Grid>
      </Grid>
      <canvas style={{ display: "none" }} ref={canvasRef} height={height} width={width} />
    </>
  );
};
