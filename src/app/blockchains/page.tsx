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
  const entries = Object.entries(COURSES) as [string, { label: string; chapters: string[] }][];
  
  const desc: Record<string, string> = {
    Solana:
      'Explore the world of blockchain technology and smart contract development. Learn to build, deploy, and manage decentralized applications on the Solana network.',
    Ehtereum:
      'Explore the world of blockchain technology and smart contract development. Learn to build, deploy, and manage decentralized applications on the Ethereum network.',
    Polygon:
      'Explore the world of blockchain technology and smart contract development. Learn to build, deploy, and manage decentralized applications on the Polygon network.',
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
          Pick a track to start learning. You can resume from the sidebar any time.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
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