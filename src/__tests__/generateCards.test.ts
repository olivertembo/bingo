import { test, expect, describe } from "@jest/globals";
import { generateBingoCards } from "../utils";

const cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

describe('Generate Bingo Cards', () => {
  test("should throw an error if there are less than 24 cards", () => {
    expect(() => {
      generateBingoCards(cards.slice(0, 23));
    }).toThrow("BingoCards must have at least 24 cards");
  })
  test('should generate bingo cards', () => {
    const bingoCards = generateBingoCards(cards, false);
    expect(bingoCards.length).toBe(5);
    expect(bingoCards[0].length).toBe(5);
    expect(bingoCards[0][0].text).toBe('A');
    expect(bingoCards[0][0].isBingo).toBe(false);
  });

  test("should have free middle card", () => {
    const bingoCards = generateBingoCards(cards, true);
    console.log(bingoCards);
    expect(bingoCards[2][2].text).toBe("FREE");
    expect(bingoCards[2][2].isBingo).toBe(true);
  });
});