'use client';

import Link from 'next/link';
import { COURSES } from '@/helpers/courses';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid
} from '@mui/material';

// If you're on MUI v5, use this instead:
// import Grid from '@mui/material/Unstable_Grid2';

export default function BlockchainLanding() {
  const entries = (['solana', 'ethereum', 'polygon'] as const).map(key => ({ key, ...COURSES[key] }));
  const desc = {
    solana: 'Learn accounts, wallets and programs, then explore a first program on Devnet.',
    ethereum: 'Understand wallets, gas and Solidity with a small Counter contract.',
    polygon: 'Use familiar Ethereum tools on Polygon PoS and practice on Amoy.',
  };

return (
    <Box sx={{
      minHeight: '100vh',
      color: 'rgba(248,250,252,0.95)',
      background: 'linear-gradient(to bottom, #0f172a, #020617 40%, #000 100%)',
      py: { xs: 4, md: 6 },
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, textAlign: 'center' }}>
          Blockchain Study Guide
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, textAlign: 'center' }}>
          Short beginner lessons with plain-language explanations, small examples and practice exercises. No prior blockchain experience needed.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {entries.map(course => (
          <Grid key={course.key} size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5" component="h2" fontWeight={800}>{course.label}</Typography>
              <Typography color="text.secondary">{course.chapters.length} beginner lessons</Typography>
              <Typography>{desc[course.key]}</Typography>
              <Button component={Link} href={`/courses/${course.key}/1`} variant="contained" sx={{ mt: 'auto', alignSelf: 'flex-start' }}>Start {course.label}</Button>
            </Paper>
          </Grid>
        ))}
        <Grid size={{ xs:12,md:6}}>
          <Paper sx={{ p: 3, minHeight: 160 }}>
            <Typography variant="h6">Journal App</Typography>
            <Typography variant="body2">
            Create/Reads/Updates/Deletes journal entries on the Solana blockchain(currently dev only).
            </Typography>
              <Box sx={{ mt: 4 }}>
                    <Link href={`https://crud-app-solana.vercel.app`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained">View App</Button>
                    </Link>
                </Box>
          </Paper>

        </Grid>
        </Grid>
      </Container>
    </Box>
  );
}