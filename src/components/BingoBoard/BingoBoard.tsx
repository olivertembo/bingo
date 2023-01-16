import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import Cell from "../Cell";
import Menu from "../Menu";
import Celebration from "../Celebration";
import * as styles from "./styles";
import useBingo from "../../hooks/useBingo";

export const BingoBoard = () => {
  const {
    handleReset,
    bingoCount,
    hasWon,
    closeCelebration,
    openCelebration,
    bingoGrid,
    handleSelection,
    winCells,
  } = useBingo();

  return (
    <div>
      <Menu reset={handleReset} bingoCount={bingoCount} />
      <Celebration
        isOpen={hasWon}
        handleClose={closeCelebration}
        handleOpen={openCelebration}
      />
      <Box sx={styles.container}>
        <Grid
          sx={styles.bingoGrid}
          columns={5}
          spacing={0}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          {bingoGrid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Grid
                key={`${rowIndex}-${cellIndex}`}
                sx={styles.gridCell}
                xs={1}
                item
              >
                <Cell
                  handleSelection={handleSelection}
                  cell={cell}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  isWinningCell={winCells[`${rowIndex}-${cellIndex}`]}
                />
              </Grid>
            ))
          )}
        </Grid>
        <Typography variant="h1" sx={styles.title}>
          Bingo
        </Typography>
      </Box>
    </div>
  );
};

export default BingoBoard;
