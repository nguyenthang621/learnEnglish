export interface AttemptResponse {
    attempt_id: number;
    questions: Question[];
    time_limit_minutes: number;
    remaining_time_seconds: number;
    total_questions: number;
    total_points: string;
    id: number;
    title: string;
    slug: string;
    user_id: number;
    description: string;
    instructions: string;
    test_type_id: number;
    level_id: number;
    max_attempts: number;
    passing_score: string;
    shuffle_questions: boolean;
    show_results_immediately: boolean;
    allow_review: boolean;
    is_published: boolean;
    has_groups: number;
    layout_type: string;
    settings: string; // hoặc JSON nếu bạn parse → any[] hoặc Record<string, any>
    deleted_at: string | null;
}

/* ===========================
        COMMON TYPES
=========================== */

export type QuestionType = "mcq" | "multi_choice" | "fill_gap" | "matching" | "arrange";

export interface BaseQuestion {
  id: number;
  question: string;
  type: QuestionType;
  points: string;
  audio_url: string | null;
  image_url: string | null;
  metadata: string | object; // vì đôi lúc metadata là "[]", đôi lúc là object JSON
}

/* ===========================
       MCQ / MULTI-CHOICE
=========================== */

export interface OptionItem {
  id: number;
  option_text: string;
  image_url: string | null;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq" | "multi_choice";
  metadata: string; // luôn là "[]"
  options: OptionItem[];
}

/* ===========================
            FILL GAP
=========================== */

export interface FillGapMetadata {
  correct_answer: string;
  accept_variations: string[];
}

export interface FillGapQuestion extends BaseQuestion {
  type: "fill_gap";
  metadata: FillGapMetadata | string; // vì backend trả về dạng string JSON
  options?: never;
}

/* ===========================
           MATCHING
=========================== */

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingMetadata {
  pairs: MatchingPair[];
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  metadata: MatchingMetadata | string;
  left_items: string[];
  right_items: string[];
  options?: never;
}

/* ===========================
         UNIFIED TYPE
=========================== */

export type Question =
  | MCQQuestion
  | FillGapQuestion
  | MatchingQuestion;
