import { TableCell } from "@mui/material";
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
    <TableCell
      align="center"
      color="primary"
      className={`${cell.isBingo ? "selected" : ""} ${
        isWinningCell ? "winning-cell" : ""
      }`}
      sx={styles.tableCell}
      onClick={() => handleSelection(rowIndex, cellIndex)}
    >
      {cell.text}
    </TableCell>
  );
}