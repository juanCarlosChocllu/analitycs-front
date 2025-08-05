import { Backdrop, CircularProgress, Typography, Box, Fade } from '@mui/material';

interface LoadingProps {
  open: boolean;
  message?: string;
}

export default function Loading({ open, message = 'Cargando...' }: LoadingProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
    >
      <Fade in={open} timeout={500}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly opaque white box for content
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CircularProgress size={60} thickness={5} sx={{ mb: 2 }} />
          <Typography variant="h6" component="p" sx={{ color: 'primary.main' }}>
            {message}
          </Typography>
        </Box>
      </Fade>
    </Backdrop>
  );
}