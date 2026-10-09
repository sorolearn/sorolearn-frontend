# Contributing to SoroLearn

Thank you for helping teach the next wave of Soroban developers!

## Project Layout

This is a monorepo:

- **`frontend/`** — the Next.js app. Most contributions land here.
- **`contract/certificate/`** — the Soroban contract that mints on-chain completion certificates.

## How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push and open a Pull Request

CI runs on every PR: typecheck, lint, the frontend test suite (with coverage), and a production build for `frontend/`; `cargo test` (with coverage) and a wasm build for `contract/certificate/`. All of it should pass before merging.

## Adding a Lesson

A lesson has two parts, and both need updating — this is the single most common mistake when contributing content:

1. **`frontend/src/content/<path>/<slug>.md`** — the explanatory writeup a learner reads: background, a worked example, the challenge description. Plain Markdown. Look at an existing lesson in the same path for the expected structure (What You'll Learn / Background / Challenge / Starter Code).
2. **`frontend/src/lib/courses.ts`** — add the matching lesson entry: `intro`, `challenge`, `starterCode`, `hints`, and `checks`. The `checks` object is what the auto-grader (`frontend/src/lib/grader.ts`) actually verifies — required attribute macros, function signatures (name + expected parameters), forbidden placeholders (`todo!()`, `unimplemented!()`, "your code here"), and any required substrings in the submission. A lesson with a `.md` file but no `courses.ts` entry will silently render with the generic starter code and generic hints instead of what you wrote — check the lesson page in the running app before opening a PR.

The grader is static analysis, not compilation — it can't verify a submission actually compiles or produces the right runtime value, only that it has the right shape. Keep challenges scoped to something a structural check can meaningfully verify (a specific function signature, required macros, a few key substrings), and prefer starter code you've confirmed is valid Rust even though the grader won't catch it if it isn't.

Run `npm run dev` in `frontend/` and open the lesson in your browser to confirm it renders correctly and both a wrong and a correct submission grade the way you expect before opening a PR.

## Working on the Contract

```bash
cd contract/certificate
cargo test                      # run the test suite
cargo llvm-cov --summary-only   # coverage (requires rustup component add llvm-tools-preview)
stellar contract build          # build the wasm
```

Any change to `contract/certificate/src/` should come with tests covering the new behavior — see `src/test.rs` for the existing patterns (including auth-failure tests via `MockAuth`/`MockAuthInvoke`, and event-payload assertions via `env.events().all()`). A contract change that touches what's actually deployed on testnet (see the Contract Details section in the README) needs explicit discussion in the PR before merging — the deployed contract ID doesn't change automatically just because the source does.

## Other Areas to Contribute

- Platform features (editor, grading, leaderboard, accounts)
- UI improvements and accessibility
- Tests — the frontend test suite (`frontend/src/**/*.test.{ts,tsx}`, Vitest + React Testing Library) and contract tests both have real coverage reports now (`npm run test:coverage`, `cargo llvm-cov`); check what's untested before assuming something already has a test
- Documentation

## Content Guidelines

- Lessons should be self-contained and progressively build on each other
- Each challenge must have a clear objective, starter code, and a `checks` entry the grader can actually verify
- Keep explanations concise and beginner-friendly for the path they're in

## Issues

Check open issues for tasks labeled `good first issue` or `help wanted`.
