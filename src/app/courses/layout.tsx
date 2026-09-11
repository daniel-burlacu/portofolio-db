import { Box } from '@mui/material';
import CourseChrome from '@/features/courses/CoursesChrome';
import { COURSES } from '@/helpers/courses';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      minHeight: '100vh', color: 'rgba(248,250,252,0.95)',
      background: 'linear-gradient(to bottom, #0f172a, #020617 40%, #000 100%)',
      display: 'flex', justifyContent: 'center', p: { xs: 1, md: 3 },
    }}>
      <CourseChrome courses={COURSES}>{children}</CourseChrome>
    </Box>
  );
}
