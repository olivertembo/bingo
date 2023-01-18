import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
        <TableContainer sx={styles.bingoGrid} component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="bingo table">
          <TableBody>
            {bingoGrid.map((rows, rowIndex) => (
              <TableRow key={rowIndex}>
                {rows.map((cell, cellIndex) => (
                <Cell
                  key={`${rowIndex}-${cellIndex}`}
                  handleSelection={handleSelection}
                  cell={cell}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  isWinningCell={winCells[`${rowIndex}-${cellIndex}`]}
                />
                ))}
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h1" sx={styles.title}>
          Bingo
        </Typography>
      </Box>
    </div>
  );
};

export default BingoBoard;
