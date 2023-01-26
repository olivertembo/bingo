import { SxProps, Theme } from '@mui/system';

export const tableCell: SxProps<Theme> = (theme) => ({
  border: '1px solid #000',
  padding: '0',
  width: '20%',
  height: { xs: '65px', sm: '100px', md: '100px' },
  fontSize: { xs: '0.5rem', sm: '1rem',  },
  cursor: "pointer",
  '&:active': {
    transform: 'scale(0.95)'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  "&.selected": {
    transform: 'unset',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  "&.winning-cell": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
});