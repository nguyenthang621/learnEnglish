import vocabularyAPI from "@/apis/vocabulary.api";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  closeShowModalVocabulary,
  setRefreshVocabulary,
} from "@/stores/reducers/vocabularyReducer";
import { ExampleBlock, WordData } from "@/types/vocabulary.type";
import { Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { TranslationResponse } from "./type";
import { extractEnglishSynonyms, mapPosToWordType } from "@/utils/utils";
import translateAPI from "@/apis/translate.api";

interface PhoneticData {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: PhoneticData[];
  meanings: Meaning[];
}

function ModalInsertVocabulary() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("vi");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dictionaryData, setDictionaryData] = useState<DictionaryEntry[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [searchResult, setSearchResult] = useState<TranslationResponse | null>(null);

  const lastValueRef = useRef<string>("");   // chống gọi lại cùng value
  const composingRef = useRef(false); 

  const dispatch = useAppDispatch();
  const isShowModalVocabulary = useAppSelector(
    (state) => state.vocabulary.isShowModalVocabulary
  );
  const handleCloseModalVocabulary = () => {
    dispatch(closeShowModalVocabulary());
    console.log("Closing vocabulary modal", isShowModalVocabulary);
  };

  const handleTranslate = async (text: string) => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // const response = await translateAPI.translateVocabulary(
      //   text,
      //   fromLang,
      //   toLang
      // );
      // console.log("Translation data:", response.data.data.translated);
      // setTranslatedText(response.data.data.translated.text || "");

    // const response = await fetch(`${import.meta.env.VITE_API_TRANSLATE}/api/translate?sl=${fromLang}&dl=${toLang}&text=${text}`);
    const response = await translateAPI.translateVocabulary(
      text,
      fromLang,
      toLang
    );
    if (response.status !== 200) {
      throw new Error("Không tìm thấy từ trong từ điển");
    }
    const data: TranslationResponse = await response.data
    setSearchResult(data)
    // setDictionaryData(data);
    return data;

    } catch (err: any) {
      
      // const response = await fetch(`${import.meta.env.VITE_API_TRANSLATE}/translate?sl=${fromLang}&dl=${toLang}&text=${text}`);

      // if (!response.ok) {
      //   setDictionaryData([])
      //   setTranslatedText("");
      //   setError("Không thể dịch từ này");
      //   throw new Error("Không tìm thấy từ trong từ điển");
      // }
      // const data = await response.json();
      // console.log("data: ", data);
      // setSearchResult(data)
      // setDictionaryData(data);
      // return data;
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    // chỉ gọi khi không đang composition
    if (composingRef.current) return;

    // chống đúp: nếu value giống lần trước → bỏ
    if (value === lastValueRef.current) return;
    lastValueRef.current = value;

    handleTranslate(value);
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleAddWord = async () => {
    if (!inputText.trim()) {
      setError("Vui lòng nhập từ cần thêm");
      return;
    }

    // Logic thêm từ vào vocabulary
    console.log("Adding word:", {
      original: inputText,
      translation: searchResult?.["destination-text"] || "",
      fromLang,
      toLang,
    });

    if (searchResult?.["destination-text"] && searchResult?.["destination-text"].trim()) {
      let example: ExampleBlock | null = null
      if (searchResult?.definitions && searchResult.definitions.length > 0){
        example= {
          content: searchResult?.definitions[0].example || "",
          classType: mapPosToWordType(searchResult?.definitions[0]["part-of-speech"] || "") 
        }
      }
      const wordData: WordData = {
        word: toLang === "vi" ? inputText : translatedText,
        phonetics: [],
          // data[0]?.phonetics
          //   .map((p: any) => p.audio)
          //   .filter((audio: string) => audio) || [],
        pronunciation: (toLang === "vi" ? searchResult.pronunciation?.["source-text-audio"] : searchResult.pronunciation?.["destination-text-audio"]) || "",
        translation: (toLang === "vi" ? searchResult["destination-text"] : searchResult["source-text"]) || "",
        wordType: "VERB",
        frequency: 0,
        synonyms: extractEnglishSynonyms(searchResult["translations"]),
        example: example,
        audioUrl: [{
          url: (toLang === "vi" ? searchResult.pronunciation?.["source-text-audio"] : searchResult.pronunciation?.["destination-text-audio"]) || "" ,
          priority: "1"
        }],
        difficulty: "BEGINNER",
        definitions: searchResult.definitions ? searchResult.definitions.map((def: any) =>
          ({
            definition: def.definition,
            otherexamples: def["other-examples"] || [],
            partofspeech: def["part-of-speech"] || [],
            example: def.example || "",
          })
        ) : [],
      };

      const response = await vocabularyAPI.addVocabulary(wordData);

      if (response.status === 201) {
        console.log("Thêm từ thành công:", response.data.data);
        // đóng modal
        setInputText("");
        setTranslatedText("");
        setError("");
        dispatch(setRefreshVocabulary(Math.random()));
      }
    }

    // Reset form
    setInputText("");
    setTranslatedText("");
    setError("");
    setSearchResult(null)
  };

  const handleShowDetail = async () => {
    const englishWord = fromLang === "en" ? inputText : translatedText;

    if (!englishWord.trim()) {
      setDetailError("Không có từ tiếng Anh để tra cứu");
      return;
    }

    setIsLoadingDetail(true);
    setDetailError("");
    setShowDetailModal(true);

    try {
      await fetchDictionaryData(englishWord);
    } catch (err: any) {
      console.log("Error fetching dictionary data:", err);
      setDetailError("Không tìm thấy từ trong từ điển");
      setDictionaryData([]);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const fetchDictionaryData = async (englishWord: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${englishWord.trim()}`
    );

    if (!response.ok) {
      throw new Error("Không tìm thấy từ trong từ điển");
    }

    const data = await response.json();
    setDictionaryData(data);
    return data;
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(console.error);
  };

  const getWordTypeColor = (kind: string | undefined): string => {
    if (!kind) return 'bg-gray-100';
    const colors: { [key: string]: string } = {
      'danh từ': 'bg-blue-100 text-blue-800',
      'ngoại động từ': 'bg-green-100 text-green-800',
      'tính từ': 'bg-purple-100 text-purple-800',
      'động từ': 'bg-orange-100 text-orange-800',
      'phân từ': 'bg-pink-100 text-pink-800',
    };
    return colors[kind] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div
        id="crypto-modal"
        className="absolute bottom-0 left-0 right-0 top-0 z-40 max-h-full w-full overflow-y-auto overflow-x-hidden bg-gray-800/50 p-4 md:inset-0"
      >
        <div className="absolute left-1/2 top-1/6 flex h-full max-h-full w-full max-w-lg -translate-x-1/2  items-center">
          {/* main */}
          <div className="absolute rounded-lg bg-white shadow bg-gray-100 text-gray-700">
            <button
              type="button"
              className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-hide="crypto-modal"
              onClick={() => handleCloseModalVocabulary()}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {/* header */}
            <div className="min-w-[600px] rounded-t border-b px-6 py-4">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                Add New Word with Translation
              </h3>
            </div>

            {/* body */}
            <div className="p-6">
              <p className="text-sm font-normal text-gray-500 mb-4">
                Thêm từ mới vào từ điển của bạn với tính năng dịch tự động
              </p>

              {/* Language Selection */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                </select>

                <button
                  onClick={swapLanguages}
                  className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
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
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fromLang === "vi" ? "Từ tiếng Việt" : "English Word"}
                  </label>
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

                {/* Translation Result */}
                        {/* Search Results */}
                    {!error && searchResult && (
                      <div className="space-y-6 max-h-[300px] overflow-scroll">
                        {/* Main Word */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1">
                              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {searchResult["destination-text"]}
                              </h2>
                              <div className="flex items-center gap-3">
                                <span className="text-lg text-indigo-600 font-mono">
                                  {searchResult.pronunciation?.["source-text-phonetic"] || ""}
                                </span>
                                <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                                  <Volume2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
            
                          {/* Definitions */}
                          <div className="space-y-6">
                            {searchResult.definitions && searchResult.definitions.map((def, defIndex) => (
                              <div key={defIndex} className="border-l-4 border-indigo-200 pl-4">
                                <div className="mb-3">
                                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getWordTypeColor(def["part-of-speech"])}`}>
                                    {def["part-of-speech"]}
                                  </span>
                                </div>
                                <div className="space-y-3">

                                    <div className="bg-gray-50 rounded-lg p-4">

                                        <div className="bg-white rounded-md p-3 border-l-2 border-amber-400">
                                          <h5 className="text-sm text-gray-600 italic">
                                            <strong>Definition:</strong> {def.example || ""}
                                          </h5>
                                          <p className="text-sm text-gray-400 italic">
                                            <strong>Example:</strong> {def.example || ""}
                                          </p>
                                        </div>
                                     
                                    </div>

                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
            
                        {/* Related Words */}
                        {/* {searchResult?.related && searchResult.related.length > 0 && (
                          <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Heart className="w-5 h-5 text-red-500" />
                              Từ liên quan
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                              {searchResult.related.map((relatedWord, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-lg font-semibold text-indigo-600">
                                      {relatedWord.word}
                                    </h4>
                                    <span className="text-sm text-gray-500 font-mono">
                                      {relatedWord.pronunciation}
                                    </span>
                                  </div>
                                  {relatedWord.definitions.map((def, defIndex) => (
                                    <div key={defIndex} className="mb-2">
                                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-1 ${getWordTypeColor(def.kind)}`}>
                                        {def.kind}
                                      </span>
                                      {def.descriptions.map((desc, descIndex) => (
                                        <p key={descIndex} className="text-sm text-gray-700 ml-2">
                                          • {desc.meaning}
                                        </p>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        )} */}
                      </div>
                    )}

                {/* Error Message */}
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </div>
                )}

                {/* Add Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleShowDetail}
                    disabled={
                      (!inputText.trim() && !translatedText.trim()) || isLoading
                    }
                    className="flex-1 flex items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Detail
                  </button>

                  <button
                    onClick={handleAddWord}
                    disabled={!inputText.trim() || isLoading}
                    className="flex-1 flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Loading...
                      </>
                    ) : (
                      "Add Word"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dictionary Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Từ điển tiếng Anh
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              {isLoadingDetail ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <span className="ml-3 text-gray-600">
                    Đang tải thông tin...
                  </span>
                </div>
              ) : detailError ? (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                  {detailError}
                </div>
              ) : dictionaryData.length > 0 ? (
                <div className="space-y-6">
                  {dictionaryData.map((entry, entryIndex) => (
                    <div
                      key={entryIndex}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      {/* Word and Phonetic */}
                      <div className="mb-4">
                        <div className="flex items-center gap-4">
                          <h4 className="text-2xl font-bold text-gray-900 capitalize">
                            {entry.word}
                          </h4>
                          {entry.phonetic && (
                            <span className="text-lg text-gray-600">
                              {entry.phonetic}
                            </span>
                          )}
                        </div>

                        {/* Audio buttons */}
                        {entry.phonetics.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {entry.phonetics
                              .filter((phonetic) => phonetic.audio)
                              .map((phonetic, phoneticIndex) => (
                                <button
                                  key={phoneticIndex}
                                  onClick={() => playAudio(phonetic.audio!)}
                                  className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816z"
                                      clipRule="evenodd"
                                    />
                                    <path d="M12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
                                  </svg>
                                  {phonetic.text}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>

                      {/* Meanings */}
                      <div className="space-y-4">
                        {entry.meanings.map((meaning, meaningIndex) => (
                          <div
                            key={meaningIndex}
                            className="border-l-4 border-blue-500 pl-4"
                          >
                            <h5 className="font-semibold text-blue-700 text-lg mb-2">
                              {meaning.partOfSpeech}
                            </h5>

                            <div className="space-y-3">
                              {meaning.definitions.map(
                                (definition, defIndex) => (
                                  <div
                                    key={defIndex}
                                    className="bg-gray-50 rounded-lg p-3"
                                  >
                                    <p className="text-gray-800 font-medium mb-1">
                                      {defIndex + 1}. {definition.definition}
                                    </p>
                                    {definition.example && (
                                      <p className="text-gray-600 italic pl-4 border-l-2 border-gray-300">
                                        "{definition.example}"
                                      </p>
                                    )}

                                    {definition.synonyms &&
                                      definition.synonyms.length > 0 && (
                                        <div className="mt-2">
                                          <span className="text-sm font-medium text-green-700">
                                            Synonyms:{" "}
                                          </span>
                                          <span className="text-sm text-green-600">
                                            {definition.synonyms.join(", ")}
                                          </span>
                                        </div>
                                      )}

                                    {definition.antonyms &&
                                      definition.antonyms.length > 0 && (
                                        <div className="mt-1">
                                          <span className="text-sm font-medium text-red-700">
                                            Antonyms:{" "}
                                          </span>
                                          <span className="text-sm text-red-600">
                                            {definition.antonyms.join(", ")}
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                )
                              )}
                            </div>

                            {/* Meaning-level synonyms and antonyms */}
                            {meaning.synonyms &&
                              meaning.synonyms.length > 0 && (
                                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                  <span className="font-medium text-green-800">
                                    Synonyms:{" "}
                                  </span>
                                  <span className="text-green-700">
                                    {meaning.synonyms.join(", ")}
                                  </span>
                                </div>
                              )}

                            {meaning.antonyms &&
                              meaning.antonyms.length > 0 && (
                                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                                  <span className="font-medium text-red-800">
                                    Antonyms:{" "}
                                  </span>
                                  <span className="text-red-700">
                                    {meaning.antonyms.join(", ")}
                                  </span>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có dữ liệu để hiển thị
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalInsertVocabulary;
