# Storage in Soroban

**Difficulty:** Intermediate | **Time:** ~20 minutes

## What You'll Learn

- The three storage types: persistent, temporary, and instance
- When to use each storage type
- How to read and write contract state

## Background

Soroban contracts have three distinct storage tiers, each with different cost, lifetime, and eviction behavior:

| Type | Lifetime | Use for |
|------|----------|---------|
| **Persistent** | Kept until explicitly removed or expired | Long-lived data: balances, ownership |
| **Temporary** | Evicted after a TTL | Short-lived data: sessions, nonces |
| **Instance** | Lives as long as the contract | Contract configuration |

### Writing to Storage

```rust
let key = symbol_short!("BALANCE");
env.storage().persistent().set(&key, &1000_i128);
```

### Reading from Storage

```rust
let balance: i128 = env.storage()
    .persistent()
    .get(&key)
    .unwrap_or(0);
```

## Challenge

Write a contract with two functions:
- `set_value(env, key: Symbol, value: i128)` — stores a value by key in persistent storage
- `get_value(env, key: Symbol) -> i128` — retrieves it, returning `0` if not set

### Starter Code

```rust
#![no_std]
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
```
