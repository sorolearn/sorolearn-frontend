# SoroLearn

SoroLearn is an open-source, interactive education platform that teaches developers how to build Soroban smart contracts in Rust. It offers hands-on coding challenges, an in-browser editor with auto-graded structural checks, structured learning paths, and community-contributed content. Learners don't need a local environment to start.

This repo is the web app. SoroLearn is made of three repos:

| Repo | What it is |
| --- | --- |
| **sorolearn-frontend** (this repo) | Next.js learning app: courses, editor, grader, progress |
| [sorolearn-backend](https://github.com/sorolearn/sorolearn-backend) | Node API that holds the admin key and mints certificates |
| [sorolearn-contract](https://github.com/sorolearn/sorolearn-contract) | Soroban contract that records completion certificates on-chain |

---

## Why SoroLearn

Soroban is unusual in the blockchain world: it uses Rust and WebAssembly instead of Solidity and the EVM. That makes existing Solidity tutorials, Ethereum courses and CryptoZombies-style guides irrelevant to someone learning Soroban. Developers starting on Stellar have almost nowhere to go beyond the official docs.

At the same time, the Stellar Development Foundation is actively trying to bring new developers into the ecosystem. SoroLearn is the community-owned answer to that need: a structured, interactive, beginner-to-expert curriculum built by Soroban developers, for Soroban developers.

---

## Features

### Learning
- **Structured courses:** a progressive curriculum from Rust basics, through Soroban fundamentals, to advanced DeFi patterns
- **Interactive editor:** write Soroban contract code in the browser with real syntax highlighting (Monaco), no local Rust install needed
- **Auto-graded challenges:** static analysis checks your solution's structure (required macros, function signatures, no leftover placeholders) and gives instant, specific feedback. It does not compile your code; see Roadmap
- **Hints system:** unlock hints when you're stuck, without spoiling the full solution

### Community
- **Leaderboard:** currently tracks only your own session progress. A real shared leaderboard needs accounts (see Roadmap)
- **On-chain certificates:** earn an NFT certificate on Stellar when you complete a course
- **Community content:** anyone can contribute new lessons and challenges via pull request

### Platform
- **Progress tracking:** saved locally in your browser, not yet synced across devices (needs real accounts; see Roadmap)
- **Mobile-friendly:** learn on any device
- **Dark mode:** because developers demand it

---

## Learning Paths

### Beginner: Rust for Soroban Developers
> For developers who know another language but are new to Rust

- Rust ownership and borrowing (Soroban-relevant subset)
- Structs, enums, and pattern matching
- Error handling with `Result` and `Option`
- Writing your first Soroban `#[contract]`

### Intermediate: Soroban Fundamentals
> For developers who know Rust basics

- The Soroban execution model and host environment
- Storage types: persistent, temporary, and instance
- Authorization and `require_auth()`
- Soroban tokens and the SEP-41 token interface
- Cross-contract calls
- Writing and running tests with `soroban-sdk` testutils

### Advanced: DeFi Patterns on Soroban
> For developers ready to build production contracts

- Automated Market Makers (AMMs) from scratch
- Lending and collateralization mechanics
- Oracle integration with Pulsar
- DAO governance with Agora
- Security patterns and common vulnerabilities (with Argus)
- Upgradeability and migration patterns

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│     sorolearn-frontend (Next.js + Monaco, in browser)   │
│                                                         │
│   Lesson Content  │  Code Editor  │  Static-Analysis    │
│   (courses.ts)    │  (Monaco)     │  Grader (grader.ts) │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼ learner provides an address
                   ┌─────────────────────────┐
                   │ sorolearn-backend        │
                   │ (admin key never leaves  │
                   │  the server)             │
                   └─────────────────────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │ sorolearn-contract   │
                   │ on Stellar Testnet   │
                   │ (certificate record) │
                   └─────────────────────┘
```

The grader is static analysis, not execution. It checks a submission's structure (macros, signatures, no leftover `todo!()`s), not whether it compiles or runs. Real sandboxed compilation is deliberately not built yet; see Roadmap.

The certificate contract is deployed on testnet at `CCVFIMTLHN2YFVKFITJYU4PWDIGNG2Q7AWWF4GPKBUBQOJEOGRDTIK5K` ([Stellar Expert](https://stellar.expert/explorer/testnet/contract/CCVFIMTLHN2YFVKFITJYU4PWDIGNG2Q7AWWF4GPKBUBQOJEOGRDTIK5K)).

---

## Project Structure

```
sorolearn-frontend/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Home / course catalog
│   │   ├── course/
│   │   │   └── [slug]/[lessonSlug]/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   └── certificate/page.tsx
│   ├── components/
│   │   ├── Editor.tsx        # In-browser code editor (Monaco)
│   │   └── LessonView.tsx    # Challenge, editor, test runner, hints
│   ├── content/              # Lesson writeups (Markdown; see Content Structure)
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── lib/
│       ├── courses.ts        # Curriculum registry (the gradable part of each lesson)
│       ├── grader.ts         # Static-analysis auto-grader
│       └── stellar.ts        # Calls sorolearn-backend's certificate API
├── public/
├── CONTRIBUTING.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+

### Run locally

```bash
git clone https://github.com/sorolearn/sorolearn-frontend.git
cd sorolearn-frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Everything except certificates works on its own. For certificate minting and status, also run [sorolearn-backend](https://github.com/sorolearn/sorolearn-backend) locally. `NEXT_PUBLIC_API_URL` points at it and defaults to `http://localhost:4000`.

### Test and build

```bash
npm run lint
npm test               # or npm run test:coverage
npm run build
```

### Deploying

The app deploys to Vercel (`vercel.json`). Set `NEXT_PUBLIC_API_URL` to the deployed backend's URL before building, because it's baked into the browser bundle at build time. Add the frontend's URL to the backend's `ALLOWED_ORIGINS`.

---

## Content Structure

Each lesson has two parts, and they live in different files:

- **`src/content/<path>/<slug>.md`:** the lesson's explanatory writeup (background, a worked example, the challenge description). It's plain Markdown, not MDX, and the app doesn't parse or render it directly. It's the source that a lesson's `intro` and `challenge` text are written from.
- **`src/lib/courses.ts`:** the registry the app actually reads. It holds each lesson's `intro`, `challenge`, `starterCode`, `hints`, and `checks`. The `checks` are the structural requirements the auto-grader verifies: required attributes and macros, function signatures, forbidden placeholders, and required substrings (see `src/lib/grader.ts`). A lesson with content in the `.md` file but nothing in `courses.ts` renders with generic starter code and generic hints, which has bitten this project more than once.

Adding a new **course** (not just a lesson) also means adding its slug to `src/courses.ts` in sorolearn-backend. Otherwise the backend rejects certificate mints for it.

---

## Contributing Content

The best way to contribute is to add new lessons and challenges:

1. Write the lesson as a `.md` file under `src/content/<beginner|intermediate|advanced>/<slug>.md`, following the structure of an existing lesson in the same path.
2. Add the matching entry to `src/lib/courses.ts`: `intro`, `challenge`, `starterCode`, `hints`, and `checks`. Without this step the lesson exists but can't be graded.
3. Open a pull request. CI runs typecheck, lint, the test suite, and a build on every PR.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guidelines.

---

## Roadmap

- [x] Course catalog homepage
- [x] Beginner learning path (4 lessons)
- [x] In-browser Soroban code editor (Monaco)
- [x] Auto-graded challenge runner (static analysis, not full compilation; see `grader.ts`)
- [x] Intermediate learning path (6 lessons)
- [x] Advanced learning path (6 lessons)
- [x] Progress tracking (local storage)
- [x] On-chain NFT certificate minting (deployed to testnet, admin-signed)
- [x] Separate backend service for certificate signing
- [ ] Verify course completion server-side before minting (the backend currently trusts the request)
- [ ] Progress tracking across devices (needs real accounts in the backend)
- [ ] Community leaderboard backed by real accounts, not local session state
- [ ] Sandboxed contract execution in the backend (real compilation, not static analysis; needs a container, timeout and resource-limit story first)
- [ ] Community content submission workflow beyond "open a PR"

---

## Contributing

Contributions are welcome, whether code, lesson content, or design. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
