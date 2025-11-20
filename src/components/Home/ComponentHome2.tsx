'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Rocket, Plus, Globe, Code, Calculator, Briefcase, ArrowRight } from 'lucide-react';
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
      <div className="absolute inset-0  bg-white" />
      
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

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left lg:col-span-3">
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
          <div className="relative animate-slide-in-right ml-12 lg:col-span-2">
            <div className="floating">
              <div className="relative rounded-3xl overflow-hidden ">
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
    <section 
        style={{
            backgroundImage: "url('/backgroud2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
        id="features" 
        className="py-12 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 relative inline-block">
            <span className="">
              Hệ Thống Học Tập Toàn Diện
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-mongodb-green-500 to-transparent rounded-full" />
          </h2>
          <p className="text-lg text-mongodb-slate-600 max-w-2xl mx-auto mt-6">
            Tất cả những gì bạn cần để học tập hiệu quả và đạt mục tiêu
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-stretch">
        {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);

            return (
            <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-index={index}
                className={`
                group relative rounded-3xl p-8 overflow-hidden
                bg-white/90 backdrop-blur-sm
                border border-slate-200/60
                shadow-lg shadow-slate-200/30
                transition-all duration-300
                hover:-translate-y-3 hover:shadow-2xl
                hover:bg-white card-mogo
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 120}ms` }}
            >

                {/* Border Gradient Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl`} />
                </div>

                {/* Card Content */}
                <div className="relative z-10">

                {/* Icon */}
                <div className={`
                    w-20 h-20 mx-auto mb-6 flex items-center justify-center
                    rounded-2xl text-white shadow-lg
                    bg-gradient-to-br ${feature.gradient}
                    transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-slate-500/30 text-green-700
                `}>
                    <Icon className="w-10 h-10 text-slate-900" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-center transition-colors">
                    {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-center mb-6 leading-relaxed">
                    {feature.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                    <li 
                        key={i} 
                        className="flex items-center gap-2 text-slate-700"
                    >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
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

import { Calendar } from 'lucide-react';

const categories = [
  { id: 'thpt', label: 'Luyện thi THPT', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'ielts', label: 'IELTS - TOEIC', icon: <Globe className="w-5 h-5" /> },
  { id: 'web', label: 'Lập trình Web/App', icon: <Code className="w-5 h-5" /> },
  { id: 'math', label: 'Toán - Lý - Hóa', icon: <Calculator className="w-5 h-5" /> },
  { id: 'skills', label: 'Kỹ năng nghề', icon: <Briefcase className="w-5 h-5" /> },
];

const studyGroups = [
  {
    id: 1,
    category: 'thpt',
    title: 'Nhóm Luyện Thi THPT 2025',
    goal: 'Mục tiêu: 8+ điểm mỗi môn',
    members: 45,
    schedule: 'Lịch học: 20h - T2-T4-T6',
    leader: { name: 'Mentor Thảo', title: 'Cựu sinh viên ĐH Sư Phạm', avatar: 'MT' },
    vip: true,
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 2,
    category: 'thpt',
    title: 'IELTS Speaking Club',
    goal: 'Mục tiêu: IELTS 6.5 sau 60 ngày',
    members: 32,
    schedule: 'Lịch học: 19h - T3-T5-CN',
    leader: { name: 'Ban An Nguyễn', title: 'IELTS 8.0, ĐH Ngoại Thương', avatar: 'AN' },
    vip: false,
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 3,
    category: 'thpt',
    title: 'Web Developer Squad',
    goal: 'Xây dựng 5 dự án thực tế',
    members: 28,
    schedule: 'Lịch học: 21h - T2-T6',
    leader: { name: 'Tech Leader Dũng', title: 'Senior Developer tại FPT', avatar: 'TD' },
    vip: true,
    color: 'from-blue-400 to-blue-500'
  },
];


export function StudyGroupsSection() {
  const [activeCategory, setActiveCategory] = useState('thpt');
  
  const filteredGroups = studyGroups.filter(group => group.category === activeCategory);

  return (
    <section id="study-groups" className="py-20 lg:py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Kết Nối Để Học Cùng Nhau
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Chọn mục tiêu, chọn nhóm, bắt đầu ngay! Gợi ý nhóm phù hợp với bạn bằng AI
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-slate-900 hover:bg-gray-50'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGroups.map((group, index) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className={`relative p-6 bg-slate-900 ${group.color}`}>
                {/* Meta info */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Users className="w-4 h-4" />
                    {group.members} thành viên
                  </div>
                  {group.vip && (
                    <div className="px-3 py-1 bg-green-200 text-slate-800 rounded-full text-xs font-bold">
                      VIP
                    </div>
                  )}
                  {!group.vip && (
                    <div className="px-3 py-1 bg-green-200 text-slate-800 rounded-full text-xs font-bold">
                      MIỄN PHÍ
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {group.title}
                </h3>
                <p className="text-white/95 text-sm">
                  {group.goal}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Schedule */}
                <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  {group.schedule}
                </div>

                {/* Leader */}
                <div className="flex items-center gap-3 pb-6 border-b border-gray-200 pb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-sm">
                    {group.leader.avatar}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm">{group.leader.name}</h5>
                    <p className="text-xs text-gray-500">{group.leader.title}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-3.5 text-slate-900 font-semibold rounded-xl hover:text-green-900 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
                  Tham gia ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 font-medium text-slate-600 border-2 border-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200">
            Xem tất cả {studyGroups.length} nhóm học →
          </button>
        </div>
      </div>
    </section>
  );
}

// =================


import { Flame, Trophy, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, ChevronRight } from 'lucide-react';


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
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Câu Chuyện Thành Công
          </h2>
          <p className="text-lg text-gray-600">
            Hàng nghìn học viên đã thay đổi cuộc đời nhờ học nhóm
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-6xl text-slate-100 font-serif leading-none">"</div>
                
                <p className="indent-6 text-gray-700 mb-6 leading-relaxed relative">
                  {item.text}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                    {item.avatar}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{item.author}</h5>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-center px-4 py-3 bg-gray-100 rounded-lg flex-1">
                    <div className="text-xl font-bold text-gray-600">{item.before}</div>
                    <div className="text-xs text-gray-500 font-medium">Trước</div>
                  </div>
                  <div className="text-center px-4 py-3 bg-slate-50 rounded-lg flex-1">
                    <div className="text-xl font-bold text-slate-600">{item.after}</div>
                    <div className="text-xs text-gray-600 font-medium">Sau</div>
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
    <section className="py-20 lg:py-32 bg-[#F9EBFF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
          Sẵn Sàng Bắt Đầu Hành Trình?
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Tham gia cộng đồng 250,000+ học viên đang học tập và tiến bộ mỗi ngày
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 btn-mogo">
            Tham gia miễn phí ngay
          </button>

          <button className="px-10 py-4 btn-mogo">
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
    <section id="contact" className="bg-[#F9EBFF]">
      <div className="container mx-auto px-4 border-t border-gray-800 py-20 lg:py-32 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600">
            Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm card-mogo">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Gửi tin nhắn</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all"
              />
              <textarea
                rows={5}
                placeholder="Nội dung tin nhắn"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all"
              />
              <button className="w-full py-3 btn-mogo">
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 card-mogo">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Thông tin liên hệ</h3>
              
              {[
                { icon: Mail, title: 'Email', content: 'contact@hoccungban.vn', href: 'mailto:contact@hoccungban.vn' },
                { icon: Phone, title: 'Điện thoại', content: '+84 123 456 789', href: 'tel:+84123456789' },
                { icon: MapPin, title: 'Địa chỉ', content: 'Tầng 10, Tòa nhà ABC, 123 Nguyễn Huệ, Q1, TP.HCM' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg mb-4 last:mb-0 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-500 rounded-lg text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                      {item.href ? (
                        <a href={item.href} className="text-gray-600 hover:text-slate-600 text-sm">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 text-sm">{item.content}</p>
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
    <footer className="bg-slate-900 text-white pt-20 pb-8">
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

import { Brain, Route, Check, X, School, Building, Handshake, Lightbulb } from 'lucide-react';

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
    <section 
        id="ai-study" 
        // className="bg-white"
        // style={{
        //     backgroundImage: "url('/background.svg')",
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat"
        // }}
    >
      <div className="container mx-auto px-4 max-w-7xl  py-20 lg:py-32" >
        <div className="text-center mb-16 ">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Học Cùng AI - Trợ Lý Thông Minh 24/7
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Công nghệ AI tiên tiến giúp bạn học nhanh hơn, hiệu quả hơn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl bg-slate-500 text-white">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Items */}
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
    <section className="py-20 lg:py-32 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Tại Sao Chọn Hoccungban?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            So sánh với các nền tảng học tập khác trên thị trường
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-slate-600 text-white font-semibold">
            <div>Tính Năng</div>
            <div className="text-center">Nền Tảng Khác</div>
            <div className="text-center">Hoccungban</div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 items-center border-b border-gray-200 hover:bg-gray-50 transition-colors last:border-b-0"
            >
              {/* Feature */}
              <div className="font-semibold text-gray-900">{row.feature}</div>

              {/* Competitor */}
              <div className="text-center">
                {typeof row.competitor === 'boolean' ? (
                  row.competitor ? (
                    <Check className="w-6 h-6 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-6 h-6 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-gray-600 text-sm">{row.competitor}</span>
                )}
              </div>

              {/* Us */}
              <div className="text-center">
                {typeof row.us === 'boolean' ? (
                  <Check className="w-6 h-6 text-slate-600 mx-auto" />
                ) : (
                  <span className="font-semibold text-slate-600 text-sm">{row.us}</span>
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
    <section 
        style={{
            backgroundImage: "url('/background-shape.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
        id="b2b" 
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Giải Pháp B2B - Dành Cho Tổ Chức
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 card-mogo"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl bg-slate-500 text-white">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 pb-3 border-b border-gray-100 last:border-b-0">
                      <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full flex items-center justify-center btn-mogo">
                  <ButtonIcon className="w-5 h-5 inline-block" />
                  <div className='inline-block ml-2'>
                  {solution.buttonText}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}