'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Flag,
  Send,
  Play,
  BarChart3,
  Volume2,
  CheckCircle2,
  Circle
} from 'lucide-react';
import testAPI from '@/apis/test.api';
import { AttemptResponse } from '@/types/test.type';

interface Option {
  id: number;
  option_text: string;
  image_url?: string | null;
}

interface Question {
  id: number;
  question: string;
  type: 'mcq' | 'multi_choice' | 'fill_gap' | 'matching' | 'arrange';
  points: string;
  audio_url?: string | null;
  image_url?: string | null;
  metadata?: string;
  options?: Option[];
  left_items?: any[];
  right_items?: any[];
}

interface Answer {
  question_id: number;
  answer: any;
  is_flagged?: boolean;
}

interface Props {
    testId: string
}

export default function TestAttemptPage({ 
     testId
}: Props) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 phút
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[] | []>([])
  const [attempt_id, setAttempt_id] = useState<Number | null>(null)
  const [testData, setTestData] = useState<AttemptResponse | null>(null)

  const fetchTestDetail = async () => {
    try {
      setLoading(true);
      const response = await testAPI.startTest(Number(testId));

      if (response.status === 200 && response.data.data) {    
        setQuestions(response.data.data.questions || []);
        setAttempt_id(response.data.data.attempt_id)
        setTestData(response.data.data)
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching detail course:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestDetail()
  }, []);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        // if (prev <= 1) {  // handle end
        //   handleAutoSubmit();
        //   return 0;
        // }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Save answer (auto-save)
  const saveAnswer = useCallback(async (questionId: number, answer: any) => {
    setIsSaving(true);
    try {
      // await fetch(`/api/test-attempts/${attempt_id}/save-answer`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ question_id: questionId, answer })
      // });
      const response = await testAPI.saveAnswer(Number(testId),questionId, answer, 0)
      console.log("response: ", response);
    } catch (error) {
      console.error('Failed to save answer:', error);
    } finally {
      setIsSaving(false);
    }
  }, [attempt_id]);

  // Handle answer change
  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        answer,
        is_flagged: prev[questionId]?.is_flagged || false
      }
    }));
    saveAnswer(questionId, answer);
  };

  // Toggle flag
  const toggleFlag = (questionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        question_id: questionId,
        answer: prev[questionId]?.answer,
        is_flagged: !prev[questionId]?.is_flagged
      }
    }));
  };

  // Navigation
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Submit
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/test-attempts/${attempt_id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: Object.values(answers) })
      });
      
      const result = await response.json();
      router.push(`/test-results/${attempt_id}`);
    } catch (error) {
      console.error('Failed to submit test:', error);
    }
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  // Get question status
  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    const answer = answers[question.id];
    
    if (!answer || !answer.answer) return 'unanswered';
    if (answer.is_flagged) return 'flagged';
    return 'answered';
  };

  // Count answered questions
  const answeredCount = questions.filter(q => answers[q.id]?.answer).length;
  const flaggedCount = questions.filter(q => answers[q.id]?.is_flagged).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col items-center">
      {/* Header - MongoDB Style */}
      <header className="bg-white border-b border-[#e3e6ea] sticky top-0 z-30 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-5">
            {/* Left: Test title & info */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00684A] to-[#004d34] rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#001E2B] mb-1">
                  {testData?.title || 'Listening Comprehension Test - Multiple Scenarios'}
                </h1>
                <div className="flex items-center gap-5 text-sm text-[#5C6C75]">
                  <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00684A]"></div>
                    {testData?.total_questions || 20} câu hỏi
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Bắt đầu: {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Thời gian: 30 phút
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Timer */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-semibold text-[#5C6C75] uppercase tracking-wide mb-1">
                  Thời gian còn lại
                </div>
                <div className={`text-4xl font-bold tabular-nums ${
                  timeRemaining < 300 ? 'text-[#FF6F00]' : 'text-[#001E2B]'
                }`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex w-[65%] px-8 py-8">
        {/* Left: Question Content */}
        <main className="flex-1 overflow-y-auto">
          {currentQuestion && (
            <div className="max-w-7xl">
              {/* Question Card - MongoDB Style */}
              <div className="bg-white rounded-2xl border border-[#e3e6ea] shadow-sm overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-[#00684A] to-[#004d34] px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {currentQuestionIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">
                          Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#FFE212] text-[#001E2B] rounded-full text-sm font-bold">
                            {currentQuestion.points} điểm
                          </span>
                          <span className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full font-medium">
                            {String(currentQuestion.type) === 'mcq' && 'Một đáp án'}
                            {String(currentQuestion.type) === 'multi_choice' && 'Nhiều đáp án'}
                            {String(currentQuestion.type) === 'fill_gap' && 'Điền từ'}
                            {String(currentQuestion.type) === 'matching' && 'Nối đáp án'}
                            {String(currentQuestion.type) === 'arrange' && 'Sắp xếp'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={`p-3 rounded-xl transition-all ${
                        answers[currentQuestion.id]?.is_flagged
                          ? 'bg-[#FFE212] text-[#001E2B]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      title="Đánh dấu câu hỏi"
                    >
                      <Flag className={`w-5 h-5 ${answers[currentQuestion.id]?.is_flagged ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Content */}
                <div className="px-8 py-8 min-h-[50vh]">
                  {/* Question Text */}
                  <div className="mb-8">
                    <div className="text-lg text-[#001E2B] leading-relaxed font-medium whitespace-pre-wrap">
                      {currentQuestion.question}
                    </div>
                  </div>

                  {/* Fill Gap Indicator */}
                  {currentQuestion.type === 'fill_gap' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e3f9e5] text-[#00684A] rounded-lg text-sm font-semibold mb-6">
                      <span className="w-2 h-2 rounded-full bg-[#00684A]"></span>
                      Điền vào chỗ trống
                    </div>
                  )}

                  {/* Audio Player */}
                  {currentQuestion.audio_url && (
                    <div className="mb-8 p-6 bg-gradient-to-br from-[#e3f9e5] to-[#c1eac5] rounded-xl border border-[#00684A]/10">
                      <div className="flex items-center gap-3 text-[#00684A] mb-4">
                        <div className="w-10 h-10 bg-[#00684A] rounded-lg flex items-center justify-center">
                          <Volume2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">Nghe audio</span>
                      </div>
                      <audio controls className="w-full">
                        <source src={currentQuestion.audio_url} />
                      </audio>
                    </div>
                  )}

                  {/* Question Image */}
                  {currentQuestion.image_url && (
                    <div className="mb-8">
                      <img 
                        src={currentQuestion.image_url} 
                        alt="Question" 
                        className="max-w-full rounded-xl border border-[#e3e6ea] shadow-sm"
                      />
                    </div>
                  )}

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {/* MCQ - Single Choice */}
                    {currentQuestion.type === 'mcq' && currentQuestion.options?.map((option, idx) => (
                      <label
                        key={option.id}
                        className={`
                          group flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer
                          transition-all duration-200
                          ${answers[currentQuestion.id]?.answer === option.id
                            ? 'border-[#00684A] bg-[#e3f9e5] shadow-md'
                            : 'border-[#e3e6ea] hover:border-[#c1c7cd] bg-white hover:shadow-sm'
                          }
                        `}
                      >
                        <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                          {answers[currentQuestion.id]?.answer === option.id ? (
                            <CheckCircle2 className="w-6 h-6 text-[#00684A]" />
                          ) : (
                            <Circle className="w-6 h-6 text-[#c1c7cd] group-hover:text-[#889397]" />
                          )}
                        </div>
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={answers[currentQuestion.id]?.answer === option.id}
                          onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                          className="sr-only"
                        />
                        <span className="flex-1 text-[#001E2B] font-medium">
                          {option.option_text}
                          {option.image_url && (
                            <img src={option.image_url} alt="Option" className="mt-3 max-w-xs rounded-lg border border-[#e3e6ea]" />
                          )}
                        </span>
                      </label>
                    ))}

                    {/* Multi Choice */}
                    {currentQuestion.type === 'multi_choice' && currentQuestion.options?.map((option) => {
                      const selectedOptions = answers[currentQuestion.id]?.answer || [];
                      const isSelected = selectedOptions.includes(option.id);
                      
                      return (
                        <label
                          key={option.id}
                          className={`
                            group flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer
                            transition-all duration-200
                            ${isSelected
                              ? 'border-[#00684A] bg-[#e3f9e5] shadow-md'
                              : 'border-[#e3e6ea] hover:border-[#c1c7cd] bg-white hover:shadow-sm'
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const newSelection = e.target.checked
                                ? [...selectedOptions, option.id]
                                : selectedOptions.filter((id: number) => id !== option.id);
                              handleAnswerChange(currentQuestion.id, newSelection);
                            }}
                            className="mt-1 w-5 h-5 text-[#00684A] border-[#c1c7cd] rounded focus:ring-[#00684A] focus:ring-offset-0"
                          />
                          <span className="flex-1 text-[#001E2B] font-medium">{option.option_text}</span>
                        </label>
                      );
                    })}

                    {/* Fill Gap */}
                    {currentQuestion.type === 'fill_gap' && (
                      <div className="relative">
                        <input
                          type="text"
                          value={answers[currentQuestion.id]?.answer || ''}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          placeholder="Nhập câu trả lời của bạn..."
                          className="w-full px-5 py-4 border-2 border-[#e3e6ea] rounded-xl focus:border-[#00684A] focus:ring-4 focus:ring-[#00684A]/10 outline-none text-base font-medium text-[#001E2B] placeholder:text-[#c1c7cd] transition-all"
                        />
                      </div>
                    )}

                    {/* Matching */}
                    {currentQuestion.type === 'matching' && (() => {
                      const metadata = typeof currentQuestion.metadata === 'string'
                        ? JSON.parse(currentQuestion.metadata)
                        : (currentQuestion.metadata || {});
                      const pairs = metadata.pairs || [];
                      const userMatches = answers[currentQuestion.id]?.answer || {};

                      return (
                        <div className="space-y-4">
                          {pairs.map((pair: any, index: number) => (
                            <div key={index} className="flex items-center gap-4 p-5 bg-[#f8fafb] rounded-xl border border-[#e3e6ea]">
                              <div className="flex-1 font-semibold text-[#001E2B]">
                                {pair.left}
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#c1c7cd]" />
                              <select
                                value={userMatches[pair.left] || ''}
                                onChange={(e) => {
                                  const newMatches = { ...userMatches, [pair.left]: e.target.value };
                                  handleAnswerChange(currentQuestion.id, newMatches);
                                }}
                                className="flex-1 px-4 py-3 border-2 border-[#e3e6ea] rounded-lg focus:border-[#00684A] focus:ring-4 focus:ring-[#00684A]/10 outline-none font-medium text-[#001E2B]"
                              >
                                <option value="">-- Chọn đáp án --</option>
                                {pairs.map((p: any, i: number) => (
                                  <option key={i} value={p.right}>{p.right}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Arrange */}
                    {currentQuestion.type === 'arrange' && (() => {
                      const userOrder = answers[currentQuestion.id]?.answer || 
                        currentQuestion.options?.map((_, i) => i) || [];
                      const displayOrder = userOrder.map((i: number) => currentQuestion.options?.[i]);

                      return (
                        <div className="space-y-3">
                          <p className="text-sm text-[#5C6C75] font-medium mb-4 px-5">
                            Sắp xếp các từ theo đúng thứ tự:
                          </p>
                          {displayOrder.map((option: any, displayIndex: number) => (
                            <div
                              key={displayIndex}
                              className="flex items-center gap-4 p-4 bg-white border-2 border-[#e3e6ea] rounded-xl hover:border-[#c1c7cd] transition-colors"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-[#00684A] to-[#004d34] rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm">
                                {displayIndex + 1}
                              </div>
                              <span className="flex-1 font-semibold text-[#001E2B]">{option?.option_text}</span>
                              <div className="flex gap-2">
                                {displayIndex > 0 && (
                                  <button
                                    onClick={() => {
                                      const newOrder = [...userOrder];
                                      [newOrder[displayIndex], newOrder[displayIndex - 1]] = 
                                      [newOrder[displayIndex - 1], newOrder[displayIndex]];
                                      handleAnswerChange(currentQuestion.id, newOrder);
                                    }}
                                    className="p-2 hover:bg-[#e3f9e5] rounded-lg transition-colors text-[#5C6C75] hover:text-[#00684A]"
                                  >
                                    ↑
                                  </button>
                                )}
                                {displayIndex < displayOrder.length - 1 && (
                                  <button
                                    onClick={() => {
                                      const newOrder = [...userOrder];
                                      [newOrder[displayIndex], newOrder[displayIndex + 1]] = 
                                      [newOrder[displayIndex + 1], newOrder[displayIndex]];
                                      handleAnswerChange(currentQuestion.id, newOrder);
                                    }}
                                    className="p-2 hover:bg-[#e3f9e5] rounded-lg transition-colors text-[#5C6C75] hover:text-[#00684A]"
                                  >
                                    ↓
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Auto-save indicator */}
                  {isSaving && (
                    <div className="mt-6 flex items-center gap-2 text-sm text-[#5C6C75] px-5">
                      <div className="w-4 h-4 border-2 border-[#e3e6ea] border-t-[#00684A] rounded-full animate-spin"></div>
                      <span className="font-medium">Đang lưu câu trả lời...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 mt-8">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-[#e3e6ea] rounded-xl font-semibold text-[#001E2B] hover:border-[#c1c7cd] hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Câu trước
                </button>

                <div className="text-sm text-[#5C6C75] font-medium">
                  <span className="text-[#00684A] font-bold">{answeredCount}</span> / {questions.length} câu đã làm
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#00684A] to-[#004d34] text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Câu tiếp theo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar: Question List - MongoDB Style */}
        <aside className="ml-10 w-80 h-[70vh] bg-white border-l border-[#e3e6ea] overflow-y-auto rounded-lg">
          <div className="p-5">
            {/* Progress Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#00684A] to-[#004d34] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#001E2B]">
                    Danh sách câu hỏi
                  </h3>
                  <p className="text-xs text-[#5C6C75]">
                    <span className="font-bold text-[#00684A]">{answeredCount}/{questions.length}</span> câu
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-[#e3e6ea] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00684A] to-[#5ab55e] transition-all duration-500 ease-out"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {questions.map((question, index) => {
                const status = getQuestionStatus(index);
                const isAnswered = status === 'answered' || status === 'flagged';
                const isCurrent = index === currentQuestionIndex;
                const isFlagged = answers[question.id]?.is_flagged;
                
                return (
                  <button
                    key={question.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      relative aspect-square rounded-lg font-bold text-sm
                      transition-all duration-200
                      ${isCurrent ? 'ring-2 ring-[#00684A] ring-offset-1' : ''}
                      ${isAnswered 
                        ? 'bg-gradient-to-br from-[#00684A] to-[#5ab55e] text-white shadow-sm hover:shadow-md' 
                        : 'bg-[#f3f4f6] text-[#889397] border border-[#e3e6ea] hover:border-[#c1c7cd] hover:bg-white'
                      }
                    `}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {index + 1}
                    </span>
                    {isFlagged && (
                      <Flag className="w-3 h-3 absolute top-1 right-1 fill-[#FFE212] text-[#FFE212]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 mb-5 p-3 bg-[#f8fafb] rounded-lg border border-[#e3e6ea]">
              <h4 className="font-semibold text-[#001E2B] mb-2 text-xs uppercase tracking-wide">Chú thích</h4>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-[#00684A] to-[#5ab55e] rounded-md flex-shrink-0"></div>
                <span className="text-xs text-[#5C6C75] font-medium">Đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f3f4f6] border border-[#e3e6ea] rounded-md flex-shrink-0"></div>
                <span className="text-xs text-[#5C6C75] font-medium">Chưa trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-[#00684A] to-[#5ab55e] rounded-md relative ring-2 ring-[#00684A] ring-offset-1 flex-shrink-0"></div>
                <span className="text-xs text-[#5C6C75] font-medium">Câu hiện tại</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitDialog(true)}
              className="w-full py-3 bg-gradient-to-r from-[#FF6F00] to-[#E91E63] hover:shadow-lg text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              Nộp bài ngay
            </button>
          </div>
        </aside>
      </div>

      {/* Submit Dialog - MongoDB Style */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-[#001E2B]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#00684A] to-[#004d34] px-8 py-6">
              <h3 className="text-2xl font-bold text-white">
                Xác nhận nộp bài
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Vui lòng kiểm tra lại trước khi nộp
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 bg-[#e3f9e5] rounded-xl">
                  <span className="text-[#00684A] font-semibold">Đã làm:</span>
                  <span className="font-bold text-[#00684A] text-lg">{answeredCount}/{questions.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f8fafb] rounded-xl border border-[#e3e6ea]">
                  <span className="text-[#5C6C75] font-semibold">Chưa làm:</span>
                  <span className="font-bold text-[#5C6C75] text-lg">{unansweredCount}/{questions.length}</span>
                </div>
                {flaggedCount > 0 && (
                  <div className="flex items-center justify-between p-4 bg-[#FFE212]/10 rounded-xl border border-[#FFE212]/20">
                    <span className="text-[#001E2B] font-semibold">Đánh dấu:</span>
                    <span className="font-bold text-[#001E2B] text-lg">{flaggedCount}</span>
                  </div>
                )}
              </div>

              {unansweredCount > 0 && (
                <div className="flex items-start gap-3 p-4 bg-[#FF6F00]/10 border border-[#FF6F00]/20 rounded-xl mb-6">
                  <AlertCircle className="w-5 h-5 text-[#FF6F00] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#001E2B]">
                    Bạn còn <strong className="text-[#FF6F00]">{unansweredCount} câu</strong> chưa làm. 
                    Bạn có chắc chắn muốn nộp bài không?
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1 px-5 py-3.5 bg-[#f3f4f6] hover:bg-[#e3e6ea] text-[#001E2B] rounded-xl font-semibold transition-all"
                >
                  Tiếp tục làm
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-5 py-3.5 bg-gradient-to-r from-[#FF6F00] to-[#E91E63] hover:shadow-lg text-white rounded-xl font-semibold transition-all"
                >
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}