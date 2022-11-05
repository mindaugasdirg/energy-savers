import React from 'react';
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface Props {
  takePicture: () => void;
}

export const PhotoCaptureControls = ({ takePicture }: Props) => (
  <IconButton onClick={takePicture}>
    <CameraAltIcon />
  </IconButton>
);
