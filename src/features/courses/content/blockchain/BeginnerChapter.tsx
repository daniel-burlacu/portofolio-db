import { Box, Link, Stack, Typography } from '@mui/material';
import type { BeginnerLesson } from './lessons';

export default function BeginnerChapter({ lesson }: { lesson: BeginnerLesson }) {
  return (
    <Stack spacing={3} sx={{ '& .MuiTypography-body1': { lineHeight: 1.8 }, overflowWrap: 'anywhere' }}>
      <Typography>{lesson.intro}</Typography>
      <Box component="section">
        <Typography variant="h6" component="h2" fontWeight={800}>The basics</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 0, '& li + li': { mt: 1.5 } }}>
          {lesson.points.map(point => <Typography component="li" key={point}>{point}</Typography>)}
        </Box>
      </Box>
      {lesson.code && (
        <Box component="section" sx={{ minWidth: 0 }}>
          <Typography variant="h6" component="h2" fontWeight={800} sx={{ mb: 1 }}>Small example</Typography>
          <Box component="pre" sx={{ m: 0, p: { xs: 2, md: 3 }, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.3)', overflowX: 'auto', fontSize: '0.9rem', lineHeight: 1.7 }}>
            <code>{lesson.code}</code>
          </Box>
        </Box>
      )}
      <Box component="section" sx={{ p: 2.5, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover', borderRadius: 1 }}>
        <Typography variant="h6" component="h2" fontWeight={800} sx={{ mb: 1 }}>Try it yourself</Typography>
        <Typography>{lesson.exercise}</Typography>
      </Box>
      <Link href={lesson.source} target="_blank" rel="noopener noreferrer" sx={{ alignSelf: 'flex-start' }}>
        Read more in the official documentation
      </Link>
    </Stack>
  );
}
