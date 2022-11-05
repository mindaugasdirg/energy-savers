export const getVideoFeed = (width: number, height: number, feed: HTMLVideoElement) =>
  navigator.mediaDevices
    .getUserMedia({ video: { width, height }, audio: false })
    .then((stream) => {
      feed.srcObject = stream;
      feed.play();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

export const stopCamera = (stream: MediaStream) => stream.getTracks().forEach((t) => t.stop());

export const savePicture = (videoFeed: HTMLVideoElement, canvas: HTMLCanvasElement, width: number) => {
  let realHeight = videoFeed.videoHeight / (videoFeed.videoWidth / width);

  if (isNaN(realHeight)) {
    realHeight = width / (4 / 3);
  }

  // setHeight(realHeight);

  const context = canvas.getContext("2d");
  context?.drawImage(videoFeed, 0, 0, width, realHeight);
  const imageData = canvas.toDataURL("image/png");
  return { imageData, height: realHeight, width };
};