import { SwapSuccessResponseApi } from "./utils.type";

export interface vocabularySearch {
  original: string;
  translated: {
    text: string;
    raw: {
      sentences: Array<{
        trans?: string;
        orig?: string;
        backend?: number;
        src_translit?: string;
      }>;
      src: string;
      confidence: number;
      spell: Record<string, unknown>;
      ld_result: {
        srclangs: string[];
        srclangs_confidences: number[];
        extended_srclangs: string[];
      };
    };
  };
}

interface Definition {
  definition: string;
  otherexamples: string;
  partofspeech: string;
  example: string;
}
export type PronunciationName = 'US' | 'UK' | string;

export interface AudioSource {
  url: string;
  /** Trong dữ liệu của bạn đang là "1" (string). Cho phép cả number để linh hoạt. */
  priority: string | number;
  pronunciation_name?: PronunciationName;
}

export interface ExampleBlock {
  /** HTML string, giữ thô để bạn tự render/sanitize ở FE */
  content: string;
  classType: WordType;
  /** HTML string (dịch) */
  translation?: string;
}

export interface Variation {
  classType: WordType;
  variationWordContent: string;
}

export interface TopicInfo {
  topicId: string;
  topicName: string;
  displayOrder?: number;
}

export interface WordData {
  word: string;
  phonetics: string[];
  pronunciation: string;
  audioUrl: AudioSource[];
  example?: ExampleBlock | null;
  variations?: Variation[];
  family?: string[] | null;
  synonyms?: string[] | null;
  image?: string | null;
  pos?: string;
  translation: string;
  wordType: WordType;
  frequency: number;
  difficulty: DifficultyLevel;
  definitions: Definition[];
  examples?: ExampleBlock[];
}

export type VocabularyStatus = "NEW" | "LEARNING" | "MASTERED" | "REVIEW"; // ví dụ
export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type WordType =
  | "NOUN"
  | "VERB"
  | "ADJECTIVE"
  | "ADVERB"
  | "PREPOSITION"
  | "CONJUNCTION"
  | "ARTICLE"
  | "PRONOUN"
  | "INTERJECTION"
  | "PHRASAL_VERB"
  | "IDIOM"
  | "OTHER"; // ví dụ

export interface VocabularyListQuery {
  status?: VocabularyStatus;
  difficulty?: DifficultyLevel;
  wordType?: WordType;
  isFavorite?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "masteryLevel" | "lastReviewedAt" | "word";
  sortOrder?: "asc" | "desc";
}

export type VocabularyTranslationResponses =
  SwapSuccessResponseApi<vocabularySearch>;


  export interface Topic {
  id: string;
  groupId: string;
  parentTopicId: string | null;
  title: string;
  slug: string;
  sortOrder: number;
  isLeaf: boolean;
  createdAt?: string; // hoặc Date nếu parse
  updatedAt?: string; // hoặc Date nếu parse
}

export interface TopicGroup {
  id: string;
  title: string;
  image?: string | null;
  description: string | null;
  createdAt?: string; // hoặc Date nếu parse
  updatedAt?: string; // hoặc Date nếu parse
  children: Topic[];
  _count: {
    topics: number;
  };
}

// quiz taype

// Định nghĩa enum cho mức độ khó
export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "MIXED";

// Định nghĩa enum cho loại câu hỏi
export type QuestionType =
  | "translate_question"
  | "multiple_choice"
  | "correct_word"
  | "pronunciation"
  | "synonym"
  | "family_word";

// Interface chính
export interface QuizConfig {
  questionCount: number;
  difficulty: Difficulty;
  questionTypes: QuestionType[];
  topicId: string;
}


export interface SubmitQuizResultDto {
  vocabularyId: string;
  exerciseType: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  responseTime: number;
  hintsUsed?: number;
}