'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Flag,
  Send,
  Info,
  CheckCircle2,
  Circle,
  Save,
  X,
  BarChart3
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
  type: 'mcq' | 'multi_choice' | 'fill_gap' | 'matching' | 'arrange' | 'true_false';
  points: string;
  audio_url?: string | null;
  image_url?: string | null;
  metadata?: string;
  options?: Option[];
}

interface Answer {
  question_id: number;
  answer: any;
  is_flagged?: boolean;
  is_saved?: boolean;
}

interface Props {
  testId: string;
}

// Question type mapping và hướng dẫn
const QUESTION_TYPE_INFO = {
  mcq: {
    label: 'Một đáp án',
    instruction: 'Chọn một đáp án đúng nhất từ các lựa chọn bên dưới'
  },
  multi_choice: {
    label: 'Nhiều đáp án',
    instruction: 'Chọn tất cả các đáp án đúng. Có thể có một hoặc nhiều đáp án đúng'
  },
  fill_gap: {
    label: 'Điền từ',
    instruction: 'Nhập câu trả lời vào ô trống. Sau khi hoàn thành, nhấn "Lưu & Tiếp tục"'
  },
  matching: {
    label: 'Ghép đôi',
    instruction: 'Ghép các cặp bên trái với đáp án phù hợp bên phải. Hoàn thành tất cả các cặp trước khi lưu'
  },
  arrange: {
    label: 'Sắp xếp',
    instruction: 'Nhấn vào các từ để sắp xếp thành câu hoàn chỉnh. Nhấn vào từ đã chọn để bỏ chọn'
  },
  true_false: {
    label: 'Đúng/Sai',
    instruction: 'Chọn True (Đúng) hoặc False (Sai) cho câu phát biểu'
  }
};

// Tooltip Component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-64 p-3 -top-2 left-8 bg-[#001E2B] text-white text-xs rounded-lg shadow-xl">
          <div className="absolute w-2 h-2 bg-[#001E2B] transform rotate-45 -left-1 top-4"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default function TestAttemptPage({ testId }: Props) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savingQuestionId, setSavingQuestionId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt_id, setAttempt_id] = useState<number | null>(null);
  const [testData, setTestData] = useState<AttemptResponse | null>(null);

  const fetchTestDetail = async () => {
    try {
      setLoading(true);
      const response = await testAPI.startTest(Number(testId));
      if (response.status === 200 && response.data) {
        setQuestions(response.data.data.test.questions || []);
        setAttempt_id(response.data.data.attempt_id);
        setTestData(response.data.data);
        setTimeRemaining(response.data.data.time_remaining || 1800);
      }
      setLoading(false);
    } catch (error) {
      console.log('Error fetching test:', error);
      toast.error('Không thể tải bài kiểm tra');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestDetail();
  }, []);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (currentQuestion && needsSaveButton) {
          handleManualSaveAndNext(currentQuestion.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const saveAnswerToServer = async (questionId: number, answer: any) => {
    setSavingQuestionId(questionId);
    setIsSaving(true);
    try {
      await testAPI.saveAnswer(Number(attempt_id), questionId, answer, 0);
      
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          is_saved: true
        }
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to save answer:', error);
      toast.error('Lưu câu trả lời thất bại');
      return false;
    } finally {
      setIsSaving(false);
      setSavingQuestionId(null);
    }
  };

  const handleInstantSave = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        answer,
        is_flagged: prev[questionId]?.is_flagged || false,
        is_saved: false
      }
    }));
    saveAnswerToServer(questionId, answer);
  };

  const handleManualSaveAndNext = async (questionId: number) => {
    const answer = answers[questionId]?.answer;
    
    if (!answer || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
      toast.warning('Vui lòng hoàn thành câu trả lời');
      return;
    }

    if (currentQuestion?.type === 'matching') {
      const metadata = typeof currentQuestion.metadata === 'string'
        ? JSON.parse(currentQuestion.metadata)
        : (currentQuestion.metadata || {});
      const pairs = metadata.pairs || [];
      const userMatches = answer || {};
      const matchedCount = Object.keys(userMatches).filter(key => userMatches[key]).length;
      
      if (matchedCount < pairs.length) {
        toast.warning('Vui lòng hoàn thành tất cả các cặp');
        return;
      }
    }

    const success = await saveAnswerToServer(questionId, answer);
    
    if (success) {
      toast.success('Đã lưu câu trả lời');
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setIsNavigating(true);
          setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsNavigating(false);
          }, 200);
        }
      }, 300);
    }
  };

  const updateAnswerLocally = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        answer,
        is_flagged: prev[questionId]?.is_flagged || false,
        is_saved: false
      }
    }));
  };

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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/test-attempts/${attempt_id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: Object.values(answers) })
      });

      if (response.ok) {
        toast.success('Nộp bài thành công!');
        setTimeout(() => {
          router.push(`/test-results/${attempt_id}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to submit test:', error);
      toast.error('Nộp bài thất bại');
    }
  };

  const handleAutoSubmit = () => {
    toast.info('Hết giờ! Đang tự động nộp bài...');
    handleSubmit();
  };

  // Arrange: Add word to answer
  const handleAddWordToArrange = (questionId: number, wordIndex: number) => {
    const currentAnswer = answers[questionId]?.answer || [];
    if (!currentAnswer.includes(wordIndex)) {
      updateAnswerLocally(questionId, [...currentAnswer, wordIndex]);
    }
  };

  // Arrange: Remove word from answer
  const handleRemoveWordFromArrange = (questionId: number, wordIndex: number) => {
    const currentAnswer = answers[questionId]?.answer || [];
    updateAnswerLocally(
      questionId, 
      currentAnswer.filter((idx: number) => idx !== wordIndex)
    );
  };

  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    const answer = answers[question.id];
    if (!answer || !answer.answer) return 'unanswered';
    return 'answered';
  };

  const answeredCount = questions.filter(q => answers[q.id]?.answer).length;
  const flaggedCount = questions.filter(q => answers[q.id]?.is_flagged).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const needsSaveButton = currentQuestion && 
    ['fill_gap', 'matching', 'arrange'].includes(currentQuestion.type);

  const isCurrentAnswerSaved = currentQuestion && answers[currentQuestion.id]?.is_saved;
  const hasUnsavedChanges = currentQuestion && 
    answers[currentQuestion.id]?.answer && 
    !answers[currentQuestion.id]?.is_saved;
  const canSave = currentQuestion && answers[currentQuestion.id]?.answer && 
    !isSaving && !isCurrentAnswerSaved;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e8ebed] border-t-[#00684A] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6b7785] font-medium">Đang tải bài kiểm tra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8ebed] sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[#0d1117] mb-1">
                {testData?.title || 'Bài kiểm tra'}
              </h1>
              <div className="text-sm text-[#6b7785]">
                {testData?.total_questions || questions.length} câu hỏi
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#f6f8fa] rounded-lg border border-[#d1d9e0]">
              <Clock className="w-4 h-4 text-[#6b7785]" />
              <div className="text-right">
                <div className="text-xs text-[#6b7785] font-medium">Thời gian còn lại</div>
                <div className={`text-base font-bold tabular-nums ${
                  timeRemaining < 300 ? 'text-[#d1242f]' : 'text-[#0d1117]'
                }`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex gap-6" style={{ height: '70vh' }}>
          {/* Left: Question Content */}
          <main className="flex-1 overflow-y-auto">
            {currentQuestion && (
              <div className={`transition-opacity duration-200 ${isNavigating ? 'opacity-50' : 'opacity-100'}`}>
                <div className="bg-white rounded-lg border border-[#e8ebed] shadow-sm">
                  {/* Question Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8ebed] bg-[#f6f8fa]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#00684A] rounded-lg">
                        <span className="text-lg font-bold text-white">
                          {currentQuestionIndex + 1}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0d1117]">
                          Câu {currentQuestionIndex + 1} / {questions.length}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#6b7785]">
                            {QUESTION_TYPE_INFO[currentQuestion.type]?.label || currentQuestion.type}
                          </span>
                          <Tooltip content={QUESTION_TYPE_INFO[currentQuestion.type]?.instruction || ''}>
                            <Info className="w-3.5 h-3.5 text-[#6b7785] cursor-help" />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#00684A] text-white rounded text-xs font-semibold">
                        {currentQuestion.points} điểm
                      </span>
                      {isCurrentAnswerSaved && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-[#dafbe1] text-[#00684A] rounded text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã lưu
                        </span>
                      )}
                      <button
                        onClick={() => toggleFlag(currentQuestion.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          answers[currentQuestion.id]?.is_flagged
                            ? 'bg-[#fff8c5] text-[#f57c00]'
                            : 'hover:bg-[#f6f8fa] text-[#6b7785]'
                        }`}
                        title="Đánh dấu"
                      >
                        <Flag className={`w-4 h-4 ${answers[currentQuestion.id]?.is_flagged ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="px-6 py-6">
                    <div className="mb-6">
                      <div className="text-base text-[#0d1117] font-medium leading-relaxed">
                        {currentQuestion.question}
                      </div>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-2.5">
                      {/* MCQ & True/False */}
                      {(currentQuestion.type === 'mcq' || currentQuestion.type === 'true_false') && 
                        currentQuestion.options?.map((option, idx) => {
                          const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                          const isSelected = answers[currentQuestion.id]?.answer === option.id;
                          
                          return (
                            <label
                              key={option.id}
                              className={`
                                flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer
                                transition-all duration-150
                                ${isSelected
                                  ? 'border-[#00684A] bg-[#f0fdf4]'
                                  : 'border-[#e8ebed] hover:border-[#d1d9e0] bg-white'
                                }
                              `}
                            >
                              <div className={`
                                flex items-center justify-center w-7 h-7 rounded font-semibold text-sm
                                flex-shrink-0
                                ${isSelected 
                                  ? 'bg-[#00684A] text-white' 
                                  : 'bg-[#f6f8fa] text-[#6b7785]'
                                }
                              `}>
                                {letters[idx]}
                              </div>
                              <input
                                type="radio"
                                checked={isSelected}
                                onChange={() => handleInstantSave(currentQuestion.id, option.id)}
                                className="sr-only"
                              />
                              <span className="flex-1 text-[#0d1117] text-sm">
                                {option.option_text}
                              </span>
                            </label>
                          );
                        })}

                      {/* Multi Choice */}
                      {currentQuestion.type === 'multi_choice' && currentQuestion.options?.map((option, idx) => {
                        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                        const selectedOptions = answers[currentQuestion.id]?.answer || [];
                        const isSelected = selectedOptions.includes(option.id);
                        
                        return (
                          <label
                            key={option.id}
                            className={`
                              flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer
                              transition-all duration-150
                              ${isSelected
                                ? 'border-[#00684A] bg-[#f0fdf4]'
                                : 'border-[#e8ebed] hover:border-[#d1d9e0] bg-white'
                              }
                            `}
                          >
                            <div className={`
                              flex items-center justify-center w-7 h-7 rounded font-semibold text-sm
                              flex-shrink-0
                              ${isSelected 
                                ? 'bg-[#00684A] text-white' 
                                : 'bg-[#f6f8fa] text-[#6b7785]'
                              }
                            `}>
                              {letters[idx]}
                            </div>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                const newSelection = e.target.checked
                                  ? [...selectedOptions, option.id]
                                  : selectedOptions.filter((id: number) => id !== option.id);
                                handleInstantSave(currentQuestion.id, newSelection);
                              }}
                              className="sr-only"
                            />
                            <span className="flex-1 text-[#0d1117] text-sm">
                              {option.option_text}
                            </span>
                          </label>
                        );
                      })}

                      {/* Fill Gap */}
                      {currentQuestion.type === 'fill_gap' && (
                        <input
                          type="text"
                          value={answers[currentQuestion.id]?.answer || ''}
                          onChange={(e) => updateAnswerLocally(currentQuestion.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && canSave) {
                              handleManualSaveAndNext(currentQuestion.id);
                            }
                          }}
                          placeholder="Nhập câu trả lời..."
                          className="w-full px-4 py-3 border-2 border-[#e8ebed] rounded-lg focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/20 outline-none text-sm"
                        />
                      )}

                      {/* Matching */}
                      {currentQuestion.type === 'matching' && (() => {
                        const metadata = typeof currentQuestion.metadata === 'string'
                          ? JSON.parse(currentQuestion.metadata)
                          : (currentQuestion.metadata || {});
                        const pairs = metadata.pairs || [];
                        const userMatches = answers[currentQuestion.id]?.answer || {};

                        return (
                          <div className="space-y-2.5">
                            {pairs.map((pair: any, index: number) => (
                              <div key={index} className="flex items-center gap-3 p-3.5 bg-[#f6f8fa] rounded-lg border border-[#e8ebed]">
                                <div className="flex-1 font-medium text-[#0d1117] text-sm">
                                  {pair.left}
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#6b7785]" />
                                <select
                                  value={userMatches[pair.left] || ''}
                                  onChange={(e) => {
                                    const newMatches = { ...userMatches, [pair.left]: e.target.value };
                                    updateAnswerLocally(currentQuestion.id, newMatches);
                                  }}
                                  className="flex-1 px-3 py-2 border-2 border-[#e8ebed] rounded-lg focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/20 outline-none text-sm"
                                >
                                  <option value="">-- Chọn --</option>
                                  {pairs.map((p: any, i: number) => (
                                    <option key={i} value={p.right}>{p.right}</option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {/* Arrange - Duolingo Style */}
                      {currentQuestion.type === 'arrange' && (() => {
                        const selectedIndices = answers[currentQuestion.id]?.answer || [];
                        const availableWords = currentQuestion.options || [];

                        return (
                          <div className="space-y-4">
                            {/* Selected Words Area - Horizontal */}
                            <div className="min-h-[60px] p-4 bg-[#f6f8fa] border-2 border-dashed border-[#d1d9e0] rounded-lg">
                              {selectedIndices.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-sm text-[#6b7785]">
                                  Nhấn vào các từ bên dưới để sắp xếp
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {selectedIndices.map((wordIndex: number, position: number) => {
                                    const word = availableWords[wordIndex];
                                    return (
                                      <button
                                        key={`selected-${position}`}
                                        onClick={() => handleRemoveWordFromArrange(currentQuestion.id, wordIndex)}
                                        className="group relative flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#00684A] text-[#0d1117] rounded-lg font-medium text-sm hover:bg-[#fff5f5] hover:border-[#d1242f] transition-all"
                                      >
                                        {word?.option_text}
                                        <X className="w-3.5 h-3.5 text-[#6b7785] group-hover:text-[#d1242f]" />
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Available Words - Horizontal Flow */}
                            <div className="flex flex-wrap gap-2">
                              {availableWords.map((word, index) => {
                                const isSelected = selectedIndices.includes(index);
                                if (isSelected) return null;

                                return (
                                  <button
                                    key={`available-${index}`}
                                    onClick={() => handleAddWordToArrange(currentQuestion.id, index)}
                                    className="px-3 py-2 bg-white border-2 border-[#e8ebed] text-[#0d1117] rounded-lg font-medium text-sm hover:border-[#00684A] hover:bg-[#f0fdf4] transition-all"
                                  >
                                    {word.option_text}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-[#e8ebed] bg-[#f6f8fa]">
                    <button
                      onClick={previousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-2 px-4 py-2 border border-[#e8ebed] rounded-lg font-medium text-[#0d1117] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Câu trước
                    </button>

                    {needsSaveButton ? (
                      <button
                        onClick={() => handleManualSaveAndNext(currentQuestion.id)}
                        disabled={!canSave}
                        className={`
                          flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm
                          transition-all
                          ${!canSave
                            ? 'bg-[#e8ebed] text-[#6b7785] cursor-not-allowed'
                            : 'bg-[#00684A] text-white hover:bg-[#005a3d]'
                          }
                        `}
                      >
                        {isSaving && savingQuestionId === currentQuestion.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Đang lưu...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Lưu & Tiếp tục
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="text-sm text-[#6b7785]">
                        {isSaving && 'Đang lưu...'}
                      </div>
                    )}

                    <button
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className="flex items-center gap-2 px-4 py-2 bg-[#00684A] text-white rounded-lg font-medium hover:bg-[#005a3d] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                    >
                      Câu tiếp
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0 space-y-4 overflow-y-auto">
            {/* Progress */}
            <div className="bg-white rounded-lg border border-[#e8ebed] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-[#00684A]" />
                <h3 className="text-sm font-semibold text-[#0d1117]">Tiến độ</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#6b7785]">{answeredCount}/{questions.length} câu</span>
                  <span className="text-2xl font-bold text-[#00684A]">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-[#e8ebed] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00684A] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="bg-white rounded-lg border border-[#e8ebed] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0d1117] mb-4">Danh sách câu hỏi</h3>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {questions.map((question, index) => {
                  const status = getQuestionStatus(index);
                  const isAnswered = status === 'answered';
                  const isCurrent = index === currentQuestionIndex;
                  const isFlagged = answers[question.id]?.is_flagged;
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`
                        relative aspect-square rounded-lg font-semibold text-xs
                        transition-all duration-150
                        ${isCurrent 
                          ? 'bg-[#00684A] text-white ring-2 ring-[#00684A] ring-offset-2' 
                          : isAnswered
                            ? 'bg-[#dafbe1] text-[#00684A]'
                            : 'bg-white text-[#6b7785] border-2 border-[#e8ebed] hover:border-[#d1d9e0]'
                        }
                      `}
                    >
                      {index + 1}
                      {/* Flag Indicator */}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f57c00] rounded-full border-2 border-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 pt-4 border-t border-[#e8ebed]">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-[#dafbe1] rounded"></div>
                  <span className="text-[#6b7785]">Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-white border-2 border-[#e8ebed] rounded"></div>
                  <span className="text-[#6b7785]">Chưa trả lời</span>
                </div>
                {flaggedCount > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="relative w-5 h-5 bg-white border-2 border-[#e8ebed] rounded">
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f57c00] rounded-full"></span>
                    </div>
                    <span className="text-[#6b7785]">Đã đánh dấu ({flaggedCount})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => setShowSubmitDialog(true)}
              className="w-full py-3 bg-[#d1242f] hover:bg-[#b01e2b] text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Nộp bài thi
            </button>
          </aside>
        </div>
      </div>

      {/* Submit Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-[#e8ebed]">
            <div className="px-6 py-5 border-b border-[#e8ebed]">
              <h3 className="text-lg font-semibold text-[#0d1117]">Xác nhận nộp bài</h3>
              <p className="text-sm text-[#6b7785] mt-1">Vui lòng kiểm tra lại trước khi nộp</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 bg-[#f0fdf4] rounded-lg border border-[#dafbe1]">
                  <span className="text-[#00684A] font-medium text-sm">Đã làm:</span>
                  <span className="font-bold text-[#00684A]">{answeredCount}/{questions.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f6f8fa] rounded-lg border border-[#e8ebed]">
                  <span className="text-[#6b7785] font-medium text-sm">Chưa làm:</span>
                  <span className="font-bold text-[#6b7785]">{unansweredCount}/{questions.length}</span>
                </div>
                {flaggedCount > 0 && (
                  <div className="flex items-center justify-between p-4 bg-[#fff8c5] rounded-lg border border-[#f4e4a4]">
                    <span className="text-[#9a6700] font-medium text-sm">Đã đánh dấu:</span>
                    <span className="font-bold text-[#9a6700]">{flaggedCount}</span>
                  </div>
                )}
              </div>

              {unansweredCount > 0 && (
                <div className="flex items-start gap-3 p-4 bg-[#fff8c5] border border-[#e4d192] rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 text-[#9a6700] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#0d1117]">
                    Bạn còn <strong className="text-[#9a6700]">{unansweredCount} câu</strong> chưa làm
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-[#e8ebed] hover:bg-[#f6f8fa] text-[#0d1117] rounded-lg font-medium transition-all text-sm"
                >
                  Tiếp tục làm
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-[#d1242f] hover:bg-[#b01e2b] text-white rounded-lg font-medium transition-all text-sm"
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