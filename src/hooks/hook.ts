import { useState } from 'react';

const defaultBingoGrid: Cell[][] = [
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
  ]
];

export type Bingo = {
  cells: Cell[];
  checkWin: (selectedCells: Set<string>) => Set<string> | undefined;
};

export const useBingo = () => {
  const [bingo, setBingo] = useState<Cell[][]>(new Bingo());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [winningCells, setWinningCells] = useState<Set<string>>(new Set());

  const selectCell = (cell: Cell) => {
    const newSelectedCells = new Set(selectedCells);
    newSelectedCells.add(cell.id);
    setSelectedCells(newSelectedCells);
  };

  const reset = () => {
    setSelectedCells(new Set());
    setWinningCells(new Set());
    setBingo(new Bingo());
  };

  const checkWin = () => {
    const winningCells = bingo.checkWin(selectedCells);
    if (winningCells) {
      setWinningCells(winningCells);
    }
  };

  return {
    bingo,
    selectedCells,
    winningCells,
    selectCell,
    reset,
    checkWin,
  };
}