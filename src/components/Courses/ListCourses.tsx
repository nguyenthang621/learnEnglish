"use client"
import React, { useEffect, useState } from 'react';
import { Search, Users, Clock, BookOpen, Star, Award, Filter } from 'lucide-react';
import courseAPI from '@/apis/cource.api';
import { path } from '@/constants/paths';
import { useRouter } from 'next/navigation';


export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string | null;
  category: {
    name: string;
  };
  level: {
    name: string;
  };
  user: {
    name: string;
  };
  price: string;          // API trả dạng string, nên để string
  is_free: boolean;
  is_vip_only?: boolean;  // optional vì không phải item nào cũng có
  estimated_hours: number;
  total_lessons: number;
  enrolled_count: number;
  is_featured: boolean;
}


const CourseCard = ({ course }: any) => {
  const router = useRouter();
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Chuyên gia': 'bg-[#E91E63] text-white',
      'Trung bình': 'bg-[#00A4EF] text-white',
      'Cơ bản': 'bg-[#a3d9a5] text-[#001E2B]'
    };
    return colors[level] || 'bg-[#e3e6ea] text-[#001E2B]';
  };

  const handleClickCourse = (courseId: number)=>{
      router.push(`/courses/${courseId}/lessons`);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-[#e3e6ea]">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-[#00684A] to-[#004d34] overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-[#a3d9a5] opacity-60" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.is_featured && (
            <span className="bg-[#FFE212] text-[#001E2B] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3" fill="#001E2B" />
              Nổi bật
            </span>
          )}
          {course.is_free && (
            <span className="bg-[#00684A] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              Miễn phí
            </span>
          )}
          {course.is_vip_only && (
            <span className="bg-[#FF6F00] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              VIP
            </span>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <span className={`${getLevelColor(course.level.name)} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md`}>
            <Award className="w-3 h-3" />
            {course.level.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-[#00684A] font-semibold mb-2">{course.category.name}</p>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-[#001E2B] mb-2 line-clamp-2 group-hover:text-[#00684A] transition-colors">
          {course.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-[#5C6C75] mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#889397]">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#00684A]" />
            <span>{course.estimated_hours}h</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-[#00684A]" />
            <span>{course.total_lessons} bài</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#00684A]" />
            <span>{course.enrolled_count}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e3e6ea]">
          <div>
            {course.is_free ? (
              <span className="text-2xl font-bold text-[#00684A]">Miễn phí</span>
            ) : (
              <div>
                <span className="text-2xl font-bold text-[#001E2B]">
                  {formatPrice(course.price)}
                </span>
              </div>
            )}
          </div>
          <button className="bg-[#00684A] hover:bg-[#005a3f] text-white px-6 py-2 rounded-md font-semibold transition-colors shadow-sm cursor-pointer" onClick={()=> handleClickCourse(course.id)}>
            Xem chi tiết
          </button>
        </div>

        {/* Instructor */}
        <div className="mt-3 pt-3 border-t border-[#e3e6ea]">
          <p className="text-xs text-[#889397]">
            Giảng viên: <span className="text-[#5C6C75] font-semibold">{course.user.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};



export default function CourseListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[] | []>([]) 


  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourses({
        page: 1,
        limit: 10,
      });
      if (response.status === 200 && response.data.data) {    
        setCourses(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching groups:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);


  // Get unique levels and categories
  const levels = ['all', ...new Set(courses.map(c => c.level.name))];
  const categories = ['all', ...new Set(courses.map(c => c.category.name))];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level.name === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category.name === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Khám phá khóa học</h1>
          <p className="text-gray-600">Tìm kiếm và học hỏi từ các khóa học chất lượng cao</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#889397] w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-[#e3e6ea] rounded-lg focus:ring-2 focus:ring-[#00684A] focus:border-[#00684A] outline-none bg-white text-[#001E2B] placeholder-[#889397] shadow-sm"
            />
          </div>

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-3 rounded-lg border-2 border-[#e3e6ea] mb-4 text-[#001E2B] font-semibold hover:border-[#00684A] transition-colors"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:flex gap-4`}>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full lg:w-auto px-4 py-3 border-2 border-[#e3e6ea] rounded-lg focus:ring-2 focus:ring-[#00684A] focus:border-[#00684A] outline-none bg-white mb-2 lg:mb-0 text-[#001E2B] font-medium shadow-sm"
            >
              <option value="all">Tất cả cấp độ</option>
              {levels.filter(l => l !== 'all').map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-auto px-4 py-3 border-2 border-[#e3e6ea] rounded-lg focus:ring-2 focus:ring-[#00684A] focus:border-[#00684A] outline-none bg-white text-[#001E2B] font-medium shadow-sm"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#5C6C75] font-medium">
            Hiển thị <span className="font-bold text-[#00684A]">{filteredCourses.length}</span> khóa học
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-[#e3e6ea]">
            <BookOpen className="w-16 h-16 text-[#c1c7cd] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#001E2B] mb-2">Không tìm thấy khóa học</h3>
            <p className="text-[#5C6C75]">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}