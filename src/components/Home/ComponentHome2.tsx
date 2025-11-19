'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Rocket, Plus } from 'lucide-react';
import RiveWrapper from '@/components/Animation/RiveWrapper';


export function HeroSection() {
  const [titleText, setTitleText] = useState('');
  const fullTitle = 'Học Cùng Bạn – Thành Công Cùng Nhau';

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullTitle.length) {
        setTitleText(fullTitle.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0" />
      
      {/* Animated overlay */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow" 
          style={{ backgroundPosition: '20% 30%' }} 
        />
        <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow" 
          style={{ backgroundPosition: '80% 70%', animationDelay: '1s' }} 
        />
        <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow" 
          style={{ backgroundPosition: '50% 50%', animationDelay: '2s' }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black  leading-tight">
              {titleText}
              <span className="animate-pulse">|</span>
            </h1>

            <p className="text-lg md:text-xl text-mongodb-slate-700 leading-relaxed">
              Hệ thống quản lý học tập toàn diện: Luyện thi THPT, IELTS, lập trình, kỹ năng nghề… 
              Học nhóm với AI. Có người nhắc. Có người kéo bạn đi tiếp.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: CheckCircle, text: '250,000+ học viên' },
                { icon: CheckCircle, text: '12,500+ nhóm học' },
                { icon: CheckCircle, text: '93% duy trì học' }
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm border-2 border-mongodb-green-200 rounded-full font-semibold text-mongodb-green-700 hover:border-mongodb-green-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    style={{ animation: `slideInUp 1s ease ${0.4 + index * 0.1}s backwards` }}
                  >
                    <Icon className="w-5 h-5" />
                    {badge.text}
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 font-bold text-slate-800 bg-gradient-to-r from-mongodb-yellow to-mongodb-orange rounded-xl shadow-xl shadow-mongodb-yellow/30 hover:shadow-2xl hover:shadow-mongodb-yellow/40 hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-600" />
                <span className="relative flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Tham gia nhóm học miễn phí
                </span>
              </button>

              <button className="group relative px-8 py-4 font-bold text-slate-800 bg-gradient-to-r from-mongodb-green-500 to-mongodb-green-600 rounded-xl shadow-xl shadow-mongodb-green-500/30 hover:shadow-2xl hover:shadow-mongodb-green-500/40 hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-600" />
                <span className="relative flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo nhóm của bạn
                </span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-right">
            <div className="floating">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-mongodb-green-500/25">
                {/* <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Nhóm học tập"
                  className="w-full h-auto max-h-[400px] object-cover"
                /> */}
                    <RiveWrapper
                    src="/banner.riv"
                    autoplay
                    style={{ width: 500, height: 500, background: "transparent" }}
                    />
                <div className="absolute inset-0 " />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-left { animation: slideInLeft 1s ease; }
        .animate-slide-in-right { animation: slideInRight 1s ease 0.3s backwards; }
        .floating { animation: floating 6s ease-in-out infinite; }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}


import { LaptopMinimal, BookOpen, GraduationCap, Users, Bot, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: LaptopMinimal,
    title: 'Học & Thi Trực Tuyến',
    description: 'Hệ thống LMS hiện đại với bài giảng video, bài tập tương tác và thi thử online',
    items: [
      'Video bài giảng HD',
      'Làm bài tập trực tuyến',
      'Thi thử có chấm điểm tự động',
      'Theo dõi tiến độ realtime'
    ],
    gradient: 'from-mongodb-green-500 to-mongodb-green-600',
    bg: 'from-mongodb-green-50 to-mongodb-green-100'
  },
  {
    icon: BookOpen,
    title: 'Giải Bài Tập & Soạn Bài',
    description: 'Kho tài liệu phong phú với lời giải chi tiết cho mọi cấp học',
    items: [
      '50,000+ bài tập có lời giải',
      'Soạn bài đầy đủ tất cả môn',
      'Giải thích chi tiết bằng AI',
      'Tìm kiếm thông minh'
    ],
    gradient: 'from-mongodb-blue to-mongodb-green-500',
    bg: 'from-mongodb-blue/10 to-mongodb-green-50'
  },
  {
    icon: GraduationCap,
    title: 'Giáo Án & Đề Thi CLC',
    description: 'Dành cho giáo viên: Giáo án chuẩn và đề thi chất lượng cao',
    items: [
      'Giáo án theo chương trình mới',
      'Đề thi CLC cập nhật',
      'Tài liệu Word/PDF',
      'Cộng đồng giáo viên chia sẻ'
    ],
    gradient: 'from-mongodb-green-600 to-mongodb-blue',
    bg: 'from-mongodb-green-50 to-mongodb-blue/10'
  },
  {
    icon: Users,
    title: 'Study Group',
    description: 'Học nhóm hiệu quả với bạn bè và mentor hướng dẫn',
    items: [
      'Tạo/tham gia nhóm học',
      'Video call học nhóm',
      'Chia sẻ tài liệu',
      'Bảng xếp hạng nhóm'
    ],
    gradient: 'from-mongodb-yellow to-mongodb-orange',
    bg: 'from-mongodb-yellow/10 to-mongodb-orange/10'
  },
  {
    icon: Bot,
    title: 'Học Cùng AI',
    description: 'Trợ lý AI thông minh hỗ trợ học tập 24/7',
    items: [
      'Giải đáp thắc mắc tức thì',
      'Lộ trình học cá nhân hóa',
      'Gợi ý bài tập phù hợp',
      'Phân tích điểm yếu'
    ],
    gradient: 'from-mongodb-purple to-mongodb-blue',
    bg: 'from-mongodb-purple/10 to-mongodb-blue/10'
  },
  {
    icon: TrendingUp,
    title: 'Theo Dõi Tiến Độ',
    description: 'Dashboard chi tiết giúp đo lường hiệu quả học tập',
    items: [
      'Thống kê chi tiết',
      'Báo cáo tiến độ hàng tuần',
      'Huy hiệu thành tích',
      'So sánh với bạn bè'
    ],
    gradient: 'from-mongodb-green-700 to-mongodb-green-900',
    bg: 'from-mongodb-green-100 to-mongodb-green-200'
  }
];

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-white to-mongodb-blue/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-mongodb-green-500 via-mongodb-green-600 to-mongodb-yellow bg-clip-text ">
              Hệ Thống Học Tập Toàn Diện
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-mongodb-green-500 to-transparent rounded-full" />
          </h2>
          <p className="text-lg text-mongodb-slate-600 max-w-2xl mx-auto mt-6">
            Tất cả những gì bạn cần để học tập hiệu quả và đạt mục tiêu
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-index={index}
                className={`group relative bg-white rounded-3xl p-8 border-2 border-transparent hover:border-mongodb-green-300 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-mongodb-green-500/15 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-mongodb-black mb-3 text-center group-hover:text-mongodb-green-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-mongodb-slate-600 text-center mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-mongodb-slate-700">
                        <CheckCircle className="w-5 h-5 text-mongodb-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative glow */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


import { Star, Crown, Calendar, User } from 'lucide-react';

const categories = [
  { id: 'thpt', label: 'Luyện thi THPT', icon: '🎓' },
  { id: 'ielts', label: 'IELTS - TOEIC', icon: '🗣️' },
  { id: 'code', label: 'Lập trình', icon: '💻' },
  { id: 'skill', label: 'Kỹ năng nghề', icon: '📊' },
  { id: 'language', label: 'Ngoại ngữ', icon: '🌍' }
];

const studyGroups = [
  {
    id: 1,
    category: 'thpt',
    title: 'Toán 12 - Chuyên đề THPT QG 2025',
    goal: 'Mục tiêu: Điểm 9+ môn Toán',
    members: 2847,
    vip: true,
    schedule: 'Thứ 2, 4, 6 - 20:00',
    leader: { name: 'Thầy Minh Tuấn', title: 'Giáo viên Toán', avatar: 'MT' },
    color: 'from-mongodb-green-500 to-mongodb-green-600'
  },
  {
    id: 2,
    category: 'ielts',
    title: 'IELTS 7.5+ Speaking & Writing',
    goal: 'Lộ trình 3 tháng đạt 7.5 Overall',
    members: 1923,
    vip: true,
    schedule: 'Thứ 3, 5, 7 - 19:30',
    leader: { name: 'Ms. Linda', title: 'IELTS 8.5', avatar: 'LN' },
    color: 'from-mongodb-blue to-mongodb-green-500'
  },
  {
    id: 3,
    category: 'code',
    title: 'Web Development 2025 - Full Stack',
    goal: 'Xây dựng dự án thực tế từ A-Z',
    members: 3156,
    vip: false,
    schedule: 'Thứ 2, 4, 6 - 21:00',
    leader: { name: 'Anh Khoa', title: 'Senior Dev', avatar: 'KH' },
    color: 'from-mongodb-purple to-mongodb-blue'
  },
  {
    id: 4,
    category: 'skill',
    title: 'Digital Marketing Thực Chiến',
    goal: 'Case study thực tế & Tạo portfolio',
    members: 1654,
    vip: false,
    schedule: 'Thứ 3, 5 - 20:00',
    leader: { name: 'Chị Lan', title: 'Marketing Manager', avatar: 'LA' },
    color: 'from-mongodb-yellow to-mongodb-orange'
  }
];

export function StudyGroupsSection() {
  const [activeCategory, setActiveCategory] = useState('thpt');
  
  const filteredGroups = studyGroups.filter(group => group.category === activeCategory);

  return (
    <section id="study-groups" className="py-20 lg:py-32 bg-gradient-to-b from-mongodb-blue/10 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-mongodb-green-500 via-mongodb-green-600 to-mongodb-yellow bg-clip-text ">
              Kết Nối Để Học Cùng Nhau
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-mongodb-green-500 to-transparent rounded-full" />
          </h2>
          <p className="text-lg text-mongodb-slate-600 max-w-2xl mx-auto mt-6">
            Chọn mục tiêu, chọn nhóm, bắt đầu ngay! Gợi ý nhóm phù hợp với bạn bằng AI
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-3 rounded-2xl font-bold transition-all duration-400 flex items-center gap-2 overflow-hidden ${
                activeCategory === cat.id
                  ? 'text-mongodb-green-600 border-2 border-mongodb-green-500 shadow-lg shadow-mongodb-green-500/20 -translate-y-1'
                  : 'text-mongodb-slate-700 border-2 border-mongodb-slate-200 hover:border-mongodb-green-300'
              }`}
            >
              <span className={`absolute inset-0 bg-gradient-to-br from-mongodb-green-50 to-mongodb-green-100/50 transition-all duration-400 ${
                activeCategory === cat.id ? 'translate-x-0' : '-translate-x-full'
              }`} />
              <span className="relative text-xl">{cat.icon}</span>
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredGroups.map((group, index) => (
            <div
              key={group.id}
              className="group relative bg-white rounded-3xl overflow-hidden border-2 border-mongodb-slate-200 hover:border-mongodb-green-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-mongodb-green-500/15"
              style={{ animation: `fadeInUp 0.5s ease ${index * 0.1}s backwards` }}
            >
              {/* Header with gradient */}
              <div className={`relative p-8 bg-gradient-to-br ${group.color} overflow-hidden`}>
                {/* Animated overlay */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
                </div>

                {/* Meta info */}
                <div className="relative flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Users className="w-5 h-5" />
                    {group.members.toLocaleString()} thành viên
                  </div>
                  {group.vip && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-mongodb-yellow text-mongodb-black rounded-full text-sm font-bold shadow-lg animate-pulse">
                      <Crown className="w-4 h-4" />
                      VIP
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-bold text-white mb-2">
                  {group.title}
                </h3>
                <p className="relative text-white/90 text-lg">
                  {group.goal}
                </p>
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Schedule */}
                <div className="flex items-center gap-2 mb-6 text-mongodb-slate-600 font-medium">
                  <Calendar className="w-5 h-5 text-mongodb-green-600" />
                  {group.schedule}
                </div>

                {/* Leader */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-mongodb-green-50 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mongodb-green-500 to-mongodb-blue flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {group.leader.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-mongodb-black">{group.leader.name}</h5>
                    <p className="text-sm text-mongodb-slate-600">{group.leader.title}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-green-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-mongodb-green-500/30 transition-all duration-300 hover:-translate-y-1">
                  Tham gia ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-10 py-4 font-bold text-mongodb-green-600 border-2 border-mongodb-green-500 rounded-xl hover:bg-mongodb-green-50 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            Xem tất cả {studyGroups.length} nhóm học →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// =================


import { Flame, Trophy, Mail, Phone, MapPin, ChevronRight, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

// Progress Section
export function ProgressSection() {
  const stats = [
    { icon: Flame, number: '7', label: 'Ngày học liên tiếp', color: 'from-mongodb-orange to-mongodb-yellow' },
    { icon: Trophy, number: '15', label: 'Huy hiệu đạt được', color: 'from-mongodb-yellow to-mongodb-green-500' },
    { icon: TrendingUp, number: '#3', label: 'Xếp hạng nhóm', color: 'from-mongodb-green-500 to-mongodb-blue' },
    { icon: Star, number: '2,450', label: 'Điểm chăm học', color: 'from-mongodb-blue to-mongodb-purple' }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-mongodb-green-50 to-mongodb-green-100/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-yellow bg-clip-text ">
            Mốc Tiến Độ & Thành Tích
          </h2>
          <p className="text-lg text-mongodb-slate-600">
            Theo dõi tiến độ cá nhân và nhóm, thi đua cùng bạn bè
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 text-center border-2 border-mongodb-slate-200 hover:border-mongodb-green-400 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-mongodb-green-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mongodb-green-50 to-mongodb-green-100/50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  
                  <div className={`text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text `}>
                    {stat.number}
                  </div>
                  
                  <div className="text-mongodb-slate-600 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
export function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Nhờ có Hoccungban, em đã thi đậu đại học với điểm số cao hơn mong đợi. Học nhóm giúp em có động lực và không bỏ cuộc.',
      author: 'Nguyễn Minh Anh',
      role: 'Sinh viên ĐH Bách Khoa',
      avatar: 'MA',
      before: '650',
      after: '920',
      subject: 'TOEIC'
    },
    {
      text: 'Từ một người 0 kinh nghiệm lập trình, sau 6 tháng học cùng nhóm, mình đã làm được dự án thực tế và có công việc đầu tiên.',
      author: 'Trần Văn Bình',
      role: 'Junior Developer',
      avatar: 'TB',
      before: '5.5',
      after: '7.5',
      subject: 'IELTS'
    },
    {
      text: 'Study group giúp mình kỷ luật hơn rất nhiều. Có người nhắc, có bạn cùng tiến, học không còn cô đơn nữa!',
      author: 'Lê Thị Cẩm',
      role: 'Học sinh lớp 12',
      avatar: 'LC',
      before: '6.0',
      after: '8.5',
      subject: 'Toán'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-mongodb-yellow/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-yellow bg-clip-text ">
            Câu Chuyện Thành Công
          </h2>
          <p className="text-lg text-mongodb-slate-600">
            Hàng nghìn học viên đã thay đổi cuộc đời nhờ học nhóm
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border-2 border-mongodb-slate-200 hover:border-mongodb-green-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-mongodb-green-500/15"
            >
              <div className="absolute top-6 left-6 text-8xl text-mongodb-green-500/10 font-serif leading-none">"</div>
              
              <div className="relative z-10">
                <p className="text-mongodb-slate-700 italic mb-6 leading-relaxed">
                  {item.text}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mongodb-green-500 to-mongodb-blue flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-mongodb-black">{item.author}</h5>
                    <p className="text-sm text-mongodb-slate-600">{item.role}</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <div className="text-center px-4 py-3 bg-mongodb-green-50 rounded-xl flex-1">
                    <div className="text-2xl font-black text-mongodb-slate-500">{item.before}</div>
                    <div className="text-xs text-mongodb-slate-600 font-semibold">Trước</div>
                  </div>
                  <div className="text-center px-4 py-3 bg-mongodb-green-100 rounded-xl flex-1">
                    <div className="text-2xl font-black text-mongodb-green-600">{item.after}</div>
                    <div className="text-xs text-mongodb-slate-600 font-semibold">Sau</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-mongodb-yellow/20 via-mongodb-yellow/30 to-mongodb-orange/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mongodb-yellow/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-mongodb-green-500 to-mongodb-yellow bg-clip-text ">
          Sẵn Sàng Bắt Đầu Hành Trình?
        </h2>
        <p className="text-xl text-mongodb-slate-700 mb-10 max-w-2xl mx-auto font-medium">
          Tham gia cộng đồng 250,000+ học viên đang học tập và tiến bộ mỗi ngày
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-10 py-5 font-bold text-white bg-gradient-to-r from-mongodb-green-500 to-mongodb-green-600 rounded-xl shadow-2xl shadow-mongodb-green-500/30 hover:shadow-2xl hover:shadow-mongodb-green-500/50 hover:-translate-y-1 transition-all duration-400 text-lg overflow-hidden">
            <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-600" />
            <span className="relative">Tham gia miễn phí ngay</span>
          </button>

          <button className="px-10 py-5 font-bold text-mongodb-green-600 border-2 border-mongodb-green-500 bg-white rounded-xl hover:bg-mongodb-green-50 hover:-translate-y-1 transition-all duration-300 text-lg shadow-lg">
            Xem demo hệ thống
          </button>
        </div>
      </div>
    </section>
  );
}

// Contact Section
export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-b from-white to-mongodb-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-yellow bg-clip-text ">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-lg text-mongodb-slate-600">
            Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 border-2 border-mongodb-slate-200 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-mongodb-black">Gửi tin nhắn</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-4 py-3 border-2 border-mongodb-slate-200 rounded-xl focus:border-mongodb-green-500 focus:outline-none focus:ring-4 focus:ring-mongodb-green-500/10 transition-all bg-mongodb-slate-50"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border-2 border-mongodb-slate-200 rounded-xl focus:border-mongodb-green-500 focus:outline-none focus:ring-4 focus:ring-mongodb-green-500/10 transition-all bg-mongodb-slate-50"
              />
              <textarea
                rows={5}
                placeholder="Nội dung tin nhắn"
                className="w-full px-4 py-3 border-2 border-mongodb-slate-200 rounded-xl focus:border-mongodb-green-500 focus:outline-none focus:ring-4 focus:ring-mongodb-green-500/10 transition-all bg-mongodb-slate-50"
              />
              <button className="w-full py-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-green-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-mongodb-green-500/30 transition-all duration-300 hover:-translate-y-1">
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-mongodb-green-50 to-mongodb-green-100/50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-mongodb-black">Thông tin liên hệ</h3>
              
              {[
                { icon: Mail, title: 'Email', content: 'contact@hoccungban.vn', href: 'mailto:contact@hoccungban.vn' },
                { icon: Phone, title: 'Điện thoại', content: '+84 123 456 789', href: 'tel:+84123456789' },
                { icon: MapPin, title: 'Địa chỉ', content: 'Tầng 10, Tòa nhà ABC, 123 Nguyễn Huệ, Q1, TP.HCM' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl mb-4 hover:shadow-lg hover:-translate-x-2 transition-all duration-300"
                  >
                    <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-mongodb-green-500 to-mongodb-green-600 rounded-xl text-white">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h5 className="font-bold text-mongodb-black mb-1">{item.title}</h5>
                      {item.href ? (
                        <a href={item.href} className="text-mongodb-slate-600 hover:text-mongodb-green-600">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-mongodb-slate-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-mongodb-black to-mongodb-slate-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 text-2xl font-black mb-6">
              <GraduationCap className="w-8 h-8 text-mongodb-green-500" />
              <span className="bg-gradient-to-r from-mongodb-green-400 to-mongodb-yellow bg-clip-text ">
                Hoccungban
              </span>
            </a>
            <p className="text-mongodb-slate-300 mb-6 leading-relaxed">
              Nền tảng học tập trực tuyến hàng đầu Việt Nam, kết nối hàng nghìn học viên với các khóa học chất lượng cao.
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                { icon: Youtube, href: '#', color: 'hover:bg-red-600' },
                { icon: Linkedin, href: '#', color: 'hover:bg-blue-700' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 flex items-center justify-center bg-mongodb-slate-800 rounded-lg ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          {[
            {
              title: 'Liên kết nhanh',
              links: ['Trang chủ', 'Nhóm học tập', 'Khóa học', 'Blog', 'Sự kiện']
            },
            {
              title: 'Về chúng tôi',
              links: ['Giới thiệu', 'Đội ngũ', 'Tuyển dụng', 'Liên hệ']
            },
            {
              title: 'Danh Mục',
              links: ['Luyện thi THPT', 'IELTS - TOEIC', 'Lập trình', 'Kỹ năng nghề']
            }
          ].map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-mongodb-yellow to-mongodb-orange bg-clip-text ">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="flex items-center gap-2 text-mongodb-slate-300 hover:text-mongodb-green-400 hover:translate-x-1 transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-mongodb-slate-800 pt-8 text-center">
          <p className="text-mongodb-slate-400">
            © {currentYear} <span className="text-mongodb-green-400 font-semibold">Hoccungban</span> - Cùng bạn học, cùng bạn tạo nên tương lai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}




// ------

import { Brain, Route, X, Check, School, Building, Handshake, Lightbulb } from 'lucide-react';

// AI Study Section
export function AIStudySection() {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI Giải Đáp Tức Thì',
      description: 'Hỏi bất kỳ câu hỏi nào về bài học, AI sẽ giải thích chi tiết và dễ hiểu trong vài giây',
      items: [
        'Giải thích từng bước chi tiết',
        'Ví dụ minh họa cụ thể',
        'Hỗ trợ đa ngôn ngữ'
      ]
    },
    {
      icon: Route,
      title: 'Lộ Trình Học Cá Nhân Hóa',
      description: 'AI phân tích khả năng của bạn và đề xuất lộ trình học phù hợp nhất',
      items: [
        'Đánh giá năng lực đầu vào',
        'Lộ trình tối ưu cho mục tiêu',
        'Điều chỉnh linh hoạt theo tiến độ'
      ]
    }
  ];

  return (
    <section id="ai-study" className="py-20 lg:py-32 bg-gradient-to-br from-mongodb-green-50 via-mongodb-green-100/30 to-mongodb-blue/10 relative overflow-hidden">
      {/* Animated overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mongodb-green-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mongodb-blue rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-blue bg-clip-text ">
            Học Cùng AI - Trợ Lý Thông Minh 24/7
          </h2>
          <p className="text-lg text-mongodb-slate-600 max-w-2xl mx-auto">
            Công nghệ AI tiên tiến giúp bạn học nhanh hơn, hiệu quả hơn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-10 border-2 border-transparent hover:border-mongodb-green-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-mongodb-green-500/20 overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-mongodb-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mongodb-green-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-br from-mongodb-green-500 to-mongodb-green-600 text-white shadow-2xl shadow-mongodb-green-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-mongodb-black mb-4 text-center group-hover:text-mongodb-green-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-mongodb-slate-600 text-center mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Items */}
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-mongodb-slate-700">
                        <CheckCircle className="w-5 h-5 text-mongodb-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// USP Comparison Section
export function USPSection() {
  const comparisons = [
    { feature: 'Học nhóm với bạn bè', competitor: false, us: true },
    { feature: 'AI hỗ trợ 24/7', competitor: false, us: true },
    { feature: 'Tạo động lực học tập', competitor: 'Theo dõi cá nhân', us: 'Thi đua nhóm + Gamification' },
    { feature: 'Tài liệu học tập', competitor: 'Nội dung cố định', us: 'Cập nhật liên tục + AI' },
    { feature: 'Giáo án cho giáo viên', competitor: false, us: true },
    { feature: 'Giải pháp B2B', competitor: 'Hạn chế', us: 'LMS riêng + License doanh nghiệp' }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-mongodb-yellow/10 via-mongodb-yellow/20 to-mongodb-orange/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-mongodb-green-500 to-mongodb-yellow bg-clip-text ">
            Tại Sao Chọn Hoccungban?
          </h2>
          <p className="text-lg text-mongodb-slate-600 max-w-2xl mx-auto">
            So sánh với các nền tảng học tập khác trên thị trường
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-mongodb-slate-200">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-mongodb-green-500 to-mongodb-green-600 text-white font-bold text-lg">
            <div>Tính Năng</div>
            <div className="text-center">Nền Tảng Khác</div>
            <div className="text-center">Hoccungban</div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 items-center border-b border-mongodb-slate-200 hover:bg-mongodb-green-50/50 transition-colors last:border-b-0"
            >
              {/* Feature */}
              <div className="font-bold text-mongodb-slate-700">{row.feature}</div>

              {/* Competitor */}
              <div className="text-center">
                {typeof row.competitor === 'boolean' ? (
                  row.competitor ? (
                    <Check className="w-6 h-6 text-mongodb-green-600 mx-auto" />
                  ) : (
                    <X className="w-6 h-6 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-mongodb-slate-600">{row.competitor}</span>
                )}
              </div>

              {/* Us */}
              <div className="text-center">
                {typeof row.us === 'boolean' ? (
                  <Check className="w-6 h-6 text-mongodb-green-600 mx-auto" />
                ) : (
                  <span className="font-bold text-mongodb-green-600">{row.us}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// B2B Section
export function B2BSection() {
  const solutions = [
    {
      icon: School,
      title: 'Giải Pháp Cho Trường Học',
      description: 'Hệ thống LMS riêng biệt với đầy đủ tính năng quản lý học sinh, giáo viên và nội dung học tập',
      features: [
        'LMS riêng với tên miền trường',
        'Quản lý học sinh & giáo viên',
        'Tùy chỉnh nội dung theo chương trình',
        'Báo cáo chi tiết cho phụ huynh',
        'License theo năm học',
        'Hỗ trợ kỹ thuật 24/7'
      ],
      buttonIcon: Phone,
      buttonText: 'Liên hệ tư vấn'
    },
    {
      icon: Building,
      title: 'Giải Pháp Cho Doanh Nghiệp',
      description: 'Lộ trình đào tạo nhân viên chuyên nghiệp với nội dung tùy chỉnh theo ngành nghề',
      features: [
        'Lộ trình đào tạo theo yêu cầu',
        'Quản lý tiến độ nhân viên',
        'Chứng chỉ hoàn thành khóa học',
        'Đánh giá năng lực định kỳ',
        'Giá ưu đãi cho doanh nghiệp',
        'Doanh thu ổn định & dài hạn'
      ],
      buttonIcon: Handshake,
      buttonText: 'Đặt lịch demo'
    }
  ];

  return (
    <section id="b2b" className="py-20 lg:py-32 bg-gradient-to-br from-mongodb-black via-mongodb-slate-900 to-mongodb-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mongodb-green-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mongodb-yellow rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 text-white">
            Giải Pháp B2B - Dành Cho Tổ Chức
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Nâng cao năng lực đào tạo cho trường học & doanh nghiệp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const ButtonIcon = solution.buttonIcon;
            
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-br from-mongodb-yellow to-mongodb-orange text-white shadow-2xl shadow-mongodb-yellow/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-center mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/90 border-b border-white/10 pb-3 last:border-b-0">
                        <CheckCircle className="w-5 h-5 text-mongodb-yellow flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-mongodb-yellow to-mongodb-orange text-mongodb-black font-bold rounded-xl hover:shadow-xl hover:shadow-mongodb-yellow/30 transition-all duration-300 hover:-translate-y-1">
                    <ButtonIcon className="w-5 h-5" />
                    {solution.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Note */}
        <div className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-mongodb-yellow" />
            <h4 className="text-xl font-bold text-mongodb-yellow">
              Doanh Thu Lớn & Ổn Định
            </h4>
          </div>
          <p className="text-white/90 text-lg leading-relaxed">
            Mô hình B2B mang lại doanh thu lớn, ổn định và lâu dài với hợp đồng theo năm. 
            Trường học và doanh nghiệp cam kết sử dụng dài hạn, tạo nguồn thu bền vững cho nền tảng.
          </p>
        </div>
      </div>
    </section>
  );
}