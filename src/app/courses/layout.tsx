import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CourseSidebar from '@/components/CoursesSideBar';

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
        {/* Sidebar */}
        <Grid size={{ xs: 3, md: 2.5 }}>
          <CourseSidebar />
        </Grid>

        {/* Main */}
        <Grid size={{ xs: 9, md: 9.5 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top bar (optional) */}
          <Paper
            elevation={0}
            square
            sx={{
              px: 3,
              py: 2,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(2,6,23,0.6)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Course Player
            </Typography>
          </Paper>

          {/* Routed page */}
          <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
