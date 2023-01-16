import { Typography, Box, Button, Paper } from "@mui/material";
import * as styles from "./styles";

interface MenuProps {
  bingoCount: number;
  reset: () => void;
}
export const Menu = (props: MenuProps) => {
  const { bingoCount = 0, reset } = props;
  return (
    <Box sx={styles.container}>
        <Button onClick={reset}>Reset</Button>
        <Typography sx={styles.score}>Bingos: {bingoCount}</Typography>
    </Box>
  );
};

export default Menu;
