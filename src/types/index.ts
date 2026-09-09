export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface RequiredFunction {
  name: string;
  /** Substrings expected to appear somewhere in the parameter list, e.g. "name: String". */
  params?: string[];
}

export interface LessonChecks {
  /** Attribute macros that must appear verbatim, e.g. "#[contract]". */
  requiredAttributes?: string[];
  requiredFunctions?: RequiredFunction[];
  /** Loose, case-insensitive substrings the implementation's output/logic should contain. */
  requiredSubstrings?: string[];
  /** Fail if todo!()/unimplemented!()/"your code here" is still present. */
  forbidPlaceholders?: boolean;
}

export interface GradeResult {
  passed: boolean;
  messages: string[];
}

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
  checks?: LessonChecks;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  coursesCompleted: number;
  isYou?: boolean;
}
