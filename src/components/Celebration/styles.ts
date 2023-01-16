import { SxProps, Theme } from '@mui/system';

export const container: SxProps<Theme> = (theme) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 360,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
});