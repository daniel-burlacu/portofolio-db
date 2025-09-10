import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: 'rgba(248,250,252,0.95)',
        background: 'linear-gradient(to bottom, #0f172a, #020617 40%, #000 100%)',
        display: 'flex',
      }}
    >
      <Grid container sx={{ flex: 1 }}>
        {/* Main */}
        <Grid size={{ xs: 9, md: 9.5 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Routed page */}
          <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
