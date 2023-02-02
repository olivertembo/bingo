import React, { useEffect, useMemo, useState } from "react";
import useSound from 'use-sound';
import { generateBingoCards } from "../utils";
import BingoCards from "../constants/bingoCards.json";
import {
  isRowBingo,
  isColumnBingo,
  isDiagonal1Bingo,
  isDiagonal2Bingo,
} from "../utils";
const winAudioPath = "/audio/win-notification.wav";
const  selectAudioPath =  "/audio/mixkit-select-click-1109.wav";
const flipAudioPath = "/audio/mixkit-single-classic-click-1116.wav";

export const useBingo = () => {
  const [bingoGrid, setBingoGrid] = useState<Cell[][]>([]);
  const [bingoCount, setBingoCount] = useState<number>(0);
  const [winCells, setWinCells] = useState<{ [key: string]: boolean }>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [_isDiagonal1Bingo, _setIsDiagonal1Bingo] = useState<boolean>(false);
  const [_isDiagonal2Bingo, _setIsDiagonal2Bingo] = useState<boolean>(false);
  const openCelebration = () => setHasWon(true);
  const closeCelebration = () => setHasWon(false);
  const [playWin] = useSound(winAudioPath);
  const [playSelect] = useSound(selectAudioPath);
  const [playFlip] = useSound(flipAudioPath);

  const handleSelection = (rowIndex: number, cellIndex: number) => {
    playSelect();
    const newBingoGrid = [...bingoGrid];
    const cell = newBingoGrid[rowIndex][cellIndex];

    if(cell.isBingo) return;

    newBingoGrid[rowIndex][cellIndex] = {
      ...cell,
      isBingo: true,
    };

    setBingoGrid(newBingoGrid);

    if (isBingo(newBingoGrid, rowIndex, cellIndex)) {
      setBingoCount(bingoCount + 1);
      setHasWon(true);
      playWin();
    }
  };

  const isBingo = (
    bingoGrid: Cell[][],
    rowIndex: number,
    cellIndex: number
  ) => {
    let _bingoCount = 0;

    const row = bingoGrid[rowIndex];
    const column = cellIndex;

    const checkISRowBingo = isRowBingo(row);

    if(checkISRowBingo) {
      _bingoCount++;

      if(bingoCount > 2) return true;

      let winningCells = row.reduce((acc, cell, index) => {
        acc[`${rowIndex}-${index}`] = true;
        return acc;
      }, {} as { [key: string]: boolean });
  
      setWinCells((prevWinCells) => ({
        ...prevWinCells,
        ...winningCells,
      }));
      playFlip();
    }

    const checkIsColumnBingo = isColumnBingo(bingoGrid, column);
    if(checkIsColumnBingo) {
      _bingoCount++;
      if(bingoCount >= 2) return true;

      const winningCells = bingoGrid.reduce((acc, row, index) => {
        acc[`${index}-${column}`] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setWinCells((prevWinCells) => ({
        ...prevWinCells,
        ...winningCells,
      }));
    }



    
    if (!_isDiagonal1Bingo) {
      const checkIsDiagonal1Bingo = isDiagonal1Bingo(bingoGrid);
      if (checkIsDiagonal1Bingo) {
        _bingoCount++;
        if (bingoCount >= 2) return true;

        const winningCells = bingoGrid.reduce((acc, row, index) => {
          acc[`${index}-${index}`] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setWinCells((prevWinCells) => ({
          ...prevWinCells,
          ...winningCells,
        }));
        _setIsDiagonal1Bingo(true);
      }
    }

    if (!_isDiagonal2Bingo) {
      const checkIsDiagonal2Bingo = isDiagonal2Bingo(bingoGrid);
      if (checkIsDiagonal2Bingo) {
        _bingoCount++;
        if (bingoCount >= 2) return true;
        const winningCells = bingoGrid.reduce((acc, row, index) => {
          acc[`${index}-${bingoGrid.length - index - 1}`] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setWinCells((prevWinCells) => ({
          ...prevWinCells,
          ...winningCells,
        }));
        _setIsDiagonal2Bingo(true);
      }
    }

    setBingoCount((prevBingoCount) => prevBingoCount + _bingoCount);

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
