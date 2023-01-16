import { Button } from "@mui/material";
import * as styles from "./styles";

interface CellProps {
  cell: Cell;
  rowIndex: number;
  cellIndex: number;
  isWinningCell: boolean;
  handleSelection: (rowIndex: number, cellIndex: number) => void;
}
export const Cell = (props: CellProps) => {
  const { cell, rowIndex, cellIndex, isWinningCell, handleSelection } = props;

  return (
    <Button
      color="primary"
      disabled={cell.isBingo}
      className={`${cell.isBingo ? "selected" : ""} ${
        isWinningCell ? "winning-cell" : ""
      }`}
      sx={styles.cell}
      onClick={() => handleSelection(rowIndex, cellIndex)}
    >
      {cell.text}
    </Button>
  );
}