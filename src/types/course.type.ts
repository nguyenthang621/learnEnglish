export interface CourseDetailResponse {
  course: Course;
  can_access: boolean;
  enrollment: Enrollment | null;
  progress_stats: ProgressStats;
}

// -------------------- COURSE --------------------

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string | null;
  level_id: Level;
  price: string;
  is_free: boolean;
  is_vip_only: boolean;
  estimated_hours: number;
  total_lessons: number;
  enrolled_count: number;
  tags: string | null;
  requirements: string;       // dạng JSON string
  what_you_learn: string;     // dạng JSON string
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  category: Category;
  lessons: Lesson[];
  created_at: string;
}

// -------------------- LEVEL --------------------

export interface Level {
  id: number;
  name: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// -------------------- CATEGORY --------------------

export interface Category {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// -------------------- LESSON --------------------

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives: string;
  thumbnail: string | null;
  duration_minutes: number | null;
  sort_order: number;
  is_preview: boolean | null;
  is_published: boolean;
}

// -------------------- ENROLLMENT --------------------

export type Enrollment = null; 
// (có thể mở rộng nếu backend trả object trong tương lai)

// -------------------- PROGRESS --------------------

export interface ProgressStats {
  total_lessons: number;
  completed: number;
  in_progress: number;
  not_started: number;
  percentage: number;
}
