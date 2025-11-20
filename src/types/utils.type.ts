// ---------------------------- common type response -------------------------
export interface SwapSuccessResponseApi<T> {
  status: number;
  statusText: string;
  data: SuccessResponseApi<T>;
}

export interface SuccessResponseApi<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponseApi {
  success: boolean
  message: string
  error: string
  form?: string
}
// ------------------------------- special type -------------------------------

export type TranslationStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type PracticesType = 'WRITING' | 'SPEAKING' | 'LISTENING' | 'SHADOWING' | 'READING';

export interface SearchPayload {
  page: number;
  limit: number;
  text?: string;
  from?: string;
  to?: string;
}

export enum SkillTypeEnum {
  LISTENING =  'LISTENING', 
  SPEAKING  = 'SPEAKING',        
  READING   = 'READING',   
  WRITING  = 'WRITING'
}
export type SkillType = 'LISTENING' | 'SPEAKING' | 'READING' | 'WRITING'



export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  color: string | null;
  description: string | null;
}

export interface Level {
  id: number;
  name: string;
  color: string | null;
}

export interface TestType {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface VipPackage {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;                    // API trả về dạng string
  currency: string;                 // VND
  duration_days: number;
  features: string[];
  is_popular: boolean;
  discount_percentage: string | null;
  sale_ends_at: string | null;      // ISO date string
}

export interface VocabularyType {
  id: number;
  name: string;
  acronym: string;    // ví dụ: "n", "v", "adj"
  name_vi: string;
  color: string;
  updated_at: string; // ISO datetime
}

export interface ConfigResponse {
  categories: Category[];
  levels: Level[];
  test_type: TestType[];
  vip_packages: VipPackage[];
  vocabulary_types: VocabularyType[];
}
