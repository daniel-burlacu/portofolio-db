// src/components/Footer.tsx
'use client';

import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'transparent',
      }}
    >
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ gap: 2, flexWrap: 'wrap' }}
        >
          {/* Left: handle */}
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            @ Daniel Burlacu
          </Typography>

          {/* Right: social icons */}
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/daniel-burlacu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                size="small"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/daniel-burlacu-3879a689/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                size="small"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
