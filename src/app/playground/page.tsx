'use client';
import { Container, Typography, Grid, Paper } from '@mui/material';

export default function PlaygroundPage() {
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" gutterBottom>
        Playground
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Interactive demos, animations, and blockchain experiments.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs:12,md:6}}>
          <Paper sx={{ p: 3, minHeight: 160 }}>
            <Typography variant="h6">NFT Lucky Reel (coming soon)</Typography>
            <Typography variant="body2">
              Demonstrates randomness, commit-reveal, and minting a commemorative NFT on win.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs:12,md:6}}>
          <Paper sx={{ p: 3, minHeight: 160 }}>
            <Typography variant="h6">Forensics Mini-Lab(coming soon)</Typography>
            <Typography variant="body2">
              A guided trace walkthrough with links to public explorers and a write-up.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
