"use client"
import testAPI from "@/apis/test.api";
import TestsPage, { TestsPageProps } from "@/components/Testing/TestsPage";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [loading, setLoading] = useState(false)
  const [testData, setTestData] = useState<TestsPageProps | null>(null)
  const fetchTesting = async () => {
    try {
      setLoading(true);
      const response = await testAPI.getTests({page: 1, limit: 10});

      if (response.status === 200 && response.data.data) {    
        const data: TestsPageProps = {
          tests: response.data.data,
          meta: response.data.meta
        }
        setTestData(data as TestsPageProps);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching detail course:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTesting()
  }, []);
  if (!testData) return
  return <TestsPage tests={testData.tests} meta={testData.meta}/>;
}
