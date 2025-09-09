// src/app/work/page.tsx
import { Box, Container, Typography } from '@mui/material';
import WorkTimeline from '@/components/WorkTimeline';
import { WORK } from '@/data/work';

export default function WorkPage() {
  return (
    <Container sx={{ py: { xs: 2, md: 3 }, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h2" gutterBottom>Work History</Typography>
      <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
        Pick a year; cards scroll inside the panel.
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <WorkTimeline data={WORK} />
      </Box>
    </Container>
  );
}
