const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center font-bold">
                EN
              </div>
              <span className="text-xl font-bold">Học Cùng Bạn</span>
            </div>
            <p className="text-gray-400">
              Nền tảng học tiếng Anh dễ hiểu, hiện đại và phù hợp cho mọi trình độ.
            </p>
          </div>

          {/* COURSES */}
          <div>
            <h4 className="font-semibold mb-4">Khóa học</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Từ vựng theo chủ đề</a></li>
              <li><a href="#" className="hover:text-white">Ngữ pháp cơ bản</a></li>
              <li><a href="#" className="hover:text-white">Luyện nghe</a></li>
              <li><a href="#" className="hover:text-white">Luyện nói</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Flashcards</a></li>
              <li><a href="#" className="hover:text-white">Video bài giảng</a></li>
              <li><a href="#" className="hover:text-white">Bài luyện tập nhanh</a></li>
              <li><a href="#" className="hover:text-white">Blog học tập</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white">Chính sách & Điều khoản</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Học Cùng Bạn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
