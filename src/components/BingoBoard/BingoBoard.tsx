import React, { useMemo, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
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

const initialBingoGrid: Cell[][] = [
  [
    { text: "A1", isBingo: false },
    { text: "B1", isBingo: false },
    { text: "C1", isBingo: false },
    { text: "D1", isBingo: false },
    { text: "E1", isBingo: false },
  ],
  [
    { text: "A2", isBingo: false },
    { text: "B2", isBingo: false },
    { text: "C2", isBingo: false },
    { text: "D2", isBingo: false },
    { text: "E2", isBingo: false },
  ],
  [
    { text: "A3", isBingo: false },
    { text: "B3", isBingo: false },
    { text: "Bingo", isBingo: true },
    { text: "E3", isBingo: false },
    { text: "13", isBingo: false },
  ],
  [
    { text: "A4", isBingo: false },
    { text: "B4", isBingo: false },
    { text: "C4", isBingo: false },
    { text: "D4", isBingo: false },
    { text: "E4", isBingo: false },
  ],
  [
    { text: "A5", isBingo: false },
    { text: "B5", isBingo: false },
    { text: "C5", isBingo: false },
    { text: "D5", isBingo: false },
    { text: "E5", isBingo: false },
  ],
];

export const BingoBoard = () => {
  const [bingoGrid, setBingoGrid] = useState<Cell[][]>([...initialBingoGrid]);
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
    const newBingoGrid = initialBingoGrid.map((row) =>
      row.map((cell) => {
        if (cell.text === "Bingo") return { ...cell, isBingo: true };
        return { ...cell, isBingo: false };
      })
    );
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
