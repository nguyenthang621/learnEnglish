import { Translations } from "@/components/Modals/type";
import { Question } from "@/pages/ReadingPassage/ReadingPassage";
import { Scene } from "@/types/lofi.type";
import { Passage } from "@/types/passage.type";
import { WordType } from "@/types/vocabulary.type";


const contractions: Record<string, string> = {
  // do / does / did + not
  "don't": "do not",
  "dont": "do not",
  "doesn't": "does not",
  "doesnt": "does not",
  "didn't": "did not",
  "didnt": "did not",

  // can / could + not
  "can't": "cannot",
  "cant": "cannot",
  "couldn't": "could not",
  "couldnt": "could not",

  // will / would + not
  "won't": "will not",
  "wont": "will not",
  "wouldn't": "would not",
  "wouldnt": "would not",

  // shall / should / might / must + not
  "shan't": "shall not",
  "shant": "shall not",
  "shouldn't": "should not",
  "shouldnt": "should not",
  "mightn't": "might not",
  "mightnt": "might not",
  "mustn't": "must not",
  "mustnt": "must not",

  // have / has / had + not
  "haven't": "have not",
  "havent": "have not",
  "hasn't": "has not",
  "hasnt": "has not",
  "hadn't": "had not",
  "hadnt": "had not",

  // am / are / is / was / were
  "i'm": "i am",
  "im": "i am",
  "you're": "you are",
  "youre": "you are",
  "he's": "he is",
  "hes": "he is",
  "she's": "she is",
  "shes": "she is",
  "it's": "it is",
  "its": "it is",
  "we're": "we are",
  "were": "we are", // note: cần phân biệt ngữ cảnh
  "they're": "they are",
  "theyre": "they are",

  // would / had
  "i'd": "i would",
  "id": "i would",
  "you'd": "you would",
  "youd": "you would",
  "he'd": "he would",
  "hed": "he would",
  "she'd": "she would",
  "shed": "she would",
  "we'd": "we would",
  "wed": "we would",
  "they'd": "they would",
  "theyd": "they would",

  // have
  "i've": "i have",
  "ive": "i have",
  "you've": "you have",
  "youve": "you have",
  "we've": "we have",
  "weve": "we have",
  "they've": "they have",
  "theyve": "they have",

  // let
  "let's": "let us",
  "lets": "let us",

  // who / what / where / when / why
  "who's": "who is",
  "whos": "who is",
  "what's": "what is",
  "whats": "what is",
  "where's": "where is",
  "wheres": "where is",
  "when's": "when is",
  "whens": "when is",
  "why's": "why is",
  "whys": "why is",
  "how's": "how is",
  "hows": "how is",

  // các từ khác thông dụng
  "ain't": "am not",
  "aint": "am not",
  "gonna": "going to",
  "wanna": "want to",
  "lemme": "let me",
  "gimme": "give me",
  "gotta": "got to",
  "hafta": "have to",
  "oughta": "ought to",
  "kinda": "kind of",
  "sorta": "sort of",

  // các dạng cổ điển / ít gặp
  "o'clock": "of the clock",
  "ma'am": "madam",
  "y'all": "you all"
};


function expandContractionsInSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .replace(/’/g, "'")  // chuẩn hóa apostrophe
    .split(/\s+/)
    .map(word => contractions[word] || word)
    .join(" ");
}
function normalizeSentence(sentence: string): string {
  return sentence
    .replace(/[^a-z0-9\s]/gi, "") // bỏ dấu câu
    .replace(/\s+/g, " ")         // chuẩn hóa khoảng trắng
    .trim();
}
function compareSentences(a: string, b: string): boolean {
  const normalizedA = normalizeSentence(expandContractionsInSentence(a));
  const normalizedB = normalizeSentence(expandContractionsInSentence(b));
  return normalizedA === normalizedB;
}


export function isAnswerCorrect(
  studentAnswer: string,
  correction: string
): boolean {
  return compareSentences(studentAnswer.trim().toLowerCase(), correction.trim().toLowerCase()) ;
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function renderVideoUrl(
  isDay: boolean,
  isRain: boolean,
  scene: Scene
): string {
  const { scene: sceneName, variants } = scene;
  // console.log("isDay:", isDay, "isRain:", isRain, "sceneName:", sceneName);

  // 1. Nếu chỉ có 1 variant -> dùng luôn
  if (variants.length === 1) {
    return `${process.env.NEXT_PUBLIC_BASE_API}/api/scenes/${sceneName}/${
      variants[0]
    }.mp4`;
  }

  // 2. Nếu có default -> ưu tiên dùng khi không có variant phù hợp khác
  const has = (v: string) => variants.includes(v);

  // 3. Ưu tiên lựa chọn theo variant có trong scene
  if (isDay && isRain) {
    if (has("day-rain")) return getUrl("day-rain");
    if (has("day")) return getUrl("day");
  }

  if (isDay && !isRain) {
    if (has("day")) return getUrl("day");
  }

  if (!isDay && isRain) {
    if (has("night-rain")) return getUrl("night-rain");
    if (has("night")) return getUrl("night");
  }

  if (!isDay && !isRain) {
    if (has("night")) return getUrl("night");
  }

  if (isRain) {
    if (has("rain")) return getUrl("rain");
  }

  // fallback cuối cùng
  if (has("default")) return getUrl("default");

  // Nếu không có gì phù hợp, dùng variant đầu tiên
  return getUrl(variants[0]);

  function getUrl(variant: string): string {
    return `${
      process.env.NEXT_PUBLIC_BASE_API
    }/api/scenes/${sceneName}/${variant}.mp4`;
  }
}

type MusicList = Record<string, string[]>;

export interface SongItem {
  id: number;
  song: string;
  genre: string;
}

export function convertMusicListToArray(musicLists: MusicList): SongItem[] {
  let idCounter = 1;
  const result: SongItem[] = [];

  for (const [genre, items] of Object.entries(musicLists)) {
    const mp3Files = items.filter((item) => item.endsWith(".mp3"));
    for (const song of mp3Files) {
      result.push({
        id: idCounter++,
        song,
        genre,
      });
    }
  }

  return result;
}

export function generalCurrentSong(
  listSongPlaylistRedux: SongItem[],
  index: number
): string | null {
  if (!index || index < 1 || index > listSongPlaylistRedux.length)
    return `${process.env.NEXT_PUBLIC_BASE_API}/api/songs/${
      listSongPlaylistRedux[0].genre
    }/${listSongPlaylistRedux[0].song}`;

  return `${process.env.NEXT_PUBLIC_BASE_API}/api/songs/${
    listSongPlaylistRedux[index].genre
  }/${listSongPlaylistRedux[index].song}`;
}

export const getSongPath = (url: string): string | null => {
  const match = url.match(/songs\/([^\/]+)/);
  return match ? match[1] : null;
};

// calculator process passage writing
export const calculatorProcess = (passsage: Passage) => {
  if (!passsage?.userPassages || !passsage.sentences) return 0;
  return Math.round(
    ((passsage.userPassages[0].currentSentenceIndex - 1) /
      passsage.sentences.length) *
      100
  );
};

// calculator pocess passage reading
export const calculatorProcessReading = (questions: Question[]) => {
  if (!questions) return 0;
  const userAnswers = questions.reduce((acc, curr) => {
    if (curr.userAnswers.length > 0 && curr.userAnswers[0].isCorrect) acc += 1;
    return acc;
  }, 0);
  return Math.round(
    ((userAnswers /
      questions.length) *
      100
  ));
};

export const StringAudioTranslate = (passageDetail: Passage) => {
  return passageDetail?.sentences
    .filter((sentence) => {
      if (sentence.translations.length > 0) return sentence.translations[0].userTranslation;
      // return sentence.englishText
    })
    .map((e) => e.englishText)
    .join(" ");
};

export function genCurrentIndex(passageDetail: Passage | null) {
  let currentOrder = 1;
  if (passageDetail)
    currentOrder =
      passageDetail.userPassages && passageDetail.userPassages.length > 0
        ? passageDetail.userPassages[0].currentSentenceIndex
        : 1;
  return currentOrder;
}

export function extractNameAndCountry(input: string): string {
  const match = input.match(/(?:Microsoft\s+)?(.+?)\s+Online\s+\(.*?\)\s+-\s+.*?\((.*?)\)/);
  if (match) {
    const name = match[1].trim();
    const country = match[2].trim();
    return `${name} - (${country})`;
  }
  return "";
}


export function mapPosToWordType(pos: string): WordType {
  if (!pos) return 'OTHER'
  const normalized = pos.trim().toLowerCase();


  switch (normalized) {
    case 'danh từ':
      return 'NOUN';
    case 'động từ':
    case 'động từ':
      return 'VERB';
    case 'tính từ':
      return 'ADJECTIVE';
    case 'trạng từ':
      return 'ADVERB';
    case 'giới từ':
      return 'PREPOSITION';
    case 'liên từ':
      return 'CONJUNCTION';
    case 'mạo từ':
      return 'ARTICLE';
    case 'đại từ':
      return 'PRONOUN';
    case 'thán từ':
      return 'INTERJECTION';
    case 'cụm động từ':
      return 'PHRASAL_VERB';
    case 'thành ngữ':
      return 'IDIOM';
    default:
      return 'OTHER' as WordType;
  }
}

type TranslationData = {
  "all-translations": [string, string[]][];
  "possible-translations": string[];
  "possible-mistakes": string[] | null;
};

export function extractEnglishSynonyms(data: Translations | undefined): string[] {
  if (!data || !data["all-translations"]) return []
  const synonyms = new Set<string>();

  // duyệt all-translations
  for (const [, words] of data["all-translations"]) {
    for (const word of words) {
      synonyms.add(word);
    }
  }

  return Array.from(synonyms);
}


export function normalizeSentenceFormat(sentence: string): string {
  if (!sentence || sentence.trim() === "") return "";

  //  Loại khoảng trắng thừa hai đầu
  let result = sentence.trim();

  // Viết hoa chữ cái đầu tiên
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Thêm dấu chấm nếu chưa có
  if (!/[.!?]$/.test(result)) {
    result += ".";
  }

  return result;
}

export function shuffleArray(arr: any[]): any[] {
  const array = [...arr]; 
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  
  }
  return array;
}

export   const getPlaceholder = (type: any /*, sourceLanguage */) => {
    switch (type) {
      case 'translate_question':
        return 'Từ vựng Tiếng Việt của từ nghe được';     
      case 'correct_word':
        return 'Điền từ nghe được vào chỗ trống...';    
      case 'family_word':
        return 'Từ đồng nghĩa';
      default:
        return 'Type your answer here...';
    }
  };