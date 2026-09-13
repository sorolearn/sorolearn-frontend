# Soroban Tokens and the SEP-41 Token Interface

**Difficulty:** Intermediate | **Time:** ~25 minutes

## What You'll Learn

- What SEP-41 standardizes, and why a shared interface matters
- The core functions every SEP-41 token implements
- How to read a token balance from persistent storage

## Background

Stellar's native asset (XLM) and its classic assets aren't the only things that can move value on the network — Soroban contracts can implement tokens directly. **SEP-41** is the Stellar Ecosystem Proposal that standardizes what a Soroban token contract's interface looks like, so that wallets, DEXs, and other contracts can all interact with any SEP-41 token the same way, without knowing anything about its internals.

A SEP-41 token implements functions like:

```rust
fn balance(env: Env, id: Address) -> i128;
fn transfer(env: Env, from: Address, to: Address, amount: i128);
fn approve(env: Env, from: Address, spender: Address, amount: i128, live_until_ledger: u32);
fn allowance(env: Env, from: Address, spender: Address) -> i128;
```

Notice what's *not* in that list: nothing about how balances are stored internally. That's the point of a standard interface — any contract that wants to move a SEP-41 token just calls `.transfer(...)` on it, the same way, regardless of which specific token it is.

Balances themselves are usually kept in persistent storage, keyed by the holder's `Address`:

```rust
fn balance(env: Env, id: Address) -> i128 {
    let key = DataKey::Balance(id);
    env.storage().persistent().get(&key).unwrap_or(0)
}
```

An address with no balance entry yet isn't an error — it simply has a balance of `0`.

## Challenge

Write a function `balance` that reads a `DataKey::Balance(id)` entry from persistent storage and returns the stored `i128`, defaulting to `0` if nothing has been stored for that address yet.

### Starter Code

```rust
#![no_std]
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
```
