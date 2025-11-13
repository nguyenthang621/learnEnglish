import { Sentence } from "./sentence.type";
import { User } from "./user.type";
import { SwapSuccessResponseApi, TranslationStatus } from "./utils.type";

export interface Passage {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  englishContent: string;
  audioUrl: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  lessonId: string;
  adminId: string | null;
  lesson: Lesson;
  sentences: Sentence[];
  userPassages?: UserPassage[];
  admin?: any | null;
}

export interface Lesson {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // có thể mở rộng thêm nếu cần
  estimatedTime: number;
  order: number;
  isActive: boolean;
  isPremium: boolean;
  categoryId: string;
  adminId: string | null;
  category: Category;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  lessons?: Lesson[]
}

export interface UserPassage {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: TranslationStatus;
  score?: number | null;
  completedAt?: string | null;
  timeSpent?: number | null;
  attemptsCount: number;
  currentSentenceIndex: number;

  userId: string;
  passageId: string;

  user?: User;
  passage?: Passage;
}

export interface PracticePassageResponse {
  data: Passage;
}

export type PracticePassageResponses =
  SwapSuccessResponseApi<PracticePassageResponse>;
export type PassageResponses = SwapSuccessResponseApi<Passage>;
export type PassagesResponses = SwapSuccessResponseApi<Passage[]>;


export interface Category {
  id: string;
  title: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'; 
  isPremium: boolean;
}


export interface Course {
  id: string;
  createdAt: string; 
  updatedAt: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
  lessons: Lesson[];
}