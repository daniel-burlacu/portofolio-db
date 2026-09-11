'use client';

import Image from 'next/image';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const letters = [
  {
    title: 'The Use of Cryptocurrencies in Illicit Political Financing',
    date: '2 April 2025 · Chișinău, Moldova',
    description: 'Recognition for delivering practical training on blockchain, cryptocurrency investigations, transaction tracing and blockchain analytics.',
    src: '/letters/eupm-april-2025.png',
    width: 589, height: 804,
  },
  {
    title: 'OSINT-Crypto-Dark Web Lab',
    date: '14–15 May 2025 · Chișinău, Moldova',
    description: 'Recognition for hands-on training covering cryptocurrencies, dark web research tools, marketplaces and investigative exercises.',
    src: '/letters/eupm-may-2025.png',
    width: 593, height: 838,
  },
];

export default function AppreciationLetters() {
  return (
    <Paper component="section" id="appreciation" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, scrollMarginTop: 90 }}>
      <Typography variant="h5" component="h2" fontWeight={800}>Letters of Appreciation</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        European Union Partnership Mission in Moldova (EUPM) · Cosmin Dinescu, Head of Mission
      </Typography>
      <Stack spacing={1.5}>
        {letters.map((letter, idx) => (
          <Accordion key={letter.src} defaultExpanded={idx === 0} disableGutters elevation={0}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="h3" fontWeight={700}>{letter.title}</Typography>
                <Typography variant="body2" color="text.secondary">{letter.date}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1.5} sx={{ maxWidth: 420 }}>
                <Box component="a" href={letter.src} target="_blank" rel="noopener noreferrer" aria-label={`View letter: ${letter.title} (opens in a new tab)`}
                  sx={{ display: 'block', bgcolor: '#fff', borderRadius: 1, overflow: 'hidden', '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 4 } }}>
                  <Image src={letter.src} alt={`Signed EUPM letter of appreciation to Daniel Burlacu for ${letter.title}`} width={letter.width} height={letter.height}
                    sizes="(max-width: 600px) 90vw, 400px" style={{ display: 'block', width: '100%', height: 'auto' }} />
                </Box>
                <Typography>{letter.description}</Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  <Button component="a" href={letter.src} target="_blank" rel="noopener noreferrer" variant="outlined">View full letter</Button>
                  <Button component="a" href={letter.src} download>Download letter</Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Paper>
  );
}
