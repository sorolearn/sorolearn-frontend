# SoroLearn

SoroLearn is an open-source, interactive education platform that teaches developers how to build Soroban smart contracts in Rust — through hands-on coding challenges, an in-browser editor with auto-graded structural checks, structured learning paths, and community-contributed content. No local environment needed to start learning.

---

## Why SoroLearn

Soroban is unique in the blockchain world — it uses Rust and WebAssembly instead of Solidity and the EVM. This means every existing Solidity tutorial, every Ethereum course, every CryptoZombies-style guide is irrelevant to someone learning Soroban. Developers starting on Stellar have almost nowhere to go beyond the official docs.

At the same time, the Stellar Development Foundation is actively trying to onboard new developers into the ecosystem. SoroLearn is the community-owned answer to that need: a structured, interactive, beginner-to-expert curriculum built by Soroban developers, for Soroban developers.

---

## Features

### Learning
- **Structured courses** — progressive curriculum from Rust basics → Soroban fundamentals → advanced DeFi patterns
- **Interactive editor** — write Soroban contract code directly in the browser with real syntax highlighting (Monaco), no local Rust install needed
- **Auto-graded challenges** — static analysis checks your solution's structure (required macros, function signatures, no leftover placeholders) and gives instant, specific feedback — not full compilation, see Roadmap
- **Hints system** — stuck? unlock hints without spoiling the full solution

### Community
- **Leaderboard** — tracks your own session progress today; a real shared leaderboard needs a backend, which doesn't exist yet (see Roadmap)
- **On-chain certificates** — earn an NFT certificate on Stellar when you complete a course
- **Community content** — anyone can contribute new lessons and challenges via pull request

### Platform
- **Progress tracking** — saved locally in your browser; not yet synced across devices (needs real accounts, see Roadmap)
- **Mobile-friendly** — learn on any device
- **Dark mode** — because developers demand it

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

## Contract Details
Contract ID: `CCVFIMTLHN2YFVKFITJYU4PWDIGNG2Q7AWWF4GPKBUBQOJEOGRDTIK5K`
- [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CCVFIMTLHN2YFVKFITJYU4PWDIGNG2Q7AWWF4GPKBUBQOJEOGRDTIK5K)
## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Browser (Next.js + Monaco Editor)          │
│                                                         │
│   Lesson Content  │  Code Editor  │  Static-Analysis    │
│   (courses.ts)    │  (Monaco)     │  Grader (grader.ts) │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼ learner provides an address
                   ┌─────────────────────────┐
                   │ Next.js API route        │
                   │ (admin key never leaves  │
                   │  the server)             │
                   └─────────────────────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │ Stellar Testnet      │
                   │ (certificate NFT    │
                   │  minting on         │
                   │  course completion) │
                   └─────────────────────┘
```

The grader is static analysis, not execution — it checks a submission's structure (macros, signatures, no leftover `todo!()`s), not that it actually compiles or runs. Real sandboxed compilation is intentionally not built yet; see Roadmap.

---

## Project Structure

```
sorolearn/
├── contract/
│   └── certificate/              # Soroban contract: on-chain completion certificates
│       ├── Cargo.toml
│       └── src/
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── page.tsx          # Home / course catalog
│   │   │   ├── course/
│   │   │   │   └── [slug]/[lessonSlug]/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── certificate/page.tsx
│   │   │   └── api/certificate/  # mint/status routes (admin key lives server-side only)
│   │   ├── components/
│   │   │   ├── Editor.tsx        # In-browser code editor (Monaco)
│   │   │   └── LessonView.tsx    # Challenge, editor, test runner, hints
│   │   ├── content/               # Lesson writeups (Markdown, not auto-rendered — see Content Structure)
│   │   │   ├── beginner/
│   │   │   ├── intermediate/
│   │   │   └── advanced/
│   │   └── lib/
│   │       ├── courses.ts        # Curriculum registry (the gradable part of each lesson)
│   │       ├── grader.ts         # Static-analysis auto-grader
│   │       ├── stellar.ts        # Client-side wrapper around api/certificate/*
│   │       └── certificate-contract.ts  # Server-only: signs mint txs with the admin key
│   └── public/
├── CONTRIBUTING.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Rust + the `wasm32v1-none` target and the `stellar` CLI, only if you're working on `contract/`

### Run the frontend locally

```bash
git clone https://github.com/sorolearn/sorolearn.git
cd sorolearn/frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Certificate minting needs `CERTIFICATE_ADMIN_SECRET` and `CERTIFICATE_CONTRACT_ID` set locally (see `src/lib/certificate-contract.ts`) — everything else works without them.

### Test and build

```bash
npm run lint
npm test               # or npm run test:coverage
npm run build
```

### Build and test the contract

```bash
cd sorolearn/contract/certificate
cargo test
cargo llvm-cov --summary-only   # coverage
stellar contract build
```

---

## Content Structure

Each lesson has two parts, and they're not the same file:

- **`frontend/src/content/<path>/<slug>.md`** — the lesson's explanatory writeup (background, a worked example, the challenge description). Plain Markdown, not MDX, and not parsed or rendered by the app directly — it's the source a lesson's `intro`/`challenge` text is written from, and what a learner reads on the lesson page.
- **`frontend/src/lib/courses.ts`** — the actual registry the app reads: each lesson's `intro`, `challenge`, `starterCode`, `hints`, and `checks` (the structural requirements the auto-grader verifies — required attributes/macros, function signatures, forbidden placeholders, required substrings; see `frontend/src/lib/grader.ts`). A lesson with content in the `.md` file but nothing in `courses.ts` will render with generic starter code and generic hints, which has bitten this project more than once.

---

## Contributing Content

The best way to contribute is to add new lessons and challenges:

1. Write the lesson as a `.md` file under `frontend/src/content/<beginner|intermediate|advanced>/<slug>.md`, following the structure of an existing lesson in the same path.
2. Add the matching entry to `frontend/src/lib/courses.ts` — `intro`, `challenge`, `starterCode`, `hints`, and `checks`. Without this step the lesson exists but isn't actually gradable.
3. Open a pull request. CI runs typecheck, lint, the test suite, and a build on every PR.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guidelines.

---

## Roadmap

- [x] Course catalog homepage
- [x] Beginner learning path (4 lessons)
- [x] In-browser Soroban code editor (Monaco)
- [x] Auto-graded challenge runner (static analysis — not full compilation; see `grader.ts`)
- [x] Intermediate learning path (6 lessons)
- [x] Advanced learning path (6 lessons)
- [x] Progress tracking (local storage)
- [x] On-chain NFT certificate minting (deployed to testnet, admin-signed)
- [ ] Progress tracking across devices (needs real accounts/backend)
- [ ] Community leaderboard backed by real accounts, not local session state
- [ ] Sandboxed in-browser/server-side contract execution (real compilation, not static analysis — needs a container/timeout/resource-limit story first)
- [ ] Community content submission workflow beyond "open a PR"

---

## Contributing

Contributions welcome — whether code, lesson content, or design. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
