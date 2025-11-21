'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Minimize2, Maximize2, Volume2, Bookmark, User, Languages, BookA } from 'lucide-react';
import { DebounceInput } from 'react-debounce-input';
import RiveWrapper from '@/components/Animation/RiveWrapper';
import vocabularyAPI from '@/apis/vocabulary.api';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setCollections } from '@/stores/reducers/sharedReducer';
import BookmarkButton from './BtnSave';
import { BookmarkCollection } from '../Vocabulary/MyVocabulary';
import { toast } from 'react-toastify';


interface TranslationResponse {
  'source-text': string;
  'destination-text': string;
  pronunciation?: {
    'source-text-audio'?: string;
    'source-text-phonetic'?: string;
    'destination-text-audio'?: string;
  };
  definitions?: Array<{
    'part-of-speech': string;
    definition: string;
    example: string;
    'other-examples'?: string[];
  }>;
  translations?: any;
}

type TabType = 'translate' | 'saved' | 'user';

export default function ExtentionTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ y: 0, startY: 0 });
  const [activeTab, setActiveTab] = useState<TabType>('translate');
  
  // Translation states
  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('vi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState<TranslationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.root.collections);
  
  
  const iconRef = useRef<HTMLButtonElement>(null);
  const lastValueRef = useRef<string>('');
  const composingRef = useRef(false);


  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getBookmarkCollections();
      if (response.data && response.status === 200) {  
        dispatch(setCollections(response.data.data));  
        // setCollections(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Collections:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (collections.length === 0){
      fetchCollections();
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isOpen) {
      setIsDragging(true);
      setDragStart({
        y: e.clientY,
        startY: position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaY = e.clientY - dragStart.y;
        const newY = Math.max(20, Math.min(window.innerHeight - 76, dragStart.startY + deltaY));
        setPosition({ y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleTranslate = async (text: string) => {
    if (!text.trim()) {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_TRANSLATE}/api/translate?sl=${fromLang}&dl=${toLang}&text=${text}`
      );

      if (!response.ok) {
        throw new Error('Không thể dịch từ này');
      }

      const data: TranslationResponse = await response.json();
      setSearchResult(data);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    if (composingRef.current) return;
    if (value === lastValueRef.current) return;
    lastValueRef.current = value;
    handleTranslate(value);
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    const temp = inputText;
    setInputText(searchResult?.['destination-text'] || '');
    if (searchResult) {
      handleTranslate(searchResult['destination-text']);
    }
  };

  const playAudio = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(console.error);
    }
  };

  const getWordTypeColor = (kind: string | undefined): string => {
    if (!kind) return 'bg-gray-100';
    const colors: { [key: string]: string } = {
      'danh từ': 'bg-blue-100 text-blue-800',
      'noun': 'bg-blue-100 text-blue-800',
      'ngoại động từ': 'bg-green-100 text-green-800',
      'verb': 'bg-green-100 text-green-800',
      'tính từ': 'bg-purple-100 text-purple-800',
      'adjective': 'bg-purple-100 text-purple-800',
      'động từ': 'bg-orange-100 text-orange-800',
      'phân từ': 'bg-pink-100 text-pink-800',
    };
    return colors[kind.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const handleClickBookmark = async (collection: BookmarkCollection) => {
    try {
      setLoading(true);
      const payload = {name: collection.name, description: collection.description || "", is_default: true, collection_id: collection.id};
      const response = await vocabularyAPI.updateBookmarkCollections(payload)

      if (response.data && response.status === 200) {
        await fetchCollections();
      }
    } catch (error) {
      console.error('Error updating collection:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddWord = async () => {
    if (!searchResult) return;

    // 1. Word
    const word = searchResult["source-text"];

    // 2. Pronunciation (nếu có)
    const pronunciation = searchResult.pronunciation?.["source-text-phonetic"] || "";

    // 3. Definition tiếng Việt (nghĩa chính)
    const definition_vi =
      searchResult["destination-text"] ||
      searchResult.translations?.["possible-translations"]?.[0] ||
      "";

    // 4. Personal note tùy bạn
    const personal_note = `Tự động thêm từ search API`;

    // 5. Lấy examples từ definitions (nếu có)
    const definitions = searchResult.definitions || [];

    const examples = definitions.slice(0, 2).map((d: any) => ({
      vocabulary_type: 1,
      english_example_sentences: d.example || "",
      vietnamese_translation: "", // Bạn có thể dịch tự động
    }));

    // 6. collection id cố định, hoặc để user chọn
    const collection_id = collections.length > 0 ? collections.find((collection)=> collection.is_default)?.id || 1 : 1;

    try {
      const response = await vocabularyAPI.createVocabulary({
        word,
        pronunciation,
        definition_vi,
        personal_note,
        collection_id,
        examples,
      });
      if (response.data) {
        setInputText('');
        setSearchResult(null);
        toast.success(`Đã thêm từ "${word}" vào bộ sưu tập ${collections.find((collection)=> collection.is_default)?.name}!`);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {/* Floating Icon Button with Hover Popover */}
      {!isOpen && (
        <div
          style={{ top: `${position.y}px` }}
          className="fixed right-0 z-50 flex items-center gap-2 group"
        >
          {/* Hover Popover */}
          <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 whitespace-nowrap">
              <span className="text-sm font-medium">Học Cùng Bạn</span>
              
              {/* Close Button */}
              <button
                onClick={() => {
                  console.log('Close widget');
                }}
                className="w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
              
              {/* Drag Handle */}
              <button
                onMouseDown={handleMouseDown}
                className={`w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <circle cx="4" cy="4" r="1" />
                  <circle cx="4" cy="8" r="1" />
                  <circle cx="4" cy="12" r="1" />
                  <circle cx="8" cy="4" r="1" />
                  <circle cx="8" cy="8" r="1" />
                  <circle cx="8" cy="12" r="1" />
                  <circle cx="12" cy="4" r="1" />
                  <circle cx="12" cy="8" r="1" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Icon Button */}
          <button
            ref={iconRef}
            onClick={(e) => {
              if (!isDragging) {
                setIsOpen(true);
              }
            }}
            className="w-14 h-14 bg-white rounded-l-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border-2 border-gray-100 cursor-pointer"
          >
            <div className="w-11 h-11 bg-gradient-to-br bg-slate-700 rounded-full flex items-center justify-center">
             <img src="/general_content_ebook.svg" alt="" className='w-auto h-5 object-contain bg-white text-white p-0'/>
             {/* <BookA className='w-6 h-6 text-white' /> */}
            </div>
          </button>
        </div>
      )}

      {/* Popup Window */}
      {isOpen && (
        <div
          style={{ top: `${position.y}px` }}
          className={`fixed right-20 z-50 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-[500px] min-h-[650px]'
          }`}
        >
          {/* Header */}
          <div 
            className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r bg-slate-700 rounded-t-2xl ${
            isMinimized ? 'rounded-2xl' : ''
          }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Languages className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Học Cùng Bạn</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title={isMinimized ? 'Phóng to' : 'Thu nhỏ'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-white" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Đóng"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Content - Only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveTab('translate')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'translate'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Languages className="w-4 h-4 inline mr-2" />
                  Dịch
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'saved'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Bookmark className="w-4 h-4 inline mr-2" />
                  Đã lưu
                </button>
                <button
                  onClick={() => setActiveTab('user')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'user'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Người dùng
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1">
                {/* Translate Tab */}
                {activeTab === 'translate' && (
                  <div className="h-[calc(650px-140px)] flex flex-col">
                    {/* Language Selection */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-center gap-3">
                        <select
                          value={fromLang}
                          onChange={(e) => setFromLang(e.target.value)}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">English</option>
                        </select>

                        <button
                          onClick={swapLanguages}
                          className="rounded-full p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                          title="Đổi ngôn ngữ"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </button>

                        <select
                          value={toLang}
                          onChange={(e) => setToLang(e.target.value)}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="vi">Tiếng Việt</option>
                        </select>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-b border-gray-200">
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={500}
                            value={inputText}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onCompositionEnd={(e: any) => {
                            composingRef.current = false;
                            handleInputChange(e.currentTarget.value);
                        }}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                            placeholder={
                            fromLang === "vi"
                                ? "Nhập từ tiếng Việt..."
                                : "Enter English word..."
                            }
                            autoComplete="off"
                        />
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="h-6 w-6 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
                          <span className="ml-3 text-sm text-gray-600">Đang dịch...</span>
                        </div>
                      ) : error ? (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                          {error}
                        </div>
                      ) : searchResult ? (
                        <div className="space-y-4">
                          {/* Main Translation */}
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 shadow-sm">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                  {searchResult['destination-text']}
                                </h3>
                                <div className="flex items-center gap-2">
                                  {searchResult.pronunciation?.['source-text-phonetic'] && (
                                    <span className="text-sm text-blue-600 font-mono">
                                      {searchResult.pronunciation['source-text-phonetic']}
                                    </span>
                                  )}
                                  {searchResult.pronunciation?.['source-text-audio'] && (
                                    <button
                                      onClick={() =>
                                        playAudio(
                                          searchResult.pronunciation!['source-text-audio']!
                                        )
                                      }
                                      className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Definitions */}
                        {searchResult.definitions && searchResult.definitions.length > 0 && (
                        <div className="space-y-6">
                            {searchResult.definitions.map((def, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-emerald-400 pl-5"
                            >
                                {/* Part of speech pill */}
                                <div className="mb-3">
                                {def["part-of-speech"] && (
                                    <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700`}
                                    >
                                    {def["part-of-speech"]}
                                    </span>
                                )}
                                </div>

                                {/* Card outer */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">

                                {/* Definition box */}
                                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-emerald-400">
                                    <p className="text-base text-gray-800 mb-2 leading-relaxed">
                                    <span className="font-semibold text-emerald-700">Definition:</span> {def.definition}
                                    </p>

                                    {def.example && (
                                    <p className="text-sm text-gray-600 italic">
                                        <span className="font-semibold text-emerald-700">Example:</span> {def.example}
                                    </p>
                                    )}
                                </div>

                                {/* Other examples */}
                                {def["other-examples"] && def["other-examples"]?.length > 0 && (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                    <p className="text-xs font-semibold text-emerald-800 mb-2">
                                        More examples:
                                    </p>
                                    <ul className="space-y-1">
                                        {def["other-examples"].map((ex, eidx) => (
                                        <li
                                            key={eidx}
                                            className="text-sm text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: ex }}
                                        />
                                        ))}
                                    </ul>
                                    </div>
                                )}
                                </div>
                            </div>
                            ))}
                        </div>
                        )}


                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-400">
                          <Languages className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-sm">Nhập từ để bắt đầu dịch</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {searchResult && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <BookmarkButton 
                        collections={collections}
                        onSave={handleAddWord}
                        onSelectCollection={handleClickBookmark}
                        isLoading={isLoading}
                        className=""
                      />
                      </div>
                    )}
                  </div>
                )}

                {/* Saved Tab */}
                {activeTab === 'saved' && (
                  <div className="h-[calc(650px-140px)] p-6">
                    <div className="text-center py-12 text-gray-400">
                      <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-sm font-medium mb-2">Chưa có từ nào được lưu</p>
                      <p className="text-xs text-gray-500">Các từ bạn lưu sẽ hiển thị ở đây</p>
                    </div>
                  </div>
                )}

                {/* User Tab */}
                {activeTab === 'user' && (
                  <div className="h-[calc(650px-140px)] p-6">
                    <div className="space-y-4">
                      <div className="text-center pb-6 border-b border-gray-200">
                        <div className="w-20 h-20 bg-gradient-to-br bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <User className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Người dùng</h3>
                        <p className="text-sm text-gray-500">user@example.com</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Từ đã học</p>
                          <p className="text-2xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Từ đã lưu</p>
                          <p className="text-2xl font-bold text-green-600">0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}