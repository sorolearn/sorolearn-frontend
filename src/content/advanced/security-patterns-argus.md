# Security Patterns and Common Vulnerabilities (with Argus)

**Difficulty:** Advanced | **Time:** ~30 minutes

## What You'll Learn

- Why silent balance underflow is a real Soroban vulnerability, not just a Rust footgun
- `checked_sub` vs. plain `-` for arithmetic that touches money
- The audit habit — like the one an Argus-style review applies — of asking "what if this number goes negative?"

## Background

This platform's contract-checking tools (in the spirit of an Argus-style audit) look for a small set of patterns over and over, because they cause most real Soroban incidents: missing `require_auth()` (covered in the Authorization lesson), reentrancy, and unchecked arithmetic.

Unchecked arithmetic deserves its own lesson because it's easy to get subtly wrong even when you know to look for it. Consider a `debit` function:

```rust
// VULNERABLE: no check that `balance` actually covers `amount`
pub fn debit(env: Env, key: Symbol, amount: i128) {
    let balance: i128 = env.storage().persistent().get(&key).unwrap_or(0);
    env.storage().persistent().set(&key, &(balance - amount));
}
```

With `overflow-checks` enabled (the default for this platform's contracts — see `Cargo.toml`), `balance - amount` going negative doesn't silently wrap; it panics and aborts the transaction. That's *better* than silent corruption, but it's still the wrong failure mode: the contract aborts with a generic arithmetic-overflow panic instead of a clear, intentional error, and — depending on how the caller and surrounding code are structured — that panic can happen after other state has already changed, leaving things half-updated.

The fix is to make the check explicit and first:

```rust
pub fn debit(env: Env, key: Symbol, amount: i128) {
    let balance: i128 = env.storage().persistent().get(&key).unwrap_or(0);
    let new_balance = balance.checked_sub(amount).expect("insufficient balance");
    env.storage().persistent().set(&key, &new_balance);
}
```

`checked_sub` returns `None` instead of panicking on underflow, so the failure is a value you control rather than a trap the runtime hits for you. Whether you turn that `None` into a clear panic message (as above) or a `Result` your caller has to handle, the point is the same: the contract decided how to fail, instead of finding out by accident.

## Challenge

Fix the vulnerable `debit` function below: use `checked_sub` and only write the new balance if the subtraction succeeds, panicking with a clear message (`.expect("insufficient balance")`) otherwise.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct WalletContract;

#[contractimpl]
impl WalletContract {
    // VULNERABLE: no check that `balance` actually covers `amount`
    pub fn debit(env: Env, key: Symbol, amount: i128) {
        // your code here
        todo!()
    }
}
```
