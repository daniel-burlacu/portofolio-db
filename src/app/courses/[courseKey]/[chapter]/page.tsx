// src/app/courses/[courseKey]/[chapter]/page.tsx
import { notFound } from 'next/navigation';
import { COURSES } from '@/helpers/courses';
import COURSE_COMPONENTS from '@/features/courses/content/oscp/registry';
import { Box, Paper, Typography } from '@mui/material';
import CourseChrome from '@/features/courses/CoursesChrome';

type Params = { courseKey: string; chapter: string };

export function generateStaticParams(): Params[] {
  const out: Params[] = [];
  for (const [courseKey, def] of Object.entries(COURSES)) {
    def.chapters.forEach((_, i) => out.push({ courseKey, chapter: String(i + 1) }));
  }
  return out;
}

export const dynamic = 'force-static';

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const { courseKey, chapter } = await params;
  const course = COURSES[courseKey as keyof typeof COURSES];
  const idx = Number(chapter) - 1;

  if (!course) return notFound();
  if (Number.isNaN(idx) || idx < 0 || idx >= course.chapters.length) return notFound();

  const title = course.chapters[idx];
  const components = COURSE_COMPONENTS[courseKey] ?? [];
  const ChapterBody = components[idx];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', width: '100%' }}>
      <CourseChrome courseKey={courseKey} chapterIndex={idx} courses={COURSES}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, width: { xs: '100%', md: '80vw', lg: '60vw' }, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="overline" sx={{ opacity: 0.8, textAlign: 'center' }}>
              {course.label} · Chapter {chapter}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>
              {title}
            </Typography>
            {ChapterBody ? (
              <ChapterBody />
            ) : (
              <Typography sx={{ opacity: 0.9, textAlign: 'center' }}>Content coming soon for this chapter.</Typography>
            )}
          </Paper>
        </Box>
      </CourseChrome>
    </Box>
  );
}
