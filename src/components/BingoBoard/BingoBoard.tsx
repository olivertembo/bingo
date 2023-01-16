import React, { useMemo, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import useBingoCards from "../../hooks/useBingoCards";
import { generateBingoCards } from "../../utils";
import BingoCards from "../../constants/bingoCards.json";
import Cell from "../Cell";
import Menu from "../Menu";
import Celebration from "../Celebration";
import * as styles from "./styles";
import {
  isRowBingo,
  isColumnBingo,
  isDiagonal1Bingo,
  isDiagonal2Bingo,
} from "../../utils";

export const BingoBoard = () => {
  const [bingoGrid, setBingoGrid] = useState<Cell[][]>(generateBingoCards(BingoCards));
  const [bingoCount, setBingoCount] = useState<number>(0);
  const [winCells, setWinCells] = useState<{ [key: string]: boolean }>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [_isDiagonal1Bingo, _setIsDiagonal1Bingo] =
    React.useState<boolean>(false);
  const [_isDiagonal2Bingo, _setIsDiagonal2Bingo] =
    React.useState<boolean>(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const openCelebration = () => setHasWon(true);
  const closeCelebration = () => setHasWon(false);

  const handleSelection = (rowIndex: number, cellIndex: number) => {
    const newBingoGrid = [...bingoGrid];
    const cell = newBingoGrid[rowIndex][cellIndex];

    newBingoGrid[rowIndex][cellIndex] = {
      ...cell,
      isBingo: true,
    };

    setBingoGrid(newBingoGrid);

    if (isBingo(newBingoGrid, rowIndex, cellIndex)) {
      setBingoCount(bingoCount + 1);
      setHasWon(true);
    }
  };

  const isBingo = (
    bingoGrid: Cell[][],
    rowIndex: number,
    cellIndex: number
  ) => {
    const row = bingoGrid[rowIndex];
    const column = cellIndex;

    const checkISRowBingo = isRowBingo(row);

    if (checkISRowBingo) {
      const winningCells = row.reduce((acc, cell, index) => {
        acc[`${rowIndex}-${index}`] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setWinCells(winningCells);

      return true;
    }

    const checkIsColumnBingo = isColumnBingo(bingoGrid, column);
    if (checkIsColumnBingo) {
      const winningCells = bingoGrid.reduce((acc, row, index) => {
        acc[`${index}-${column}`] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setWinCells(winningCells);

      return true;
    }

    if (!_isDiagonal1Bingo) {
      const checkIsDiagonal1Bingo = isDiagonal1Bingo(bingoGrid);
      if (checkIsDiagonal1Bingo) {
        const winningCells = bingoGrid.reduce((acc, row, index) => {
          acc[`${index}-${index}`] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setWinCells(winningCells);
        _setIsDiagonal1Bingo(true);

        return true;
      }
    }

    if (!_isDiagonal2Bingo) {
      const checkIsDiagonal2Bingo = isDiagonal2Bingo(bingoGrid);
      if (checkIsDiagonal2Bingo) {
        const winningCells = bingoGrid.reduce((acc, row, index) => {
          acc[`${index}-${bingoGrid.length - index - 1}`] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setWinCells(winningCells);
        _setIsDiagonal2Bingo(true);

        return true;
      }
    }

    return false;
  };

  const handleReset = () => {
    const newBingoGrid = generateBingoCards(BingoCards);
    setBingoGrid(newBingoGrid);
    setWinCells({});
    setBingoCount(0);
  };

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
