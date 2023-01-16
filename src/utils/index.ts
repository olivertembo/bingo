export const isRowBingo = (row: Cell[]) => {
  return row.every((cell) => cell.isBingo);
};

export const isColumnBingo = (bingoGrid: Cell[][], columnIndex: number) => {
  return bingoGrid.every((row) => row[columnIndex].isBingo);
};

export const isDiagonal1Bingo = (bingoGrid: Cell[][]) => {
  const diagonal1 = bingoGrid.map((row, index) => row[index]);
  return diagonal1.every((cell) => cell.isBingo);
};

export const isDiagonal2Bingo = (bingoGrid: Cell[][]) => {
  const diagonal2 = bingoGrid.map(
    (row, index) => row[bingoGrid.length - index - 1]
  );
  return diagonal2.every((cell) => cell.isBingo);
};