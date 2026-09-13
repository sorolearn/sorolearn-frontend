# The Soroban Execution Model and Host Environment

**Difficulty:** Intermediate | **Time:** ~25 minutes

## What You'll Learn

- What runs where: your contract's WASM vs. the host's native code
- Why Soroban contracts can't do I/O, randomness, or floating-point math
- How `Env` is your only door into the host environment

## Background

A Soroban contract is compiled to WebAssembly and runs inside a **host** — the Soroban runtime embedded in `stellar-core`. The host is deliberately restrictive, and every restriction exists for the same reason: **every validator on the network must compute the exact same result from the exact same transaction.**

That's why Soroban contracts can't:

- Read files, make network calls, or do any other I/O
- Generate real randomness (there's no source of entropy that every validator would agree on)
- Use floating-point types (`f32`/`f64`) — floating-point rounding isn't guaranteed identical across every CPU architecture that might run a validator

Anything your contract needs from the outside world — the current ledger sequence and timestamp, the invoking account's authorization, persistent storage, cryptographic hashing — comes through one single door: the `Env` type, which is the first argument to every contract function.

```rust
pub fn now(env: Env) -> u64 {
    env.ledger().timestamp()
}
```

`Env` isn't just a storage handle — it's your contract's entire interface to the host: `env.ledger()` for chain state, `env.storage()` for persistence, `env.crypto()` for hashing, `env.events()` for emitting events, and so on. If it isn't reachable through `env`, your contract can't do it.

## Challenge

Write a function `now` that returns the current ledger's Unix timestamp, using `env.ledger().timestamp()`.

### Starter Code

```rust
#![no_std]
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
```
