import { Typography } from '@mui/material';
import { COURSES } from '@/helpers/courses';
import COURSE_COMPONENTS from '@/features/courses/content/oscp/registry';
import BeginnerChapter from '@/features/courses/content/blockchain/BeginnerChapter';
import { BLOCKCHAIN_LESSONS } from '@/features/courses/content/blockchain/lessons';
import SecurityChapter from '@/features/courses/content/security/SecurityChapter';
import { OSCP_LESSONS, OSWE_LESSONS, type SecurityLesson } from '@/features/courses/content/security/lessons';

const SECURITY_LESSONS: Record<string, (SecurityLesson | undefined)[] | undefined> = {
  oscp: OSCP_LESSONS,
  oswe: OSWE_LESSONS,
};

export default function LessonContent({ courseKey, idx }: { courseKey: string; idx: number }) {
  const course = COURSES[courseKey as keyof typeof COURSES];
  if (!course || !Number.isInteger(idx) || idx < 0 || idx >= course.chapters.length) return null;
  const chapter = idx + 1;
  const title = course.chapters[idx];
  const components = COURSE_COMPONENTS[courseKey] ?? [];
  const ChapterBody = components[idx];
  const beginnerLesson = BLOCKCHAIN_LESSONS[courseKey]?.[idx];
  const securityLesson = SECURITY_LESSONS[courseKey]?.[idx];

  return (
    <>
            <Typography variant="overline" sx={{ opacity: 0.8, textAlign: 'center' }}>
              {course.label} · Chapter {chapter}
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>
              {title}
            </Typography>
            {beginnerLesson ? (
              <BeginnerChapter lesson={beginnerLesson} />
            ) : ChapterBody ? (
              <ChapterBody />
            ) : securityLesson ? (
              <SecurityChapter lesson={securityLesson} />
            ) : (
              <Typography sx={{ opacity: 0.9, textAlign: 'center' }}>Content coming soon for this chapter.</Typography>
            )}
    </>
  );
}
