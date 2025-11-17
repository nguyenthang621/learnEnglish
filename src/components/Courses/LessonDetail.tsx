"use client"
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Layout,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Lightbulb,
  AlertCircle,
  Target,
  List,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Course } from './ListCourses';
import courseAPI from '@/apis/cource.api';
import { LessonPageProps } from '@/app/courses/[courseId]/lessons/[lessonId]/page';
import { useRouter } from 'next/navigation';

// // Mock data từ API
// const lessonData = {
//   "lesson": {
//     "id": 1,
//     "title": "Upload File #1",
//     "slug": "upload-file-1",
//     "description": "Distinctio corporis assumenda repellendus. Non qui delectus ut eos.",
//     "objectives": "Qui sequi facere molestiae harum est aut ullam.",
//     "thumbnail": null,
//     "duration_minutes": 45,
//     "sort_order": 1,
//     "is_preview": true,
//     "is_published": true,
//     "sections": [
//       {
//         "id": 1,
//         "title": "Từ vựng cơ bản",
//         "description": "123eqweqwe",
//         "type": "vocabulary",
//         "sort_order": 0,
//         "is_required": true,
//         "metadata": null,
//         "content": {
//           "id": 4,
//           "title": "Con đường - Street",
//           "image": null,
//           "children": [
//             {
//               "word": "street",
//               "pronunciation": "/striːt/",
//               "meaning": "đường phố",
//               "example": "I walk down the street every day.",
//               "example_vi": "Tôi đi bộ trên phố mỗi ngày."
//             },
//             {
//               "word": "road",
//               "pronunciation": "/rəʊd/",
//               "meaning": "con đường",
//               "example": "The road is very long.",
//               "example_vi": "Con đường rất dài."
//             }
//           ]
//         }
//       },
//       {
//         "id": 2,
//         "title": "Ngữ pháp: Present Simple Tense",
//         "description": "sadasd",
//         "type": "grammar",
//         "sort_order": 1,
//         "is_required": true,
//         "metadata": null,
//         "content": {
//           "id": 1,
//           "title": "Present Simple Tense",
//           "category": null,
//           "description": "Fugiat labore ea laboriosam sint placeat corporis qui. Recusandae aliquam et itaque voluptate aliquam recusandae nesciunt.",
//           "rule_explanation": "Dùng để diễn tả thói quen, sự thật hiển nhiên hoặc trạng thái hiện tại không thay đổi.",
//           "examples": [
//             {
//               "en": "I go to school every day.",
//               "vi": "Tôi đi học mỗi ngày.",
//               "note": "Thói quen."
//             },
//             {
//               "en": "The Earth orbits the Sun.",
//               "vi": "Trái Đất quay quanh Mặt Trời.",
//               "note": "Sự thật hiển nhiên."
//             }
//           ],
//           "common_mistakes": [
//             {
//               "wrong": "He go to school.",
//               "correct": "He goes to school.",
//               "explanation": "Động từ thêm \"-es\" cho chủ ngữ số ít ngôi 3."
//             }
//           ],
//           "usage_notes": [
//             "Dùng với trạng từ tần suất: always, usually, often, sometimes...",
//             "Không dùng \"am/is/are\" với động từ thường."
//           ],
//           "level_id": null,
//           "sort_order": null
//         }
//       }
//     ],
//     "course": {
//       "id": 1,
//       "title": "Khóa học Lập trình Laravel từ A đến Z",
//       "slug": "khoa-hoc-lap-trinh-laravel-tu-a-den-z",
//       "description": "Học Laravel từ căn bản đến nâng cao, xây dựng project thực tế.",
//       "total_lessons": 75
//     }
//   },
//   "progress": {
//     "status": "in_progress",
//     "progress_percentage": 50,
//     "time_spent_minutes": 20,
//     "sections_completed": [1],
//     "total_sections": 2,
//     "completion_data": null
//   },
//   "study_session_id": 2
// };

const VocabularySection = ({ content }: any) => {
  const [selectedWord, setSelectedWord] = useState(0);
  const words = content.children || [];

  return (
    <div className="space-y-6">
      {/* Word Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {words.map((word, index) => (
          <div
            key={index}
            onClick={() => setSelectedWord(index)}
            className={`
              p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${selectedWord === index 
                ? 'border-[#00684A] bg-[#e3f9e5] shadow-lg' 
                : 'border-[#e3e6ea] bg-white hover:border-[#00684A]'}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-[#001E2B] mb-1">{word.word}</h4>
                <p className="text-sm text-[#00A4EF] font-medium mb-2">{word.pronunciation}</p>
                <p className="text-lg text-[#5C6C75] font-medium">{word.meaning}</p>
              </div>
              <button className="p-2 rounded-full bg-[#00684A] text-white hover:bg-[#005a3f] transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-[#e3e6ea] pt-3 mt-3 space-y-2">
              <p className="text-sm text-[#001E2B] italic">"{word.example}"</p>
              <p className="text-sm text-[#889397]">{word.example_vi}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Practice Button */}
      <button className="w-full bg-[#00684A] hover:bg-[#005a3f] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2">
        <Play className="w-5 h-5" />
        Luyện tập từ vựng
      </button>
    </div>
  );
};

const GrammarSection = ({ content }: any) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-[#00684A] to-[#004d34] text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-2">{content.title}</h3>
        <p className="text-[#c1eac5]">{content.description}</p>
      </div>

      {/* Rule Explanation */}
      <div className="bg-white border-2 border-[#00684A] rounded-xl p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#00684A] flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#001E2B] mb-2">Quy tắc</h4>
            <p className="text-[#5C6C75] leading-relaxed">{content.rule_explanation}</p>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-white border border-[#e3e6ea] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#001E2B] mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#00684A]" />
          Ví dụ
        </h4>
        <div className="space-y-4">
          {content.examples.map((example, index) => (
            <div key={index} className="p-4 bg-[#f8fafb] rounded-lg border-l-4 border-[#00A4EF]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#001E2B] font-medium flex-1">{example.en}</p>
                <button className="p-1.5 rounded-full bg-[#00A4EF] text-white hover:bg-[#0090d1] transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[#5C6C75] mb-2">{example.vi}</p>
              <span className="inline-block px-2 py-1 bg-[#FFE212] text-[#001E2B] text-xs font-bold rounded">
                {example.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-white border border-[#e3e6ea] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#001E2B] mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#E91E63]" />
          Lỗi thường gặp
        </h4>
        <div className="space-y-4">
          {content.common_mistakes.map((mistake, index) => (
            <div key={index} className="space-y-2">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-sm text-red-900">
                  <span className="font-bold">❌ Sai: </span>
                  <span className="line-through">{mistake.wrong}</span>
                </p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-[#00684A] rounded">
                <p className="text-sm text-green-900">
                  <span className="font-bold">✓ Đúng: </span>
                  <span className="font-bold">{mistake.correct}</span>
                </p>
              </div>
              <p className="text-sm text-[#5C6C75] pl-3">💡 {mistake.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Notes */}
      <div className="bg-[#e3f9e5] border border-[#00684A] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#001E2B] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00684A]" />
          Ghi chú sử dụng
        </h4>
        <ul className="space-y-2">
          {content.usage_notes.map((note, index) => (
            <li key={index} className="flex items-start gap-2 text-[#004d34]">
              <span className="text-[#00684A] font-bold">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practice Button */}
      <button className="w-full bg-[#00684A] hover:bg-[#005a3f] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2">
        <Award className="w-5 h-5" />
        Làm bài tập ngữ pháp
      </button>
    </div>
  );
};

const SectionContent = ({ section, isCompleted }: any) => {
  const getSectionIcon = (type) => {
    const icons = {
      vocabulary: <FileText className="w-5 h-5" />,
      grammar: <Layout className="w-5 h-5" />,
      exercise: <Award className="w-5 h-5" />
    };
    return icons[type] || <List className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00684A] flex items-center justify-center text-white">
            {getSectionIcon(section.type)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#001E2B]">{section.title}</h3>
            <p className="text-sm text-[#889397]">{section.description}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-2 bg-[#00684A] text-white px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">Hoàn thành</span>
          </div>
        )}
      </div>

      {/* Content based on type */}
      {section.type === 'vocabulary' && <VocabularySection content={section.content} />}
      {section.type === 'grammar' && <GrammarSection content={section.content} />}
    </div>
  );
};

export interface Session{
      id: number;
      title: string;
      description: string | null;
      type: string; // "vocabulary" | "grammar" | ...
      sort_order: number;
      is_required: boolean;
      metadata: any;
      content: any;    // Đơn giản → để any, vì mỗi type lại khác nhau
}

export interface LessonDetailResponse {
  lesson: {
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
    sections: Session[];
    course: Course
  };

  progress: {
    status: string; // "in_progress"
    progress_percentage: number;
    time_spent_minutes: number;
    sections_completed: number;
    total_sections: number;
    completion_data: any;
  } | null;

  study_session_id: number;
}


export default function LessonDetailPage({courseId, lessonId}: {courseId: string; lessonId: string}) {


  const [currentSection, setCurrentSection] = useState(0);
  const [lessonData, setLessonData] = useState<LessonDetailResponse | null>(null) 
  const [studyTime, setStudyTime] = useState(lessonData?.progress.time_spent_minutes || 0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [loading, setLoading] = useState(true);


  const fetchLessons = async () => {
    try {
      if (!courseId || !lessonId) return
      setLoading(true);
      const response = await courseAPI.getDetailLesson(Number(courseId), Number(lessonId));
      if (response.status === 200 && response.data.data) {    
        setLessonData(response.data.data);
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
  if (!lessonData) return 

  const lesson = lessonData.lesson;
  const progress = lessonData.progress;
  const sections = lesson.sections;
  const completedSections = progress.sections_completed || [];

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isCurrentSectionCompleted = completedSections.includes(sections[currentSection]?.id);

  const router = useRouter();
  const handleClickBack = ()=>{
      router.push(`/courses`);
  }

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Top Navigation */}
      <div className="bg-white border-b border-[#e3e6ea] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <button className="flex items-center gap-2 text-[#5C6C75] hover:text-[#00684A] transition-colors font-medium cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              <span onClick={()=> handleClickBack()} className="hidden sm:inline">Quay lại khóa học</span>
            </button>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#889397]" />
                <span className="text-[#5C6C75]">
                  <span className="font-bold text-[#001E2B]">{studyTime}</span> phút
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-[#e3e6ea] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00684A] transition-all duration-300"
                    style={{ width: `${progress.progress_percentage || 0}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-[#00684A] min-w-[3rem]">
                  {progress.progress_percentage || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-[#e3e6ea] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#001E2B] mb-4">Nội dung bài học</h3>
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const isCompleted = completedSections.includes(section.id);
                  const isCurrent = index === currentSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`
                        w-full text-left p-3 rounded-lg transition-all
                        ${isCurrent ? 'bg-[#00684A] text-white' : 'hover:bg-[#f8fafb]'}
                        ${!isCurrent && isCompleted ? 'bg-[#e3f9e5]' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${isCurrent ? 'bg-white/20' : isCompleted ? 'bg-[#00684A]' : 'bg-[#e3e6ea]'}
                        `}>
                          {isCompleted ? (
                            <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-white'}`} />
                          ) : (
                            <span className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-[#889397]'}`}>
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isCurrent ? 'text-white' : isCompleted ? 'text-[#00684A]' : 'text-[#5C6C75]'}`}>
                            {section.title}
                          </p>
                          <p className={`text-xs ${isCurrent ? 'text-white/70' : 'text-[#889397]'}`}>
                            {section.type}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Lesson Info */}
              <div className="border-t border-[#e3e6ea] mt-6 pt-6">
                <h4 className="text-sm font-bold text-[#5C6C75] uppercase tracking-wide mb-3">
                  Thông tin bài học
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#889397]">Trạng thái:</span>
                    <span className="font-bold text-[#00A4EF]">Đang học</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#889397]">Hoàn thành:</span>
                    <span className="font-bold text-[#001E2B]">
                      {completedSections.length}/{sections.length}
                    </span>
                  </div>
                  {lesson.duration_minutes && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#889397]">Thời lượng:</span>
                      <span className="font-bold text-[#001E2B]">{lesson.duration_minutes} phút</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Lesson Header */}
            <div className="bg-white rounded-xl border border-[#e3e6ea] p-8 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#FFE212] text-[#001E2B] text-xs font-bold rounded-full">
                      BÀI {lesson.sort_order}
                    </span>
                    {lesson.is_preview && (
                      <span className="px-3 py-1 bg-[#00684A] text-white text-xs font-bold rounded-full">
                        XEM TRƯỚC
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-[#001E2B] mb-3">{lesson.title}</h1>
                  <p className="text-[#5C6C75] leading-relaxed mb-4">{lesson.description}</p>
                  
                  {lesson.objectives && (
                    <div className="flex items-start gap-2 p-4 bg-[#e3f9e5] rounded-lg border border-[#00684A]">
                      <Target className="w-5 h-5 text-[#00684A] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[#00684A] uppercase tracking-wide mb-1">
                          Mục tiêu bài học
                        </p>
                        <p className="text-sm text-[#004d34]">{lesson.objectives}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section Content */}
            <div className="bg-white rounded-xl border border-[#e3e6ea] p-8 mb-6">
              <SectionContent 
                section={sections[currentSection]} 
                isCompleted={isCurrentSectionCompleted}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={goToPrevSection}
                disabled={currentSection === 0}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                  ${currentSection === 0 
                    ? 'bg-[#e3e6ea] text-[#889397] cursor-not-allowed' 
                    : 'bg-white border-2 border-[#00684A] text-[#00684A] hover:bg-[#00684A] hover:text-white'}
                `}
              >
                <ChevronLeft className="w-5 h-5" />
                Phần trước
              </button>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#e3e6ea] text-[#5C6C75] rounded-lg font-semibold hover:border-[#00684A] transition-all">
                  <RotateCcw className="w-5 h-5" />
                  Làm lại
                </button>
                
                {!isCurrentSectionCompleted && (
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#00A4EF] text-white rounded-lg font-semibold hover:bg-[#0090d1] transition-all">
                    <CheckCircle className="w-5 h-5" />
                    Đánh dấu hoàn thành
                  </button>
                )}
              </div>

              <button
                onClick={goToNextSection}
                disabled={currentSection === sections.length - 1}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                  ${currentSection === sections.length - 1
                    ? 'bg-[#e3e6ea] text-[#889397] cursor-not-allowed' 
                    : 'bg-[#00684A] text-white hover:bg-[#005a3f]'}
                `}
              >
                Phần sau
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}