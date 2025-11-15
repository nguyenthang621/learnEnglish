"use client"
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import { AIVectorSection, DeveloperSection, HeroSection, MongoDBAtlasSection } from '@/components/Home/ComponentHomes';
import courseAPI from '@/apis/cource.api';
import FeaturedCourses, { Course } from '@/components/Courses/FeaturedCourses';



const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState<Course[] | []>([])


  const fetchFeaturedCorse = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getFeaturedCourse(10);
      if (response.status === 200 && response.data.data) {    
        setFeaturedCourses([...response.data.data, ...response.data.data, ...response.data.data]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching FeaturedCorse:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeaturedCorse();
  }, []);


  return (
    <div className="h-screen">
      <HeroSection />
      <FeaturedCourses courses={featuredCourses} />
      <AIVectorSection />
      <DeveloperSection />
      <MongoDBAtlasSection />
      {/* <FinalCTASection /> */}
      <Footer />
    </div>
  );
};

export default Home;