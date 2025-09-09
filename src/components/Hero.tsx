'use client';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 16 },
        pb: { xs: 8, md: 14 },
        background:
          'radial-gradient(60rem 30rem at 20% 10%, rgba(153,69,255,.15), transparent), radial-gradient(50rem 25rem at 80% 20%, rgba(20,241,149,.12), transparent)',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} component={motion.div}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 72 }, lineHeight: 1.05 }}>
            Secure <span style={{ color: '#14F195' }}>Blockchain</span> & Full-Stack Craft
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 820 }}>
            I design and build systems at the intersection of cybersecurity, Solana/EVM, and cloud.
            Explore live demos and pragmatic write-ups.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} href="/playground" size="large" variant="contained">
              Try the Playground
            </Button>
            {/* was "#work" — use the dedicated Work page */}
            <Button component={Link} href="/work" size="large" variant="outlined">
              See Case Studies
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
