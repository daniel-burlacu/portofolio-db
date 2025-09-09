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

export default function CybersecurityLanding() {
  const entries = Object.entries(COURSES) as [string, { label: string; chapters: string[] }][];
  const desc: Record<string, string> = {
    oscp:
      'Get hands-on experience with penetration testing and ethical hacking. Learn to identify and exploit vulnerabilities in various systems, preparing you for the OSCP certification.',
    oswa:
      'Master advanced web application security techniques. Learn to find and exploit complex vulnerabilities, enhancing your skills for the OSWE certification.',
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
          Cybersecurity Study Guide
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, textAlign: 'center' }}>
          Pick a track to start learning. You can resume from the sidebar any time.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {entries.map(([key, course]) => (
            <Grid key={key} size={{ xs: 12, sm: 10, md: 6 }} display="flex">
              <Paper
                elevation={0}
                sx={{
                  p: 3, borderRadius: 4, bgcolor: 'rgba(2,6,23,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  width: '100%', minHeight: 380,
                  display: 'flex', flexDirection: 'column', gap: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {course.label} : Study Guide & Roadmap
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                  {course.chapters.length ? `${course.chapters.length} chapters` : 'Chapters coming soon'}
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                  {desc[key] ?? 'Course details coming soon.'}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  {course.chapters.length ? (
                    <Link href={`/courses/${key}/1`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained">View Guide</Button>
                    </Link>
                  ) : (
                    <Button variant="outlined" disabled>Coming soon</Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}