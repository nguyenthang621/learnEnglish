import LessonDetailPage from "@/components/Courses/LessonDetail";


interface PageProps {
  params: Promise<{ courseId: string }>;
}

export interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonsPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  return <LessonDetailPage courseId={courseId} lessonId={lessonId}/>;
}
