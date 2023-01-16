import React, { useEffect, useMemo, useState } from "react";
import { generateBingoCards } from "../utils";
import BingoCards from "../constants/bingoCards.json";
import {
  isRowBingo,
  isColumnBingo,
  isDiagonal1Bingo,
  isDiagonal2Bingo,
} from "../utils";

export const useBingo = () => {
  const [bingoGrid, setBingoGrid] = useState<Cell[][]>([]);
  const [bingoCount, setBingoCount] = useState<number>(0);
  const [winCells, setWinCells] = useState<{ [key: string]: boolean }>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [_isDiagonal1Bingo, _setIsDiagonal1Bingo] = useState<boolean>(false);
  const [_isDiagonal2Bingo, _setIsDiagonal2Bingo] = useState<boolean>(false);
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

      setWinCells((prevWinCells) => ({
        ...prevWinCells,
        ...winningCells,
      }));

      return true;
    }

    const checkIsColumnBingo = isColumnBingo(bingoGrid, column);
    if (checkIsColumnBingo) {
      const winningCells = bingoGrid.reduce((acc, row, index) => {
        acc[`${index}-${column}`] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setWinCells((prevWinCells) => ({
        ...prevWinCells,
        ...winningCells,
      }));

      return true;
    }

    if (!_isDiagonal1Bingo) {
      const checkIsDiagonal1Bingo = isDiagonal1Bingo(bingoGrid);
      if (checkIsDiagonal1Bingo) {
        const winningCells = bingoGrid.reduce((acc, row, index) => {
          acc[`${index}-${index}`] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setWinCells((prevWinCells) => ({
          ...prevWinCells,
          ...winningCells,
        }));
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
        setWinCells((prevWinCells) => ({
          ...prevWinCells,
          ...winningCells,
        }));
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
    _setIsDiagonal1Bingo(false);
    _setIsDiagonal2Bingo(false);
    setBingoCount(0);
  };

  useEffect(() => {
    setBingoGrid(generateBingoCards(BingoCards));
  }, []);

  return {
    bingoGrid,
    handleSelection,
    handleReset,
    bingoCount,
    winCells,
    hasWon,
    openCelebration,
    closeCelebration,
  };
};

export default useBingo;
