import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
  palette,
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'].join(','),
    h1: { fontWeight: 900, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          /* soft background with two subtle glows + vertical fade */
          backgroundImage: `
            radial-gradient(80rem 40rem at 20% 5%, ${alpha('#9B8CFF',0.10)}, transparent),
            radial-gradient(70rem 35rem at 80% 15%, ${alpha('#22E6A1',0.08)}, transparent),
            linear-gradient(180deg, #0F1424 0%, #0D1220 100%)
          `,
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          /* glassy card surface */
          backgroundImage: 'none',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
          border: `1px solid ${alpha('#FFFFFF', 0.08)}`,
          backdropFilter: 'saturate(120%) blur(8px)',
          boxShadow:
            '0 8px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          /* slightly brighter contained buttons */
          boxShadow: '0 6px 20px rgba(34,230,161,0.25)',
        },
        text: { color: '#E8F0FF' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backdropFilter: 'blur(6px)', background: 'transparent' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { backgroundColor: alpha('#FFFFFF', 0.04) },
      },
    },
  },
});
