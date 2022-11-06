export const getVideoFeed = (feed: HTMLVideoElement) =>
  navigator.mediaDevices
    .getUserMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1920 }, facingMode: "environment" }, audio: false })
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

  const context = canvas.getContext("2d");
  context?.drawImage(videoFeed, 0, 0, width, realHeight);
  const imageData = canvas.toDataURL("image/png");
  return { imageData, height: realHeight, width };
};