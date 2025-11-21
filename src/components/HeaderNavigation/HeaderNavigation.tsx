'use client'
import { path } from "@/constants/paths";
import Popover from "../Popover/Popover";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { logout, setProfile } from "@/stores/reducers/sharedReducer";
import { forwardRef, useEffect, useState } from "react";
import { BadgeCent, Bell, Flame, Moon, Sun, ChevronDown } from "lucide-react";
import userapi from "@/apis/user.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimatedNumber from "../AnimatedNumber";
import RiveWrapper from '@/components/Animation/RiveWrapper';

interface HeaderNavigationProps {
  title?: string;
}

const HeaderNavigation = forwardRef<HTMLDivElement, HeaderNavigationProps>((props, ref) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const loginreduce = useAppSelector((state: any) => state.root.isLogin);
  const myCoin = useAppSelector((state: any) => state.root.myCoin);
  const profile = useAppSelector((state: any) => state.root.profile);

  const handleLogin = () => {
    router.push(`/auth/login`);
  };

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("access_token"));
  }, [loginreduce]);

  const fetchProfile = async () => {
    try {
      const userRes = await userapi.getProfile();
      if (userRes.status === 200) {
        dispatch(setProfile(userRes.data.data));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    // fetchProfile();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('profile');
    setIsLogin(false);
    handleLogin();
  };

  // Dropdown menu data
  const dropdownMenus = {
    courses: [
      { title: 'Khóa học IELTS', href: `${path.courses}/ielts` },
      { title: 'Khóa học TOEIC', href: `${path.courses}/toeic` },
      { title: 'Khóa học giao tiếp', href: `${path.courses}/speaking` },
      { title: 'Tất cả khóa học', href: path.courses }
    ],
    vocabulary: [
      { title: 'Từ vựng theo chủ đề', href: `${path.vocabulary}` },
      { title: 'Từ vựng của tôi', href: `${path.vocabulary}/my-vocabulary` },
      { title: 'Ôn tập ngay', href: `${path.vocabulary}/pratice` }
    ],
    tests: [
      { title: 'Bài kiểm tra ngữ pháp', href: `${path.tests}/grammar` },
      { title: 'Bài kiểm tra từ vựng', href: `${path.tests}/vocabulary` },
      { title: 'Bài kiểm tra tổng hợp', href: `${path.tests}/comprehensive` },
      { title: 'Tất cả bài test', href: path.tests }
    ]
  };

  return (
    <>
      <header className="bg-slate-900 shadow-sm border-b border-gray-200 sticky top-0 z-[50]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <RiveWrapper
                src="/juli-logo.riv"
                autoplay
                style={{ width: 40, height: 40, background: "transparent" }}
              />
              {/* <img src="/logo2.jpg" alt="" className="w-40 h-auto object-contain"/> */}
              <Link
                className="text-2xl font-bold text-gray-100 cursor-pointer"
                href={path.home}
              >
                Học Cùng Bạn
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6 text-slate-50">
              {/* Khóa học - Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('courses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors duration-200">
                  <span>Khóa học</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'courses' ? 'rotate-180' : ''}`} />
                </div>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'courses' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  {dropdownMenus.courses.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Từ vựng - Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('vocabulary')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors duration-200">
                  <span>Từ vựng</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'vocabulary' ? 'rotate-180' : ''}`} />
                </div>
                
                <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'vocabulary' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  {dropdownMenus.vocabulary.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bài Kiểm tra - Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('tests')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors duration-200">
                  <span>Bài Kiểm tra</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'tests' ? 'rotate-180' : ''}`} />
                </div>
                
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                  activeDropdown === 'tests' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  {dropdownMenus.tests.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nói theo - No dropdown */}
              <Link
                className="cursor-pointer hover:text-green-600 transition-colors duration-200"
                href={`${path.shadowingpage}`}
              >
                Nói theo
              </Link>

              {/* Âm nhạc - No dropdown */}
              <Link
                className="cursor-pointer hover:text-green-600 transition-colors duration-200"
                href={`${path.lofichill}`}
              >
                Âm nhạc
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Moon className="hidden w-5 h-5 text-gray-500 cursor-pointer" />
              <Sun className="w-5 h-5 text-gray-500 cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" />

              <div className="flex justify-center items-center p-2 bg-gray-200 rounded-md">
                <div className="p-0 flex bg-gray-200">
                  <div className="spinningasset ticket2 is-sm">
                    <div className="flex items-center justify-center relative" ref={ref}>
                      <div className=""></div>
                      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                      <em></em><em></em>
                      <div></div>
                    </div>
                  </div>
                  {profile && <AnimatedNumber value={profile.totalScore} />}
                </div>
              </div>

              <Flame className="w-6 h-6 text-orange-500 cursor-pointer hover:text-orange-600 transition-colors duration-200" />

              <div className="flex items-center space-x-3">
                {!isLogin && (
                  <span
                    className="cursor-pointer hover:text-gray-300 text-sm text-gray-100 transition-colors duration-200"
                    onClick={() => handleLogin()}
                  >
                    Đăng nhập
                  </span>
                )}

                <Popover
                  offsetInput={10}
                  className="z-50"
                  renderPopover={
                    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md z-50'>
                      <Link
                        href={""}
                        className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 text-gray-600 transition-colors duration-200'
                      >
                        My account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 text-gray-600 transition-colors duration-200'
                      >
                        Logout
                      </button>
                    </div>
                  }
                >
                  <div className='h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-slate-400 relative hover:ring-2 hover:ring-green-500 transition-all duration-200'>
                    <div className='flex h-full w-full items-center justify-center'>
                      {false ? (
                        <img src={""} alt='avatar' className='h-full w-full object-cover' />
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-5 w-5 text-white'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

export default HeaderNavigation;