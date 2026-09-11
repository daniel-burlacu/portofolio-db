// src/app/courses/[courseKey]/[chapter]/page.tsx
import { notFound } from 'next/navigation';
import { COURSES } from '@/helpers/courses';
import LessonContent from '@/features/courses/LessonContent';

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
  if (!Number.isInteger(idx) || idx < 0 || idx >= course.chapters.length) return notFound();

  return <LessonContent courseKey={courseKey} idx={idx} />;
}
