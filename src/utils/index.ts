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

export const shuffle = (array: Array<string>) => {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export const generateBingoCards = (BingoCards: string[], random = true) => {
  if (BingoCards.length < 24) {
    throw new Error("BingoCards must have at least 24 cards");
  }
  const bingoCardsText = random ? shuffle(BingoCards) : BingoCards;
  const bingoCards: Cell[][] = [];

  for (let i = 0; i < 5; i++) {
    const bingoCard: Cell[] = [];
    for (let j = 0; j < 5; j++) {
      if(i === 2 && j === 2) {
        const text = "FREE";
        const isBingo = true;
        bingoCard.push({ text, isBingo });
        continue;
      }
      const text = bingoCardsText[i * 5 + j];
      const isBingo = false;
      bingoCard.push({ text, isBingo });
    }
    bingoCards.push(bingoCard);
  }

  return bingoCards;
};