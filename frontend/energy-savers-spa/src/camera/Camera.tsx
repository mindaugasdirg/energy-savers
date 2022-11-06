import * as React from "react";
import { getVideoFeed, savePicture, stopCamera } from "./functions";
import Grid from "@mui/material/Grid";
import { useStateMachine } from "../common/hooks";
import { PhotoCaptureControls } from "./Controls/PhotoCaptureControls";
import { PhotoPreviewControls } from "./Controls/PhotoPreviewControls";
import { AlternativeSuggestions } from "./Controls/AlternativeSuggestions";
import { SuggestionLoading } from "./Controls/SuggestionLoading";
import { Suggestion } from "./Controls/types";

export const Camera = () => {
  const cameraFeedRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const width = React.useMemo(() => window.innerWidth, []);
  const height = React.useMemo(() => width / (4 / 3), [width]);

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    getVideoFeed(width, height, feed);
    return () => {
      feed.srcObject && stopCamera(feed.srcObject as MediaStream);
    };
  }, [cameraFeedRef, width, height]);

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

    const { imageData } = savePicture(video, imgPreview, width);
    setImgSrc(imageData);

    stopCamera(srcObject as MediaStream);
    setCurrentControl(1);
  };

  const onSuggestionSelected = (index: number) => {
    console.log(`clicked suggestion: ${index}`);
    revertPreview();
    setCurrentControl(0);
  }

  const sendPhoto = () => {
    console.log("sending photo");
    setCurrentControl(2);
  }

  // TODO: Update when API returns suggestions
  const onSuggestionsLoaded = (suggestions: Suggestion[]) => {
    console.log("Got suggestions:");
    console.log(suggestions);
    setSuggestions(suggestions);
    setCurrentControl(3);
  }

  const [currentControl, setCurrentControl] = useStateMachine([
    <PhotoCaptureControls takePicture={takePicture} />,
    <PhotoPreviewControls sendPhoto={sendPhoto} revertPreview={revertPreview} />,
    <SuggestionLoading imgData={imgSrc} onLoad={onSuggestionsLoaded} />,
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
