import type { Course, Lesson, LessonChecks } from "@/types";
import { defaultChecks } from "@/lib/grader";

const GREET_STARTER = `#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct GreetContract;

#[contractimpl]
impl GreetContract {
    pub fn greet(env: Env, name: String) -> String {
        // your code here
        todo!()
    }
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
        challenge:
          "Write a function `longest` that takes two string slices, `a: &str` and `b: &str`, and returns whichever is longer — without taking ownership of either argument.",
        starterCode: `fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    // your code here
    todo!()
}
`,
        hints: [
          "Hint 1: Compare `a.len()` and `b.len()` and return the longer `&str` — no need to allocate or clone anything.",
          "Hint 2: Use `>=` (not `>`) so that ties consistently return `a`.",
        ],
        checks: {
          requiredFunctions: [{ name: "longest", params: ["a", "b"] }],
          requiredSubstrings: [".len()"],
          forbidPlaceholders: true,
        },
      },
      {
        slug: "structs-enums-pattern-matching",
        title: "Structs, enums, and pattern matching",
        description: "Model contract state and results with structs and enums.",
        intro: "Contract state and results are modeled with structs and enums. You will practice destructuring them with match.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        order: 2,
        challenge:
          "Define a `Direction` enum (`North`, `South`, `East`, `West`), then write a function `opposite` that returns the opposite direction using a `match` expression.",
        starterCode: `enum Direction {
    North,
    South,
    East,
    West,
}

fn opposite(dir: Direction) -> Direction {
    // your code here
    todo!()
}
`,
        hints: [
          "Hint 1: `match dir { Direction::North => ..., Direction::South => ..., ... }` — handle all four variants.",
          "Hint 2: North's opposite is South, and East's opposite is West.",
        ],
        checks: {
          requiredFunctions: [{ name: "opposite", params: ["dir"] }],
          requiredSubstrings: ["match"],
          forbidPlaceholders: true,
        },
      },
      {
        slug: "error-handling-result-option",
        title: "Error handling with Result and Option",
        description: "Propagate failure and absence without exceptions.",
        intro: "Soroban contracts propagate failures with Result and absence with Option instead of exceptions. This lesson builds the habits you will use everywhere.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        order: 3,
        challenge:
          'Write a function `safe_divide` that takes two `i64` values, `a` and `b`, and returns `Result<i64, String>`: `Ok(a / b)` if `b` isn\'t zero, or `Err("division by zero".to_string())` if it is.',
        starterCode: `fn safe_divide(a: i64, b: i64) -> Result<i64, String> {
    // your code here
    todo!()
}
`,
        hints: [
          "Hint 1: Check `if b == 0` first and return the `Err(...)` case early.",
          "Hint 2: Otherwise return `Ok(a / b)`.",
        ],
        checks: {
          requiredFunctions: [{ name: "safe_divide", params: ["a", "b"] }],
          requiredSubstrings: ["Ok(", "Err("],
          forbidPlaceholders: true,
        },
      },
      {
        slug: "first-contract",
        title: "Writing your first Soroban #[contract]",
        description: "Write, deploy, and invoke your first Soroban smart contract.",
        intro: "Every Soroban contract starts the same way: a #[contract] struct and a #[contractimpl] block. Here you will write one with a single greet function.",
        difficulty: "beginner",
        estimatedMinutes: 30,
        order: 4,
        challenge:
          'Write a Soroban contract with a function `greet` that takes a `name: String` and returns `"Welcome to Soroban, <name>!"`.',
        starterCode: GREET_STARTER,
        hints: [
          "Hint 1: The parameter is `name: String` and the return type is `String` — match the signature in the starter code exactly.",
          'Hint 2: Build the greeting with `String::from_str(&env, &format!("Welcome to Soroban, {}!", name))`, following the pattern from the lesson above.',
        ],
        checks: {
          requiredAttributes: ["#[contract]", "#[contractimpl]"],
          requiredFunctions: [{ name: "greet", params: ["name"] }],
          requiredSubstrings: ["Welcome to Soroban"],
          forbidPlaceholders: true,
        },
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
        challenge: "Write a function `now` that returns the current ledger's Unix timestamp, using `env.ledger().timestamp()`.",
        starterCode: `#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct ClockContract;

#[contractimpl]
impl ClockContract {
    pub fn now(env: Env) -> u64 {
        // your code here
        todo!()
    }
}
`,
        hints: [
          "Hint 1: Chain state is reached through `env` — ledger info specifically lives under `env.ledger()`.",
          "Hint 2: `env.ledger().timestamp()` already returns a `u64` — just return it directly.",
        ],
        checks: {
          requiredAttributes: ["#[contract]", "#[contractimpl]"],
          requiredFunctions: [{ name: "now", params: ["env"] }],
          requiredSubstrings: ["env.ledger().timestamp()"],
          forbidPlaceholders: true,
        },
      },
      {
        slug: "storage-types",
        title: "Storage types: persistent, temporary, and instance",
        description: "Learn the three storage types and their rent costs.",
        intro: "Soroban splits storage into three lifetimes with different rent costs. Choosing the right one matters for both correctness and fees.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        order: 2,
        challenge:
          "Write a contract with two functions: `set_value(env, key: Symbol, value: i128)` — stores a value by key in persistent storage — and `get_value(env, key: Symbol) -> i128` — retrieves it, returning 0 if not set.",
        starterCode: `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

#[contract]
pub struct StorageContract;

#[contractimpl]
impl StorageContract {
    pub fn set_value(env: Env, key: Symbol, value: i128) {
        // your code here
        todo!()
    }

    pub fn get_value(env: Env, key: Symbol) -> i128 {
        // your code here
        todo!()
    }
}
`,
        hints: [
          "Hint 1: `env.storage().persistent().set(&key, &value)` writes; `env.storage().persistent().get(&key)` reads.",
          "Hint 2: `get_value` should return 0 when nothing is stored yet — that's exactly what `.unwrap_or(0)` gives you.",
        ],
        checks: {
          requiredAttributes: ["#[contract]", "#[contractimpl]"],
          requiredFunctions: [
            { name: "set_value", params: ["key", "value"] },
            { name: "get_value", params: ["key"] },
          ],
          requiredSubstrings: ["persistent()"],
          forbidPlaceholders: true,
        },
      },
      {
        slug: "authorization",
        title: "Authorization & require_auth()",
        description: "Secure your contracts with Soroban's built-in authorization model.",
        intro: "require_auth() is how a contract confirms an account actually authorized an action. You will wire it into a simple transfer function.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 3,
        challenge:
          "Fix the vulnerable withdraw function below: it should accept a `caller: Address` parameter and call `env.require_auth(&caller)` before touching storage.",
        starterCode: `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env};

#[contract]
pub struct VaultContract;

#[contractimpl]
impl VaultContract {
    // DANGEROUS: anyone can call this and drain the contract
    pub fn withdraw(env: Env, amount: i128) {
        let key = symbol_short!("BAL");
        let balance: i128 = env.storage().persistent().get(&key).unwrap_or(0);
        env.storage().persistent().set(&key, &(balance - amount));
    }
}
`,
        hints: [
          "Hint 1: Add a `caller: Address` parameter to `withdraw`'s signature (you'll need `use soroban_sdk::Address;`).",
          "Hint 2: Call `env.require_auth(&caller)` as the very first line, before reading or writing storage.",
        ],
        checks: {
          requiredAttributes: ["#[contract]", "#[contractimpl]"],
          requiredFunctions: [{ name: "withdraw", params: ["caller", "amount"] }],
          requiredSubstrings: ["require_auth"],
        },
      },
      {
        slug: "sep-41-tokens",
        title: "Soroban tokens and the SEP-41 token interface",
        description: "The standard token interface Soroban contracts implement.",
        intro: "SEP-41 is the standard token interface Soroban contracts implement to interoperate. This lesson walks through its required functions.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        order: 4,
        challenge:
          "Write a function `balance` that reads a `DataKey::Balance(id)` entry from persistent storage and returns the stored `i128`, defaulting to 0 if nothing has been stored for that address yet.",
        starterCode: `#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[derive(Clone)]
#[contracttype]
enum DataKey {
    Balance(Address),
}

#[contract]
pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn balance(env: Env, id: Address) -> i128 {
        // your code here
        todo!()
    }
}
`,
        hints: [
          "Hint 1: Build the key with `DataKey::Balance(id)`, then read it with `env.storage().persistent().get(&key)`.",
          "Hint 2: `.get(...)` returns an `Option` — `.unwrap_or(0)` gives you 0 for an address with no balance yet.",
        ],
        checks: {
          requiredAttributes: ["#[contract]", "#[contractimpl]"],
          requiredFunctions: [{ name: "balance", params: ["id"] }],
          requiredSubstrings: ["unwrap_or"],
          forbidPlaceholders: true,
        },
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

export function checksFor(lesson: Lesson): LessonChecks {
  return lesson.checks ?? defaultChecks();
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
