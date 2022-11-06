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
    console.log("Couldn't get real video height");
    realHeight = width / (4 / 3);
  }

  console.log(`video resolution: height: ${realHeight}; width: ${width}`);
  console.log(`canvas resolution: height: ${canvas.height}; width: ${canvas.width}`);

  const context = canvas.getContext("2d");
  console.log(`video resolution: height: ${realHeight}; width: ${width}`);
  context?.drawImage(videoFeed, 0, 0, width, realHeight);
  const imageData = canvas.toDataURL("image/png");
  return { imageData, height: realHeight, width };
};