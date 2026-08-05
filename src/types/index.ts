export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  intro: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  order: number;
  challenge?: string;
  starterCode?: string;
  hints?: string[];
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
  isYou?: boolean;
}
