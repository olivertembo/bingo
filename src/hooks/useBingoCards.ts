import { useState, useEffect } from "react";
import BingoCards from "../constants/bingoCards.json";
import { generateBingoCards } from "../utils";

export const useBingoCards = () => {
  const [bingoCards, setBingoCards] = useState<Cell[][]>([]);

  useEffect(() => {
    const cards = generateBingoCards(BingoCards);
    setBingoCards(cards);
  }, []);

  return { bingoCards };
};

export default useBingoCards;
