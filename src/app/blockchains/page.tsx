'use client';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

// If you're on MUI v5, use this instead:
// import Grid from '@mui/material/Unstable_Grid2';

export default function BlockchainLanding() {

  const desc = "Blockchain tutorials coming soon.";

return (
    <Box sx={{
      minHeight: '100vh',
      color: 'rgba(248,250,252,0.95)',
      background: 'linear-gradient(to bottom, #0f172a, #020617 40%, #000 100%)',
      py: { xs: 4, md: 6 },
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, textAlign: 'center' }}>
          Blockchains Study Guide
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, textAlign: 'center' }}>
          {desc}
        </Typography>
      </Container>
    </Box>
  );
}