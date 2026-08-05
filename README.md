# SoroLearn

SoroLearn is an open-source, interactive education platform that teaches developers how to build Soroban smart contracts in Rust — through hands-on coding challenges, in-browser execution, structured learning paths, and community-contributed content. No local environment needed to start learning.

---

## Table of Contents

- [Why SoroLearn](#why-sorolearn)
- [Features](#features)
- [Learning Paths](#learning-paths)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Content Structure](#content-structure)
- [Contributing Content](#contributing-content)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why SoroLearn

Soroban is unique in the blockchain world — it uses Rust and WebAssembly instead of Solidity and the EVM. This means every existing Solidity tutorial, every Ethereum course, every CryptoZombies-style guide is irrelevant to someone learning Soroban. Developers starting on Stellar have almost nowhere to go beyond the official docs.

At the same time, the Stellar Development Foundation and the Drips Wave program are actively trying to onboard new developers into the ecosystem. SoroLearn is the community-owned answer to that need: a structured, interactive, beginner-to-expert curriculum built by Soroban developers, for Soroban developers.

---

## Features

### Learning
- **Structured courses** — progressive curriculum from Rust basics → Soroban fundamentals → advanced DeFi patterns
- **Interactive editor** — write and run Soroban contract code directly in the browser (no local Rust install needed)
- **Auto-graded challenges** — submit your solution and get instant, automated feedback
- **Hints system** — stuck? unlock hints without spoiling the full solution

### Community
- **Community leaderboard** — see top contributors and learners
- **On-chain certificates** — earn an NFT certificate on Stellar when you complete a course
- **Community content** — anyone can contribute new lessons and challenges via pull request

### Platform
- **Progress tracking** — your progress is saved and synced across devices
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

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Browser (Next.js + Monaco Editor)          │
│                                                         │
│   Lesson Content  │  Code Editor  │  Test Runner UI     │
└─────────────────────────────────────────────────────────┘
         │                  │
         ▼                  ▼
┌────────────────┐  ┌────────────────────────────────────┐
│  MDX Lessons   │  │   In-Browser Soroban Sandbox       │
│  (content/*)   │  │   (WASM compiled in the browser    │
│                │  │    via WebAssembly + WASI)          │
└────────────────┘  └────────────────────────────────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │ Stellar Testnet      │
                   │ (certificate NFT    │
                   │  minting on         │
                   │  course completion) │
                   └─────────────────────┘
```

---

## Project Structure

```
sorolearn/
├── package.json
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Home / course catalog
│   │   ├── course/
│   │   │   └── [slug]/page.tsx   # Individual lesson page
│   │   └── leaderboard/page.tsx
│   ├── components/
│   │   ├── Editor.tsx            # Monaco-based code editor
│   │   ├── TestRunner.tsx        # Challenge auto-grader UI
│   │   └── CourseCard.tsx
│   ├── content/                  # Lesson and challenge content (MDX)
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── lib/
│       ├── sandbox.ts            # In-browser Soroban execution
│       └── stellar.ts            # NFT certificate minting
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+

### Run Locally

```bash
git clone https://github.com/your-org/sorolearn.git
cd sorolearn
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Content Structure

Each lesson lives in `src/content/` as an MDX file with the following frontmatter:

```mdx
---
title: "Your First Soroban Contract"
path: beginner/first-contract
difficulty: beginner
estimatedMinutes: 20
---

## Introduction

...lesson content here...

## Challenge

Write a Soroban contract that stores and retrieves a number.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct MyContract;

#[contractimpl]
impl MyContract {
    // your code here
}
```

### Tests

```rust
// tests that must pass for the challenge to be marked complete
```
```

---

## Contributing Content

The best way to contribute is to add new lessons and challenges. All content lives in `src/content/` as MDX files. You don't need to know how the platform works — just write a lesson following the structure above and open a pull request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full content guidelines.

---

## Roadmap

- [ ] Course catalog homepage
- [ ] Beginner learning path (5 lessons)
- [ ] In-browser Soroban code editor (Monaco)
- [ ] Auto-graded challenge runner
- [ ] Intermediate learning path (8 lessons)
- [ ] Progress tracking (local storage → authenticated)
- [ ] On-chain NFT certificate minting
- [ ] Community leaderboard
- [ ] Advanced DeFi patterns course
- [ ] Community content submission workflow

---

## Contributing

Contributions welcome — whether code, lesson content, or design. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](./LICENSE).
