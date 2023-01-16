import { SxProps, Theme } from '@mui/system';

export const container: SxProps<Theme> = (theme) => ({
  height: 'calc(100vh - 16px)', 
  width: '90%',
  margin: 'auto',
  backgroundColor: "#edb604",
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

export const gridCell: SxProps<Theme> = (theme) => ({
  display: 'flex',
  overflow: 'hidden',
  border: '1px solid #000',
  justifyContent: 'center',
  alignItems: 'center',
  height: { xs: '35px', sm: '75px', md: '100px', lg: '100px', xl: '100px' },
  width: { xs: '35px', sm: '75px', md: '100px', lg: '100px', xl: '100px' },
  fontSize: { xs: '0.7rem', sm: '1rem', md: '3rem' },
  backgroundColor: theme.palette.common.black,
  color: '#000',
});

export const starIcon: SxProps<Theme> = (theme) => ({
  color: theme.palette.common.black,
  fontSize: '2rem',
  fontWeight: 500,
  textAlign: 'center',
});

export const bingoGrid: SxProps<Theme> = () => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minWidth: '281px',
  // height: '100%',
  // margin: 'auto',
  maxHeight: '600px',
  maxWidth: '600px',
});
