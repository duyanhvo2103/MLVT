import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

interface LoadingBackdropProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  spinnerColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  zIndex?: number;
  backdropProps?: Partial<React.ComponentProps<typeof Backdrop>>;
  sx?: SxProps<Theme>;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  open,
  onClose,
  children,
  spinnerColor = "inherit",
  zIndex,
  backdropProps,
  sx,
}) => {
  const theme = useTheme();
  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        color: "#fff",
        zIndex: zIndex ?? theme.zIndex.drawer + 1,
        ...sx,
      }}
      {...backdropProps}
    >
      {children ?? <CircularProgress color={spinnerColor} />}
    </Backdrop>
  );
};

export default LoadingBackdrop;
