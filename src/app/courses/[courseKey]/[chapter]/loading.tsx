// app/courses/[courseKey]/[chapter]/loading.tsx
import { Paper, Skeleton, Box } from '@mui/material';

export default function Loading() {
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
      <Skeleton width={180} height={18} sx={{ mb: 2 }} />
      <Skeleton width={420} height={40} sx={{ mb: 2 }} />
      <Box>
        <Skeleton width="90%" height={18} />
        <Skeleton width="85%" height={18} />
        <Skeleton width="80%" height={18} />
      </Box>
    </Paper>
  );
}
