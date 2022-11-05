import * as React from "react";
import Fab from "@mui/material/Fab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Camera = () => {
  const cameraFeedRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState("");
  const height = window.innerHeight;
  const width = window.innerWidth;

  const getVideoFeed = () =>
    navigator.mediaDevices
      .getUserMedia({ video: { width, height }, audio: false })
      .then((stream) => {
        const feed = cameraFeedRef.current;

        if (!feed) {
          return;
        }

        feed.srcObject = stream;
        feed.play();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });

  const stopCamera = () => {
    const stream = cameraFeedRef.current?.srcObject;

    if (!stream) {
      return;
    }

    (stream as MediaStream).getTracks().forEach((t) => t.stop());
  };

  React.useEffect(() => {
    getVideoFeed();
    return () => {
      stopCamera();
    };
  }, [cameraFeedRef]);

  const paintPicture = () => {
    const imgPreview = canvasRef.current;
    const video = cameraFeedRef.current;
    if (!imgPreview || !video) {
      return;
    }

    const context = imgPreview.getContext("2d");
    context?.drawImage(video, 0, 0, width, height);
    setImgSrc(imgPreview.toDataURL("image/png"));
  };

  const takePicture = () => {
    paintPicture();
    stopCamera();
  };

  const revertPreview = () => {
    setImgSrc("");
    getVideoFeed();
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
