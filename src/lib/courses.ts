import type { Course, Lesson } from "@/types";

const CONTRACT_STARTER = `#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct MyContract;

#[contractimpl]
impl MyContract {
    // your code here
}
`;

const GENERIC_STARTER = `#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    // your code here
}
`;

const GENERIC_HINTS = [
  "Hint 1: Check the exact macro names — #[contract] and #[contractimpl].",
  "Hint 2: Every public function needs a matching signature in the impl block.",
];

// Static course registry — lessons are MDX files in src/content/
export const COURSES: Course[] = [
  {
    slug: "beginner",
    title: "Rust for Soroban Developers",
    description: "Learn the Rust fundamentals you need to write Soroban smart contracts, even if you've never touched Rust before.",
    difficulty: "beginner",
    lessons: [
      {
        slug: "rust-ownership-and-borrowing",
        title: "Rust ownership and borrowing",
        description: "The Soroban-relevant subset of Rust's ownership model.",
        intro: "Ownership is the core Rust concept that lets Soroban contracts run safely without a garbage collector. This lesson covers the subset you actually need day to day.",
        difficulty: "beginner",
        estimatedMinutes: 25,
        order: 1,
      },
      {
        slug: "structs-enums-pattern-matching",
        title: "Structs, enums, and pattern matching",
        description: "Model contract state and results with structs and enums.",
        intro: "Contract state and results are modeled with structs and enums. You will practice destructuring them with match.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        order: 2,
      },
      {
        slug: "error-handling-result-option",
        title: "Error handling with Result and Option",
        description: "Propagate failure and absence without exceptions.",
        intro: "Soroban contracts propagate failures with Result and absence with Option instead of exceptions. This lesson builds the habits you will use everywhere.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        order: 3,
      },
      {
        slug: "first-contract",
        title: "Writing your first Soroban #[contract]",
        description: "Write, deploy, and invoke your first Soroban smart contract.",
        intro: "Every Soroban contract starts the same way: a #[contract] struct and a #[contractimpl] block. Here you will write one that stores and retrieves a single number.",
        difficulty: "beginner",
        estimatedMinutes: 30,
        order: 4,
        challenge: "Write a Soroban contract that stores and retrieves a number.",
        starterCode: CONTRACT_STARTER,
        hints: [
          "Hint 1: The struct is just a marker — the logic lives in the #[contractimpl] block.",
          "Hint 2: Use env.storage().instance() to set and get the number.",
        ],
      },
    ],
  },
  {
    slug: "intermediate",
    title: "Soroban Fundamentals",
    description: "Go deeper into Soroban: auth, tokens, cross-contract calls, and testing.",
    difficulty: "intermediate",
    lessons: [
      {
        slug: "soroban-execution-model",
        title: "The Soroban execution model and host environment",
        description: "What the sandboxed WASM host gives you — and withholds.",
        intro: "Contracts run inside a sandboxed WASM host. This lesson covers what the host environment gives you and what it deliberately withholds.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 1,
      },
      {
        slug: "storage-types",
        title: "Storage types: persistent, temporary, and instance",
        description: "Learn the three storage types and their rent costs.",
        intro: "Soroban splits storage into three lifetimes with different rent costs. Choosing the right one matters for both correctness and fees.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        order: 2,
      },
      {
        slug: "authorization",
        title: "Authorization & require_auth()",
        description: "Secure your contracts with Soroban's built-in authorization model.",
        intro: "require_auth() is how a contract confirms an account actually authorized an action. You will wire it into a simple transfer function.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 3,
      },
      {
        slug: "sep-41-tokens",
        title: "Soroban tokens and the SEP-41 token interface",
        description: "The standard token interface Soroban contracts implement.",
        intro: "SEP-41 is the standard token interface Soroban contracts implement to interoperate. This lesson walks through its required functions.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 4,
      },
      {
        slug: "cross-contract-calls",
        title: "Cross-contract calls",
        description: "The client pattern Soroban generates for calling other contracts.",
        intro: "Contracts frequently call other contracts. You will learn the client pattern Soroban generates for cross-contract calls.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        order: 5,
      },
      {
        slug: "testing-with-testutils",
        title: "Writing and running tests with soroban-sdk testutils",
        description: "Unit test contracts without a network.",
        intro: "testutils spins up an in-memory host so you can unit test contracts without a network. This lesson covers the essential assertions.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 6,
      },
    ],
  },
  {
    slug: "advanced",
    title: "DeFi Patterns on Soroban",
    description: "For developers ready to build production contracts.",
    difficulty: "advanced",
    lessons: [
      {
        slug: "amms-from-scratch",
        title: "Automated Market Makers (AMMs) from scratch",
        description: "Implement the constant-product formula that powers on-chain exchanges.",
        intro: "You will implement the constant-product formula that powers most on-chain exchanges.",
        difficulty: "advanced",
        estimatedMinutes: 35,
        order: 1,
      },
      {
        slug: "lending-collateralization",
        title: "Lending and collateralization mechanics",
        description: "Collateral ratios and liquidation logic for lending markets.",
        intro: "Lending markets need collateral ratios and liquidation logic to stay solvent. This lesson builds a minimal version of both.",
        difficulty: "advanced",
        estimatedMinutes: 35,
        order: 2,
      },
      {
        slug: "oracle-integration-pulsar",
        title: "Oracle integration with Pulsar",
        description: "Pull trustworthy external price data into a contract call.",
        intro: "Price-dependent contracts need trustworthy external data. You will pull a price feed from an oracle into a contract call.",
        difficulty: "advanced",
        estimatedMinutes: 25,
        order: 3,
      },
      {
        slug: "dao-governance-agora",
        title: "DAO governance with Agora",
        description: "Proposal and vote-tallying patterns for on-chain governance.",
        intro: "Governance contracts let token holders vote on proposals on-chain. This lesson covers proposal and vote-tallying patterns.",
        difficulty: "advanced",
        estimatedMinutes: 25,
        order: 4,
      },
      {
        slug: "security-patterns-argus",
        title: "Security patterns and common vulnerabilities (with Argus)",
        description: "Audit a contract for reentrancy, overflow, and auth bypass.",
        intro: "Reentrancy, overflow, and auth bypass are the most common Soroban contract bugs. You will audit a contract for each.",
        difficulty: "advanced",
        estimatedMinutes: 30,
        order: 5,
      },
      {
        slug: "upgradeability-migration",
        title: "Upgradeability and migration patterns",
        description: "Safe patterns for upgrading deployed contracts.",
        intro: "Immutable contracts sometimes need an escape hatch. This lesson covers the safe patterns for upgrading deployed contracts.",
        difficulty: "advanced",
        estimatedMinutes: 25,
        order: 6,
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | undefined {
  return getCourse(courseSlug)?.lessons.find((l) => l.slug === lessonSlug);
}

export function lessonId(courseSlug: string, lessonSlug: string): string {
  return `${courseSlug}/${lessonSlug}`;
}

export function starterCodeFor(lesson: Lesson): string {
  return lesson.starterCode ?? GENERIC_STARTER;
}

export function hintsFor(lesson: Lesson): string[] {
  return lesson.hints ?? GENERIC_HINTS;
}

export function challengeFor(lesson: Lesson): string {
  return lesson.challenge ?? "Follow the lesson above, then edit the contract until Run Tests passes.";
}

export function totalLessonCount(): number {
  return COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
}

export interface FlatLesson {
  course: Course;
  lesson: Lesson;
  id: string;
}

export function flattenLessons(): FlatLesson[] {
  return COURSES.flatMap((course) =>
    course.lessons.map((lesson) => ({ course, lesson, id: lessonId(course.slug, lesson.slug) }))
  );
}
