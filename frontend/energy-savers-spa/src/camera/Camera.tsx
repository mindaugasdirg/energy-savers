import * as React from "react";
import { getVideoFeed, savePicture, stopCamera } from "./functions";
import Grid from "@mui/material/Grid";
import { useStateMachine } from "../common/hooks";
import { PhotoCaptureControls } from "./Controls/PhotoCaptureControls";
import { PhotoPreviewControls } from "./Controls/PhotoPreviewControls";
import { AlternativeSuggestions } from "./Controls/AlternativeSuggestions";
import { SuggestionLoading } from "./Controls/SuggestionLoading";
import { Suggestion } from "./Controls/types";
import { useRecoilState } from "recoil";
import { scoreValue } from "../common/atoms";

export const Camera = () => {
  const cameraFeedRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const [score, setScore] = useRecoilState(scoreValue);
  // const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const suggestions = React.useMemo<Suggestion[]>(() => [
    {
      label: "Option 1",
      provider: "Amazon",
      url: "https://expertreviews.b-cdn.net/sites/expertreviews/files/2022/03/best_coffee_cup_-_lead_image.jpg",
      value: 15
    },
    {
      label: "Option 2 with long name",
      provider: "AliExpress",
      url: "https://expertreviews.b-cdn.net/sites/expertreviews/files/2022/03/best_coffee_cup_-_lead_image.jpg",
      value: 15
    },
  ], []);
  const width = React.useMemo(() => window.innerWidth, []);
  const height = React.useMemo(() => width / (4 / 3), [width]);

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    getVideoFeed(feed);
    return () => {
      feed.srcObject && stopCamera(feed.srcObject as MediaStream);
    };
  }, [cameraFeedRef, width, height]);

  React.useEffect(() => {
    const feed = cameraFeedRef.current;

    if (!imgSrc && feed) {
      getVideoFeed(feed);
    }
  }, [height, imgSrc, width]);

  const revertPreview = () => {
    setImgSrc("");
    const feed = cameraFeedRef.current;

    if (!feed) {
      return;
    }

    getVideoFeed(feed);
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
    setScore(score + suggestions[index].value);
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
    // setSuggestions(suggestions);
    setCurrentControl(3);
  }

  const [currentControl, setCurrentControl] = useStateMachine([
    <PhotoCaptureControls takePicture={takePicture} />,
    <PhotoPreviewControls sendPhoto={sendPhoto} revertPreview={revertPreview} />,
    <SuggestionLoading imgData={imgSrc} onLoad={onSuggestionsLoaded} />,
    <AlternativeSuggestions onSuggestionClicked={onSuggestionSelected} suggestions={suggestions} />,
  ], 3);

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
