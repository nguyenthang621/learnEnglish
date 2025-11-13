'use client'
import { path } from "@/constants/paths";
import Popover from "../Popover/Popover";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { logout, setProfile } from "@/stores/reducers/sharedReducer";
// import { LocalStorage } from "@/utils/localStorage";
import { forwardRef, use, useEffect, useState } from "react";
import { BadgeCent, Bell, Flame, Moon, Sun } from "lucide-react";
import userapi from "@/apis/user.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimatedNumber from "../AnimatedNumber";


interface HeaderNavigationProps {
  title?: string;
}

const HeaderNavigation=forwardRef<HTMLDivElement, HeaderNavigationProps>((props, ref) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false)
  const loginreduce = useAppSelector((state: any) => state.root.isLogin);
  const myCoin = useAppSelector((state: any) => state.root.myCoin);
  const profile = useAppSelector((state: any) => state.root.profile);


  const handleLogin = () => {
    router.push(`/auth/login`);
  };

  useEffect(()=>{
      setIsLogin(!! localStorage.getItem("access_token"))
  },[loginreduce])

  const fetchProfile = async () => {
    try {
      const userRes = await  userapi.getProfile();
      if (userRes.status === 200) {
        dispatch(setProfile(userRes.data.data));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(()=>{
    //  fetchProfile();
  },[])

  const handleLogout = ()=>{
    dispatch(logout());
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    setIsLogin(false)
    handleLogin()
  }

  return (
    <>
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
              <Link
                className="text-2xl font-bold text-blue-600 cursor-pointer"
                href={`${path.home}`}
              >
                Zenlish
              </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
             <Link
                className="cursor-pointer hover:text-blue-600"
                href={`${path.practices}`}
              >
                Exercises
              </Link>
             <Link
                className="cursor-pointer hover:text-blue-600"
                href={`${path.shadowingpage}`}
              >
                Shadowing
              </Link>
             <Link
                className="cursor-pointer hover:text-blue-600"
                href={`${path.vocabulary}`}
              >
                Vocabulary
              </Link>
              <Link
                className="cursor-pointer hover:text-blue-600"
                href={`${path.lofichill}`}
              >
                Music
              </Link>
          
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              {/* <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div> */}
              <Moon className="hidden w-5 h-5 text-gray-500 cursor-pointer"/>
              <Sun className="w-5 h-5 text-gray-500 cursor-pointer"/>
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer"/>

              <div className="flex justify-center items-center p-2 bg-gray-200 rounded-md" >
              {/* <BadgeCent className="w-5 h-5 text-green-500 cursor-pointer"/> */}

                {/*  Card */}
                  <div className=" p-0 flex bg-gray-200">
                    <div className="spinningasset ticket2 is-sm">
                      <div className="flex items-center justify-center relative" ref={ref}>
                        <div className=""></div>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <em></em>
                        <em></em>
                        <div></div>
                      </div>
                    </div>
                    {profile && <AnimatedNumber value={profile.totalScore} />}

                  </div>
                </div>

              <Flame className="w-6 h-6 text-orange-500 cursor-pointer"/>

              {/* Language & User Actions */}
              <div className="flex items-center space-x-3">
                {/* <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-sm">🌐 Eng</span>
                  <ChevronDown className="w-3 h-3" />
                </div> */}
  
                {
                  !isLogin && 
                <span
                  className="cursor-pointer hover:text-blue-600 text-sm"
                  onClick={() => handleLogin()}
                >
                  Đăng nhập
                </span>
                }
                {/* <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Get Started
                </button> */}
                          {/* User */}
                {/* <UserDropdown /> */}
                <Popover
                  offsetInput={10}
                  className="z-50"
                  renderPopover={
                    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md z-50'>
                      <Link
                        href={""}
                        className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 text-gray-600'
                      >
                        My account
                      </Link>
                
                      <button
                        onClick={handleLogout}
                        className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500 text-gray-600'
                      >
                        Logout
                      </button>
                    </div>
                  }
                >
                  <div className='h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-slate-400'>
                    <div className='flex h-full w-full items-center justify-center'>
                      {/* {profile?.avatar ? ( */}
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
})


export default HeaderNavigation