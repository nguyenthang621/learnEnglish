// app/tests/page.tsx or pages/tests.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, FileText, Target, Users, TrendingUp, Filter, Search, ChevronRight } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  color: string;
  is_active: boolean;
}

interface TestType {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

interface Test {
  id: number;
  title: string;
  slug: string;
  description: string;
  instructions: string;
  level: Level;
  test_type: TestType;
  time_limit_minutes: number;
  max_attempts: number;
  passing_score: string;
  total_questions: number;
  total_points: string;
  shuffle_questions: boolean;
  show_results_immediately: boolean;
  allow_review: boolean;
  average_score: number;
  is_published: boolean;
  created_at: string;
}

export interface TestsPageProps {
  tests: Test[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function TestsPage({ tests, meta }: TestsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Get unique levels and types for filters
  const levels = Array.from(new Set(tests.map(test => test.level.name)));
  const testTypes = Array.from(new Set(tests.map(test => test.test_type.name)));

  // Filter tests
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || test.level.name === selectedLevel;
    const matchesType = selectedType === 'all' || test.test_type.name === selectedType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001E2B] via-[#00313C] to-[#00684A] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        <div className="grid grid-cols-5 gap-6">
        {/* Text content*/}
        <div className="col-span-4">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Kiểm tra & Đánh giá
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Đánh giá trình độ của bạn với các bài kiểm tra chuyên sâu được thiết kế bởi chuyên gia
            </p>
        </div>

        {/* Stats */}
        <div className="col-span-1 justify-self-end">
            <div className="grid grid-cols-1 gap-6">
            <div className="text-center">
                <div className="text-4xl font-bold text-[#00ED64] mb-2">{meta.total}</div>
                <div className="text-sm text-gray-300">Bài kiểm tra</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-bold text-[#00ED64] mb-2">15+</div>
                <div className="text-sm text-gray-300">Chủ đề</div>
            </div>
            </div>
        </div>
        </div>


        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài kiểm tra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/20 outline-none transition-all"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/20 outline-none transition-all bg-white"
            >
              <option value="all">Tất cả cấp độ</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/20 outline-none transition-all bg-white"
            >
              <option value="all">Tất cả loại</option>
              {testTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(selectedLevel !== 'all' || selectedType !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">Đang lọc:</span>
              {selectedLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-[#00684A] text-white text-sm px-3 py-1 rounded-full">
                  {selectedLevel}
                  <button onClick={() => setSelectedLevel('all')} className="hover:text-gray-200">×</button>
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-[#00684A] text-white text-sm px-3 py-1 rounded-full">
                  {selectedType}
                  <button onClick={() => setSelectedType('all')} className="hover:text-gray-200">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#00684A] text-white text-sm px-3 py-1 rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-gray-200">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="text-sm text-[#00684A] hover:text-[#00684A]/80 font-medium ml-2"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Hiển thị <span className="font-semibold text-[#001E2B]">{filteredTests.length}</span> bài kiểm tra
              {searchQuery && ` cho "${searchQuery}"`}
            </p>
          </div>

          {/* Tests Grid */}
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <Link
                  key={test.id}
                  href={`/tests/${test.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#00684A] transition-all duration-300 overflow-hidden h-full flex flex-col hover:shadow-xl">
                    {/* Header with Icon */}
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00684A] to-[#00ED64] flex items-center justify-center text-2xl shadow-lg">
                          {test.test_type.icon}
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: test.level.color + '20',
                            color: test.level.color
                          }}
                        >
                          {test.level.name}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="text-xs font-semibold text-[#00684A] uppercase tracking-wider">
                          {test.test_type.name}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#001E2B] mb-3 leading-tight group-hover:text-[#00684A] transition-colors line-clamp-2">
                        {test.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {test.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-6 bg-white flex-1 flex flex-col">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Thời gian</div>
                            <div className="text-sm font-bold text-[#001E2B]">{test.time_limit_minutes} phút</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Câu hỏi</div>
                            <div className="text-sm font-bold text-[#001E2B]">{test.total_questions}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <Target className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Điểm đạt</div>
                            <div className="text-sm font-bold text-[#001E2B]">{test.passing_score}%</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Lượt thi</div>
                            <div className="text-sm font-bold text-[#001E2B]">{test.max_attempts}</div>
                          </div>
                        </div>
                      </div>

                      {/* Features Tags */}
                      {/* <div className="flex flex-wrap gap-2 mb-6">
                        {test.shuffle_questions && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Trộn câu hỏi
                          </span>
                        )}
                        {test.show_results_immediately && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Xem kết quả ngay
                          </span>
                        )}
                        {test.allow_review && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Ôn lại bài thi
                          </span>
                        )}
                      </div> */}

                      {/* CTA */}
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            {test.total_points} điểm
                          </span>
                          <div className="inline-flex items-center gap-2 text-[#00684A] font-bold group-hover:gap-3 transition-all">
                            <span>Bắt đầu thi</span>
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#001E2B] mb-3">
                Không tìm thấy bài kiểm tra
              </h3>
              <p className="text-gray-600 mb-6">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="bg-[#00684A] hover:bg-[#00684A]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

          {/* Pagination (if needed) */}
          {meta.last_page > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: meta.last_page }).map((_, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    index + 1 === meta.current_page
                      ? 'bg-[#00684A] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#001E2B] to-[#00684A] py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn sàng thử thách bản thân?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Bắt đầu với bài kiểm tra phù hợp với trình độ của bạn
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tests?level=Dễ"
              className="bg-[#00ED64] hover:bg-[#00c956] text-[#001E2B] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Bắt đầu ngay
            </Link>
            <Link
              href="/courses"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
            >
              Xem khóa học
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}