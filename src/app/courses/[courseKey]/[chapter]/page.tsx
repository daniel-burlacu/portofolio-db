import { notFound } from 'next/navigation';
import { COURSES } from '@/helpers/courses';
import COURSE_COMPONENTS from '@/features/courses/content/oscp/registry';
import { Paper, Typography } from '@mui/material';

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

  // Debugging output
  if (typeof window !== 'undefined') {
    // @ts-ignore
    console.log('courseKey:', courseKey, 'chapter:', chapter);
  }

  const course = COURSES[courseKey as keyof typeof COURSES];
  const idx = Number(chapter) - 1;

  if (typeof window !== 'undefined') {
    // @ts-ignore
    console.log('course:', course, 'idx:', idx);
    // @ts-ignore
    console.log('COURSE_COMPONENTS:', COURSE_COMPONENTS);
    // @ts-ignore
    console.log('components:', COURSE_COMPONENTS[courseKey], 'ChapterBody:', COURSE_COMPONENTS[courseKey]?.[idx]);
  }

  if (!course) return notFound();
  if (Number.isNaN(idx) || idx < 0 || idx >= course.chapters.length) return notFound();

  const title = course.chapters[idx];
  const components = COURSE_COMPONENTS[courseKey] ?? [];
  const ChapterBody = components[idx];

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Typography variant="overline" sx={{ opacity: 0.8 }}>
        {course.label} · Chapter {chapter}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
        {title}
      </Typography>

      {ChapterBody ? (
        <ChapterBody />
      ) : (
        <Typography sx={{ opacity: 0.9 }}>
          Content coming soon for this chapter.
        </Typography>
      )}
    </Paper>
  );
}
