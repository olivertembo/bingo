import { SxProps, Theme } from '@mui/system';

export const container: SxProps<Theme> = (theme) => ({
  position: 'absolute',
  top: '0',
  right: '0',
  width: '100%',
  height: 'auto',
  fontSize: '2rem',
  fontWeight: 500,
  textAlign: 'right',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiButton-root': {
    margin: '1rem',
    display: 'block',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    }
  },
});

export const score: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '0.25rem',
  fontSize: '1rem',
  fontWeight: 500,
  textAlign: 'left',
  padding: '0.5rem',
});