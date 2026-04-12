export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  order: number;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

export interface ChallengeResult {
  passed: boolean;
  output: string;
  errorMessage?: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  coursesCompleted: number;
}
