import { notFound } from 'next/navigation';
import { COURSES } from '@/helpers/courses';
import COURSE_COMPONENTS from '@/features/courses/content/oscp/registry'; // ← central registry
import { Paper, Typography } from '@mui/material';

type Params = { courseKey: string; chapter: string };
type CourseKey = keyof typeof COURSES;

export function generateStaticParams(): Params[] {
  const out: Params[] = [];
  for (const [courseKey, def] of Object.entries(COURSES)) {
    def.chapters.forEach((_, i) => out.push({ courseKey, chapter: String(i + 1) }));
  }
  return out;
}

export const dynamic = 'force-static';

export default function ChapterPage({ params }: { params: Params }) {
  const { courseKey, chapter } = params;

  const key = courseKey as CourseKey;
  const course = COURSES[key];
  const idx = Number(chapter) - 1;

  if (!course) return notFound();
  if (Number.isNaN(idx) || idx < 0 || idx >= course.chapters.length) return notFound();

  const title = course.chapters[idx];

  // If your registry is typed as Record<string, React.ComponentType[] | undefined>
  const componentsForCourse = COURSE_COMPONENTS[courseKey] ?? [];
  const ChapterBody = componentsForCourse[idx];

  // Optional: server-side debug logs (will print in terminal in dev)
  if (process.env.NODE_ENV !== 'production') {
    console.log({
      courseKey,
      chapter,
      idx,
      hasBody: Boolean(ChapterBody),
      registeredChapters: componentsForCourse.length,
    });
  }

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
