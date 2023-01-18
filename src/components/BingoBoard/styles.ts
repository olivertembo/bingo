import { SxProps, Theme } from '@mui/system';

export const container: SxProps<Theme> = (theme) => ({
  height: 'calc(100vh - 16px)', 
  width: '90%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const title: SxProps<Theme> = (theme) => ({
  position: 'absolute',
  bottom: '0',
  color: theme.palette.common.black,
  fontSize: '2rem',
  fontWeight: 500,
  marginBottom: '1rem',
  textAlign: 'center',
});

export const bingoGrid: SxProps<Theme> = () => ({
  maxHeight: '600px',
  maxWidth: '600px',
});
