import CourseLessonsPage from "@/components/Courses/RouteLesson";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LessonsPage({ params }: PageProps) {
  const { courseId } = await params;
  return <CourseLessonsPage courseId={courseId}/>;
}
