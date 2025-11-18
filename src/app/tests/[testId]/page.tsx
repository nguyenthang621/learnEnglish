import TestAttemptPage from "@/components/Testing/TestAttempt";


interface PageProps {
  params: Promise<{ testId: string }>;
}

export default async function TestDetailPage({ params }: PageProps) {
  const { testId } = await params;
  if (!testId) return

  return <TestAttemptPage testId={testId} />;
}
