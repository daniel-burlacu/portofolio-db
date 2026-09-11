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
  const entries = (['oscp', 'oswe'] as const).map(key => [key, COURSES[key]] as const);
  const desc: Record<string, string> = {
    oscp:
      'Get hands-on experience with penetration testing and ethical hacking. Learn to identify and exploit vulnerabilities in various systems, preparing you for the OSCP certification.',
    oswe:
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
          Cybersecurity
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, textAlign: 'center' }}>
          Practical application security, monitoring and continuous learning.
        </Typography>

        <Paper component="section" sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight={800}>My Cybersecurity Laboratory</Typography>
          <Typography sx={{ mt: 2 }}>I designed a segmented VMware lab with isolated Windows and Linux systems and vulnerable applications including DVWA, OWASP Mutillidae, Juice Shop and WebGoat. I use Kali Linux, Burp Suite, Nmap, Netcat and Metasploit for authorized testing of injection, file inclusion, authentication, permissions and input validation.</Typography>
          <Typography sx={{ mt: 2 }}>Wazuh, Sysmon and endpoint agents support investigation of suspicious processes, authentication events and network activity. I document weaknesses, root causes and remediation options, connecting offensive testing with defensive monitoring.</Typography>
          <Typography sx={{ mt: 2 }}>My learning includes OWASP-focused study, PortSwigger training and OffSec course material. The guides below are study resources.</Typography>
        </Paper>
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