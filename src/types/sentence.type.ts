import { UserExerciseData } from "@/pages/Listening/Listening";
import { SwapSuccessResponseApi } from "./utils.type";

export interface Sentence {
  id: string;
  createdAt: string;
  updatedAt: string;
  vietnameseText: string;
  englishText: string;
  order: number;
  hints: string[];
  keyWords: string[];
  blankWords: string[];
  blankPositions: number[];
  grammarPoints: string[];
  translations: SentenceTranslation[];
  passageId: string;
  userListeningExercises?: UserExerciseData[]
}

export type SentenceTranslation = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userTranslation: string;
  score: number;
  isCorrect: boolean;
  attemptsCount: number;
  timeSpent: number;
  hintsUsed: number;
  userId: string;
  sentenceId: string;
};

export const ExerciseStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED : "COMPLETED",
  SKIPPED : "SKIPPED",
  FAILED : "FAILED",
}

export type ExerciseStatusType = 
  "IN_PROGRESS"|
   "COMPLETED"|
   "SKIPPED"|
  "FAILED"


export interface SentenceTranslationRequest {
  sentenceId: string;
  userTranslation: string;
}

export type SentenceTranslationResponses =
  SwapSuccessResponseApi<SentenceTranslation>;


export type SuggestResponses =
  SwapSuccessResponseApi<SuggestResult>;

export interface VocabularyItem {
  word: string;
  meaning: string;
}

export interface SuggestResult {
  translatedSentence: string;
  vocabulary: VocabularyItem[];
  grammarExplanation: string;
  sentenceIndex?: number
}


export interface SuggestResponseDto {
  practiceId: string;
  sentenceIndex: number;
  originalSentence: string;
  targetLanguage: string;
  translatedSentence: string;
  timestamp: Date;
}


export interface suggestPayload {
  practiceId: string,
  sentenceIndex: number,
  originalSentence: string,
  targetLanguage: string
}