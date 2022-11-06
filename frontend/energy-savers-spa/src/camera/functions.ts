export const getVideoFeed = (feed: HTMLVideoElement) =>
  navigator.mediaDevices
    .getUserMedia({ video: { width: { ideal: 1800 }, height: { ideal: 1800 }, facingMode: "environment" }, audio: false })
    .then((stream) => {
      feed.srcObject = stream;
      feed.play();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

export const stopCamera = (stream: MediaStream) => stream.getTracks().forEach((t) => t.stop());

export const savePicture = (videoFeed: HTMLVideoElement, canvas: HTMLCanvasElement, height: number, width: number) => {
  console.log(`video resolution: height: ${height}; width: ${width}`);
  console.log(`canvas resolution: height: ${canvas.height}; width: ${canvas.width}`);

  const context = canvas.getContext("2d");
  console.log(`video resolution: height: ${height}; width: ${width}`);
  context?.drawImage(videoFeed, 0, 0, width, height);
  const imageData = canvas.toDataURL("image/png");
  return { imageData, height: height, width };
};