import { redirect } from 'next/navigation';
import { courseKeys } from '@/helpers/courses';

export default function CoursesIndex() {
  const firstCourse = courseKeys()[0];
  redirect(`/courses/${firstCourse}/1`);
}
