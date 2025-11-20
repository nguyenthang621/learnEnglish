/**
 * Hoccungban Landing Page - Main Component
 * 
 * Component chính import tất cả các sections và render landing page hoàn chỉnh
 * Sử dụng MongoDB color palette
 * 
 * @requires ./components/Navbar
 * @requires ./components/HeroSection
 * @requires ./components/FeaturesSection
 * @requires ./components/StudyGroupsSection
 * @requires ./components/AdditionalSections
 */

'use client';

import { AIStudySection, B2BSection, ContactSection, CTASection, FeaturesSection, Footer, HeroSection, StudyGroupsSection, TestimonialsSection, USPSection } from '@/components/Home/ComponentHome2';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

// Import các components

/**
 * AnimatedBackground Component
 * Background động với các floating gradient circles
 */
function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none bg-[linear-gradient(135deg,#F8FAFC_0%,#F1F5F9_100%)]">
      {/* Green gradient circle */}
      <span className="absolute w-[300px] h-[300px] rounded-full bg-gradient-radial from-mongodb-green-400/20 to-transparent top-[10%] left-[10%] animate-float" />
      
      {/* Yellow gradient circle */}
      <span 
        className="absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-mongodb-yellow/15 to-transparent top-[50%] right-[15%] animate-float"
        style={{ animationDelay: '5s' }}
      />
      
      {/* Blue gradient circle */}
      <span 
        className="absolute w-[250px] h-[250px] rounded-full bg-gradient-radial from-mongodb-blue/15 to-transparent bottom-[10%] left-[20%] animate-float"
        style={{ animationDelay: '10s' }}
      />
    </div>
  );
}

/**
 * HoccungbanLanding - Main Landing Page Component
 * 
 * Sections theo thứ tự:
 * 1. AnimatedBackground - Background động
 * 2. Navbar - Navigation bar
 * 3. HeroSection - Hero section với typing effect
 * 4. FeaturesSection - 6 tính năng chính
 * 5. StudyGroupsSection - Nhóm học tập với tabs
 * 6. AIStudySection - Học cùng AI
 * 7. USPSection - So sánh với đối thủ
 * 8. B2BSection - Giải pháp B2B
 * 9. ProgressSection - Thống kê tiến độ
 * 10. TestimonialsSection - Câu chuyện thành công
 * 11. CTASection - Call to action
 * 12. ContactSection - Form liên hệ
 * 13. Footer - Footer với links
 */
export default function HoccungbanLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mongodb-slate-50 to-white overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section - 6 tính năng */}
      <FeaturesSection />
      
      {/* Study Groups Section - Nhóm học tập */}
      <StudyGroupsSection />
      
      {/* AI Study Section - Học cùng AI */}
      <section 
        style={{
            backgroundImage: "url('/brand-shape-large.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
      >

      <AIStudySection />
      
      {/* USP Section - So sánh với đối thủ */}
      <USPSection />
      </section>
      
      {/* B2B Section - Giải pháp cho tổ chức */}
      <B2BSection />
      
      
      {/* Testimonials Section - Câu chuyện thành công */}
      <TestimonialsSection />
      
      {/* CTA Section - Call to action */}
      <CTASection />
      
      {/* Contact Section - Liên hệ */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}