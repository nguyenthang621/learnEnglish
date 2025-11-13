import React from 'react';
import { Database, Check, Building2, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer/Footer';




const HeroSection: React.FC = () => {
  return (
    <section className="bg-white pt-16 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:pr-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-[0.9] mb-8">
              <span className=" block text-gray-900">Luyện tiếng anh</span>
              <span className=" block text-green-600 mt-4">mỗi ngày</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
              Nâng cao kỹ năng nghe, nói, viết tiếng Anh của bạn qua các bài tập dictation, shadowing, writing với AI. Lý tưởng cho người học ở mọi trình độ.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Start building
              </button>
              <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                <Play className="h-4 w-4 mr-2 fill-current" />
                Watch demo
              </button>
            </div> */}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-blue-100/20 rounded-3xl"></div>
            <img 
              src="src/assets/banner/banner-shadowing.png"
              alt="" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">30M+</div>
            <div className="text-sm text-gray-500 leading-tight">Global downloads<br />per month</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">135+</div>
            <div className="text-sm text-gray-500 leading-tight">Countries and<br />territories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">170+</div>
            <div className="text-sm text-gray-500 leading-tight">MongoDB<br />Partners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">#1</div>
            <div className="text-sm text-gray-500 leading-tight">Non-relational<br />database</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIVectorSection: React.FC = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Tại Sao Chọn Luyện Tập Tiếng Anh
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Khám phá các tính năng mạnh mẽ giúp việc học tiếng Anh trở nên dễ dàng và hiệu quả
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-500 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto flex items-center justify-center">
                  <Database className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Nâng Cao Kỹ Năng Nghe</div>
              </div>
              <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                NEW
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Nâng Cao Kỹ Năng Nghe</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Rèn luyện đôi tai với giọng đọc của người bản xứ và cải thiện khả năng nghe hiểu tiếng Anh
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Bắt đầu →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-500 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto flex items-center justify-center">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Luyện Nói Tự Nhiên</div>
              </div>
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                POPULAR
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Luyện Nói Tự Nhiên</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Thực hành nói một cách tự nhiên bằng cách shadowing theo phát âm chuẩn bản xứ
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Bắt đầu →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-green-400 to-teal-500 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto flex items-center justify-center">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Luyện từ vựng</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Ghi nhớ từ vựng thông minh</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Ghi nhớ từ vựng thông minh với AI phân tích tiến độ học tập
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Bắt đầu  →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-green-400 to-teal-500 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto flex items-center justify-center">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Luyện viết câu</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Luyện viết câu theo chủ đề</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Luyện viết câu theo chủ đề cùng với AI
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Bắt đầu  →
              </button>
            </div>
          </div>
  
        </div>
      </div>
    </section>
  );
};

const DeveloperSection: React.FC = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Học tiếng anh cùng AI
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Học tiếng Anh và cải thiện khả năng viết với tính năng dịch từng câu được hỗ trợ bởi AI. Hoàn hảo cho người học ở mọi trình độ. Hệ thống học tập thích ứng phát triển theo tiến trình của bạn và cung cấp phản hồi cá nhân hóa. Nhận sửa chữa ngay lập tức và đề xuất để cải thiện bản dịch của bạn.
            </p>
            <button className="text-green-400 hover:text-green-300 font-medium">
              Bắt đầu →
            </button>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm">AI Assistant</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex items-start gap-3 text-gray-300">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src="https://static.intercomassets.com/avatars/766046/square_128/custom_avatar-1588883450.png"
                      alt="AI Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>

                  {/* Chat bubble */}
                  <div>
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-xs shadow">
                      <p className="text-gray-100">Luyện tập tiếng anh cùng AI </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">AI Bot • just now</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const MongoDBAtlasSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Viết tốt hơn mỗi ngày, cùng trợ lý AI
          </h2>
          <p className="text-xl text-gray-600">Không chỉ sửa lỗi, mà còn nâng tầm phong cách viết tiếng Anh của bạn</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Các chức năng nổi bật
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Sửa ngữ pháp và chính tả</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Gợi ý từ vựng, cấu trúc câu tự nhiên.</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Đưa ra bản viết lại để so sánh.</span>
              </div>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Bắt đầu 
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-blue-100/20 rounded-3xl"></div>
            <img 
              src="src/assets/banner/banner-ai.png"
              alt="" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


const FinalCTASection: React.FC = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Choose your path
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Build the next big thing with MongoDB Atlas
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">
              Build the next big thing
            </h3>
            <p className="text-green-100 mb-8 leading-relaxed">
              Join millions of developers building modern applications with MongoDB. Start your free cluster today and see how fast you can innovate.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span>Get started in minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span>Multi-cloud support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span>Built-in security</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span>24/7 support</span>
              </div>
            </div>
            
            <button className="bg-white text-green-600 hover:bg-gray-50 px-8 py-4 rounded-md font-medium transition-colors">
              Start free today
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl p-8 transform -rotate-1 shadow-xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Database className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to start building?</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Create your free MongoDB Atlas cluster and start building today
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-green-600 text-sm">
                    <Check className="h-4 w-4" />
                    <span>Free forever tier</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-green-600 text-sm">
                    <Check className="h-4 w-4" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Home: React.FC = () => {
  return (
    <div className="h-screen">
      <HeroSection />
      <AIVectorSection />
      <DeveloperSection />
      <MongoDBAtlasSection />
      {/* <FinalCTASection /> */}
      <Footer />
    </div>
  );
};

export default Home;