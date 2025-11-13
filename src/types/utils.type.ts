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
