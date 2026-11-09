# Contributing to SoroLearn

Thank you for helping teach the next wave of Soroban developers!

## Which Repo?

SoroLearn is split across three repos. Open your PR in the one that owns the change:

- **sorolearn-frontend** (this repo): the Next.js app, lessons, the grader, and UI. Most contributions land here.
- **[sorolearn-backend](https://github.com/sorolearn/sorolearn-backend):** the API that signs certificate mints with the admin key.
- **[sorolearn-contract](https://github.com/sorolearn/sorolearn-contract):** the Soroban contract that records on-chain completion certificates.

A change that spans repos (for example, a new contract function the app uses) needs a PR in each. Link them to each other, and merge from the bottom up: contract, then backend, then frontend.

## How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push and open a Pull Request

CI runs typecheck, lint, the test suite (with coverage), and a production build on every PR. All of it should pass before merging.

## Adding a Lesson

A lesson has two parts, and both need updating. Missing one is the most common mistake when contributing content:

1. **`src/content/<path>/<slug>.md`:** the explanatory writeup a learner reads: background, a worked example, the challenge description. Plain Markdown. Look at an existing lesson in the same path for the expected structure (What You'll Learn / Background / Challenge / Starter Code).
2. **`src/lib/courses.ts`:** add the matching lesson entry: `intro`, `challenge`, `starterCode`, `hints`, and `checks`. The `checks` object is what the auto-grader (`src/lib/grader.ts`) actually verifies: required attribute macros, function signatures (name plus expected parameters), forbidden placeholders (`todo!()`, `unimplemented!()`, "your code here"), and any required substrings in the submission. A lesson with a `.md` file but no `courses.ts` entry silently renders with the generic starter code and hints instead of what you wrote. Check the lesson page in the running app before opening a PR.

The grader is static analysis, not compilation. It can't verify that a submission compiles or produces the right value at runtime, only that it has the right shape. Keep challenges scoped to something a structural check can meaningfully verify (a specific function signature, required macros, a few key substrings). Also confirm your starter code is valid Rust, since the grader won't catch it if it isn't.

Run `npm run dev` and open the lesson in your browser. Confirm it renders correctly, and that both a wrong and a correct submission grade the way you expect, before opening a PR.

Adding a whole new **course** also needs its slug added to `src/courses.ts` in sorolearn-backend, or certificates for it will be rejected.

## Working on Certificates Locally

The certificate page talks to sorolearn-backend. To work on it, run the backend locally (see its README) and keep `NEXT_PUBLIC_API_URL` in `.env.local` pointing at it (default `http://localhost:4000`).

## Other Areas to Contribute

- Platform features (editor, grading, leaderboard, accounts)
- UI improvements and accessibility
- Tests: the suite (`src/**/*.test.{ts,tsx}`, Vitest + React Testing Library) has a real coverage report (`npm run test:coverage`). Check what's untested before assuming something already has a test
- Documentation

## Content Guidelines

- Lessons should be self-contained and progressively build on each other
- Each challenge must have a clear objective, starter code, and a `checks` entry the grader can actually verify
- Keep explanations concise and beginner-friendly for the path they're in

## Issues

Check open issues for tasks labeled `good first issue` or `help wanted`.
