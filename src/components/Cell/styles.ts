import { SxProps, Theme } from '@mui/system';

export const cell: SxProps<Theme> = (theme) => ({
  display: "flex",
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  justifyContent: "center",
  minHeight: { xs: '35px', sm: '75px', md: '100px', lg: '100px', xl: '100px' },
  minWidth: { xs: '35px', sm: '75px', md: '100px', lg: '100px', xl: '100px' },
  backgroundColor: theme.palette.common.white,
  color: "#000",
  fontWeight: 500,
  cursor: "pointer",
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  "&.selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  "&.winning-cell": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
});