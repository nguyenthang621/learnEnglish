"use client"
import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Lock, 
  PlayCircle, 
  ChevronRight,
  ArrowLeft,
  Layout,
  FileText,
  Award,
  List,
  Target,
  Users,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import courseAPI from '@/apis/cource.api';
import { useRouter } from 'next/navigation';


export interface ContentGrammar {
  id: number;
  title: string;
  category: string | null;
  description: string | null;
  rule_explanation: string | null;
  examples: GrammarExample[];
  common_mistakes: GrammarMistake[];
  usage_notes: string[];
  level_id: number | null;
  sort_order: number | null;
}


export interface GrammarExample {
  en: string;
  vi: string;
  note: string | null;
}

export interface GrammarMistake {
  wrong: string;
  correct: string;
  explanation: string;
}


export interface ContentVocabulary {
  id: number;
  title: string;
  image: string | null;
  children: ContentVocabulary[];
}


export interface Section {
  id: number;
  title: string;
  description: string | null;
  type: "vocabulary" | "grammar" | string; // hoặc liệt kê thêm nếu có
  sort_order: number;
  is_required: boolean;
  metadata: any | null;
  content: ContentVocabulary | ContentGrammar;
}



export interface Lesson {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives: string | null;
  thumbnail: string | null;
  duration_minutes: number | null;
  sort_order: number;
  is_preview: boolean | null;
  is_published: boolean;
  sections: Section[];
}
export interface Progress {
  completed: number;
  total: number;
  percentage: number;
}


export interface LessonResponse {
  lesson: Lesson;
  progress: Progress | null;
}


const courseInfo = {
  id: 1,
  title: "Khóa học Lập trình Laravel từ A đến Z",
  instructor: "Admin User",
  totalLessons: 25,
  totalDuration: 1200,
  completedLessons: 1,
  enrolledStudents: 162
};

const LessonTimelineItem = ({ lessonData, index, isLocked, isActive, courseId }: any) => {
  const { lesson, progress } = lessonData;
  const isCompleted = progress?.completed || false;
  const completionPercentage = progress?.completion_percentage || 0;
  const isInProgress = !isCompleted && completionPercentage > 0;
  const canAccess = lesson.is_preview || !isLocked;
  const router = useRouter();

  const handleClickLesson = (courseId: number, lessonId: number)=>{
      if (!courseId || !lessonId) return 
      router.push(`/courses/${courseId}/lessons/${lessonId}`);
  }

  return (
    <div className="flex gap-4 group" onClick={()=> handleClickLesson(courseId, lesson.id)}>
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        {/* Circle */}
        <div className={`
          relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
          ${isCompleted ? 'bg-[#00684A] text-white shadow-lg shadow-[#00684A]/30' : ''}
          ${isInProgress ? 'bg-[#00A4EF] text-white shadow-lg shadow-[#00A4EF]/30 animate-pulse' : ''}
          ${!canAccess ? 'bg-[#e3e6ea] text-[#889397]' : ''}
          ${canAccess && !isCompleted && !isInProgress ? 'bg-white border-3 border-[#00684A] text-[#00684A]' : ''}
          ${isActive ? 'scale-110' : ''}
        `}>
          {isCompleted ? (
            <CheckCircle className="w-6 h-6" />
          ) : !canAccess ? (
            <Lock className="w-6 h-6" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
        
        {/* Vertical Line */}
        {index < lessonData.length - 1 && (
          <div className={`
            w-1 flex-1 min-h-[80px] transition-all duration-300
            ${isCompleted ? 'bg-[#00684A]' : 'bg-[#e3e6ea]'}
          `} />
        )}
      </div>

      {/* Content Card */}
      <div className={`
        flex-1 mb-8 transition-all duration-300
        ${canAccess ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}
      `}>
        <div className={`
          bg-white rounded-xl p-6 shadow-md border-2 transition-all duration-300
          ${isActive ? 'border-[#00684A] shadow-xl shadow-[#00684A]/10 -translate-y-1' : 'border-transparent hover:border-[#00684A] hover:shadow-lg'}
          ${!canAccess ? 'hover:border-transparent' : ''}
        `}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-2">
                {lesson.is_preview && (
                  <span className="bg-[#FFE212] text-[#001E2B] px-2 py-1 rounded-md text-xs font-bold">
                    MIỄN PHÍ
                  </span>
                )}
                {isCompleted && (
                  <span className="bg-[#00684A] text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Hoàn thành
                  </span>
                )}
                {isInProgress && (
                  <span className="bg-[#00A4EF] text-white px-2 py-1 rounded-md text-xs font-bold">
                    {completionPercentage}%
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#001E2B] mb-2 group-hover:text-[#00684A] transition-colors">
                {lesson.title}
              </h3>

              {/* Description */}
              <p className="text-[#5C6C75] text-sm leading-relaxed mb-3">
                {lesson.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {lesson.duration_minutes && (
                  <div className="flex items-center gap-1.5 text-[#889397]">
                    <Clock className="w-4 h-4 text-[#00684A]" />
                    <span className="font-medium">{lesson.duration_minutes} phút</span>
                  </div>
                )}
                {lesson.sections && lesson.sections.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[#889397]">
                    <Layout className="w-4 h-4 text-[#00684A]" />
                    <span className="font-medium">{lesson.sections.length} phần học</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Icon */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all
              ${canAccess ? 'bg-[#00684A] text-white group-hover:scale-110' : 'bg-[#e3e6ea] text-[#889397]'}
            `}>
              {canAccess ? (
                <PlayCircle className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Progress Bar for in-progress lessons */}
          {isInProgress && (
            <div className="mb-4">
              <div className="h-2 bg-[#e3e6ea] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00A4EF] transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Sections */}
          {lesson.sections && lesson.sections.length > 0 && (
            <div className="border-t border-[#e3e6ea] pt-4 mt-4">
              <p className="text-xs font-bold text-[#5C6C75] uppercase tracking-wide mb-3">
                Nội dung bài học
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {lesson.sections.map((section: any) => (
                  <div 
                    key={section.id}
                    className="flex items-center gap-2 bg-[#f8fafb] px-3 py-2 rounded-lg border border-[#e3e6ea]"
                  >
                    <div className="w-6 h-6 rounded bg-[#00684A]/10 flex items-center justify-center flex-shrink-0">
                      {section.type === 'vocabulary' && <FileText className="w-3.5 h-3.5 text-[#00684A]" />}
                      {section.type === 'grammar' && <Layout className="w-3.5 h-3.5 text-[#00684A]" />}
                      {section.type === 'exercise' && <Award className="w-3.5 h-3.5 text-[#00684A]" />}
                    </div>
                    <span className="text-sm text-[#5C6C75] flex-1 truncate">{section.title}</span>
                    {section.is_required && (
                      <span className="text-[#E91E63] text-xs font-bold">*</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectives */}
          {lesson.objectives && canAccess && (
            <div className="border-t border-[#e3e6ea] pt-4 mt-4">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-[#00684A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#5C6C75] uppercase tracking-wide mb-1">
                    Mục tiêu
                  </p>
                  <p className="text-sm text-[#5C6C75]">{lesson.objectives}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




export default function CourseLessonsPage({ courseId }: {courseId: string}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(2);
  const [lessonsData, setLessonsData] = useState<LessonResponse[] | []>([])

  const completedCount = lessonsData.filter(l => l.progress?.completed).length;
  const inProgressCount = lessonsData.filter(l => l.progress && !l.progress.completed && l.progress.completion_percentage > 0).length;
  const notStartedCount = lessonsData.filter(l => !l.progress).length;
  const overallProgress = Math.round((courseInfo.completedLessons / courseInfo.totalLessons) * 100);
  const [loading, setLoading] = useState(true);
  

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getLessons(1);
      if (response.status === 200 && response.data.data) {    
        setLessonsData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching groups:", error);
      setLoading(false);
    }
  }

  const fetchDetailCouse = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getDetailCourse(1);
      if (response.status === 200 && response.data.data) {    
        setLessonsData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching groups:", error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchLessons()
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-[#e3e6ea] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <button className="flex items-center gap-2 text-[#5C6C75] hover:text-[#00684A] transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            {/* Course Title */}
            <h1 className="text-lg font-bold text-[#001E2B] truncate mx-4">
              {courseInfo.title}
            </h1>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-[#5C6C75] hover:text-[#00684A]"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Stats */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-[#889397]">Tiến độ</p>
                <p className="text-sm font-bold text-[#00684A]">{overallProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? 'block' : 'hidden'} lg:block
            fixed lg:sticky top-16 left-0 right-0 lg:top-24 h-[calc(100vh-4rem)] lg:h-fit
            w-full lg:w-80 flex-shrink-0 bg-white lg:bg-transparent z-40 overflow-y-auto
            p-4 lg:p-0
          `}>
            <div className="bg-white rounded-xl border border-[#e3e6ea] p-6 sticky top-0">
              <h2 className="text-lg font-bold text-[#001E2B] mb-4">Tổng quan khóa học</h2>
              
              {/* Overall Progress Circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e3e6ea"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#00684A"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#00684A]">{overallProgress}%</p>
                      <p className="text-xs text-[#889397]">Hoàn thành</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-[#e3f9e5] rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00684A]" />
                    <span className="text-sm font-medium text-[#004d34]">Đã hoàn thành</span>
                  </div>
                  <span className="text-lg font-bold text-[#00684A]">{completedCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#e3f4fc] rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#00A4EF]" />
                    <span className="text-sm font-medium text-[#006b9e]">Đang học</span>
                  </div>
                  <span className="text-lg font-bold text-[#00A4EF]">{inProgressCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#889397]" />
                    <span className="text-sm font-medium text-[#5C6C75]">Chưa học</span>
                  </div>
                  <span className="text-lg font-bold text-[#5C6C75]">{notStartedCount}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="border-t border-[#e3e6ea] pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#889397]" />
                  <span className="text-[#5C6C75]">
                    <span className="font-bold text-[#001E2B]">{Math.round(courseInfo.totalDuration / 60)}h</span> tổng thời lượng
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="w-4 h-4 text-[#889397]" />
                  <span className="text-[#5C6C75]">
                    <span className="font-bold text-[#001E2B]">{courseInfo.totalLessons}</span> bài học
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-[#889397]" />
                  <span className="text-[#5C6C75]">
                    <span className="font-bold text-[#001E2B]">{courseInfo.enrolledStudents}</span> học viên
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Timeline */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#001E2B] mb-2">Lộ trình học tập</h2>
              <p className="text-[#5C6C75]">Hoàn thành từng bài học theo thứ tự để mở khóa bài tiếp theo</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {lessonsData.map((lessonData, index) => {
                const isLocked = index > 0 && !lessonsData[index - 1].progress?.completed && !lessonData.lesson.is_preview;
                const isActive = index === activeLesson;
                return (
                  <LessonTimelineItem
                    key={lessonData.lesson.id}
                    lessonData={lessonData}
                    index={index}
                    isLocked={isLocked}
                    isActive={isActive}
                    courseId={courseId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}