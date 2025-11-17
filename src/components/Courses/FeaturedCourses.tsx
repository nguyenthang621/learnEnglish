// components/FeaturedCourses.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  color: string | null;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string | null;
  level_id: Level;
  price: string;
  is_free: boolean;
  is_vip_only: boolean;
  estimated_hours: number;
  total_lessons: number;
  enrolled_count: number;
  requirements: string[];
  what_you_learn: string[];
  is_published: boolean;
  is_featured: boolean;
  category: Category;
  created_at: string;
}

export interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerView = 3;
  const maxIndex = Math.max(0, courses.length - coursesPerView);

  const next = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  };

  const formatPrice = (price: string) => {
    const amount = parseFloat(price);
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <section className="bg-[#00313C] py-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Main Container - Left Content + Carousel */}
        <div className="flex items-center gap-12">
          {/* Left Content - Fixed Width */}
          <div className="w-[340px] flex-shrink-0">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-[#00ED64] block">Nâng cao</span>
              <span className="text-white block">Kỹ năng của bạn</span>
            </h2>
            <p className="text-[#B8C4C2] text-base leading-relaxed mb-8">
              Truy cập các công cụ, hướng dẫn và khóa đào tạo bạn cần để xây dựng nhanh hơn và thông minh hơn.
            </p>
            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 text-[#00ED64] font-semibold hover:gap-3 transition-all group"
            >
              Tất cả khóa học
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mt-12">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-10 bg-[#00ED64]'
                      : 'w-2 bg-[#00ED64]/30 hover:bg-[#00ED64]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Carousel Container with Navigation */}
          <div className="flex-1 flex items-center gap-6">
            {/* Left Arrow */}
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[#00ED64] hover:bg-[#00c956] flex items-center justify-center flex-shrink-0 transition-all shadow-lg z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-[#001E2B]" strokeWidth={2.5} />
            </button>

            {/* Courses Carousel */}
            <div className="overflow-hidden flex-1">
              <div 
                className="flex gap-6 transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / coursesPerView + 2)}%)` 
                }}
              >
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex-shrink-0 w-[calc(33.333%-16px)]"
                    style={{ minWidth: 'calc(33.333% - 16px)' }}
                  >
                    <div className="bg-[#F9FBFA] rounded-3xl overflow-hidden h-full flex flex-col group hover:shadow-2xl transition-all duration-300">
                      {/* Thumbnail/Illustration */}
                      <div className="relative h-[240px] bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          // Default illustration
                          <div className="relative w-full h-full flex items-center justify-center p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00ED64]/5 to-purple-500/5"></div>
                            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="relative z-10">
                              <rect x="40" y="45" width="70" height="80" rx="4" fill="#00ED64" opacity="0.15"/>
                              <rect x="48" y="38" width="70" height="80" rx="4" fill="#00ED64" opacity="0.3"/>
                              <rect x="56" y="31" width="70" height="80" rx="4" fill="#00ED64" opacity="0.6"/>
                              <line x1="66" y1="48" x2="106" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              <line x1="66" y1="61" x2="116" y2="61" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              <line x1="66" y1="74" x2="110" y2="74" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          {course.is_vip_only && (
                            <span className="bg-[#FFC010] text-[#001E2B] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                              VIP
                            </span>
                          )}
                          {course.is_free && (
                            <span className="bg-[#00ED64] text-[#001E2B] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                              MIỄN PHÍ
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col">
                        {/* Category & Level */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-[#00684A] uppercase tracking-wide">
                            {course.category.name}
                          </span>
                          <span className="text-xs text-[#5C6C75] font-medium">
                            {course.level_id.name}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-[#001E2B] mb-3 leading-tight line-clamp-2">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#5C6C75] text-[15px] leading-relaxed mb-6 flex-1 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-6 text-sm text-[#5C6C75]">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{course.estimated_hours}h</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.total_lessons} bài</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{course.enrolled_count}</span>
                          </div>
                        </div>

                        {/* Footer - Price & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                          <div>
                            {course.is_free ? (
                              <span className="text-xl font-bold text-[#00ED64]">
                                Miễn phí
                              </span>
                            ) : (
                              <span className="text-xl font-bold text-[#001E2B]">
                                {formatPrice(course.price)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/courses/${course.id}/lessons`}
                            className="inline-flex items-center gap-2 text-[#00684A] font-semibold hover:gap-3 transition-all group/link"
                          >
                            <span>Bắt đầu học</span>
                            <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={next}
              className="absolute right-5 w-12 h-12 rounded-full bg-[#00ED64] hover:bg-[#00c956] flex items-center justify-center flex-shrink-0 transition-all shadow-lg z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-[#001E2B]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}