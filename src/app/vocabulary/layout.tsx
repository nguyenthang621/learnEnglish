"use client";
import Footer from "@/components/Footer/Footer";
import HeaderNavigation from "@/components/HeaderNavigation/HeaderNavigation";
import ModalInsertVocabulary from "@/components/Modals/ModalInsertVocabulary-v2";
import Navbar from "@/components/Navbar/Navbar";
import { useAppSelector } from "@/stores/hooks";
import { ReduxProvider } from "@/stores/ReduxProvider";
import { useRef } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(
    (state) => state.root.isLoading
  );
  const isShowModalVocabulary = useAppSelector(
    (state) => state.vocabulary.isShowModalVocabulary
  );
  const isScroll = false

  return (
    <div className="">
     <ReduxProvider>
        
      <div
      ref={isScroll ? scrollRef : undefined}
      className={`relative max-h-[100vh] ${
        isScroll ? "max-h-[100vh] overflow-y-auto no-scrollbar" : ""
      }`}
    >
      {isLoading && <iframe className="absolute top-0 right-0 h-[100vh] mt-[100px]" src="src/components/Loading/Loading.html" width="100%"  />}
      {isShowModalVocabulary && <ModalInsertVocabulary />}
      <div className="">
        <HeaderNavigation ref={coinRef}/>
        <Navbar />
      </div>
      <div className="">
        {children}
      </div>
      <div className=" bottom-0 right-0 left-0">
        <Footer />
      </div>
    </div>
    </ReduxProvider>
    </div>
  );
}

export default AuthLayout;
