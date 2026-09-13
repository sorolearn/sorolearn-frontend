# Cross-Contract Calls

**Difficulty:** Intermediate | **Time:** ~20 minutes

## What You'll Learn

- Why contracts call other contracts, and what that costs
- The auto-generated `Client` every `#[contract]` gets for free
- How to call another contract given only its deployed address

## Background

Real Soroban systems are rarely a single contract. A lending protocol calls a token contract to move funds; a router calls a pool contract to execute a swap. Soroban makes this straightforward because every `#[contract]`/`#[contractimpl]` pair automatically generates a matching `Client` type — you never hand-write the plumbing for calling a contract you didn't write yourself.

If a contract is defined as:

```rust
#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn get(env: Env) -> u32 {
        env.storage().instance().get(&symbol_short!("COUNT")).unwrap_or(0)
    }
}
```

then the `#[contractimpl]` macro also generates `CounterContractClient` — a type with a matching `get()` method that builds and dispatches a real cross-contract call. Given only the deployed contract's `Address`, any other contract (or off-chain caller) can use it:

```rust
let client = CounterContractClient::new(&env, &counter_id);
let value = client.get();
```

This is the same client pattern the frontend of this platform uses to call the certificate contract — a generated `Client`, pointed at a deployed contract's address, with typed methods matching its interface exactly.

## Challenge

Given the `CounterContract` above (already defined), write a function `read_counter` that takes the deployed counter's address, `counter_id: Address`, and returns its current count by calling `CounterContractClient`.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env};

#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn get(env: Env) -> u32 {
        env.storage().instance().get(&symbol_short!("COUNT")).unwrap_or(0)
    }
}

pub fn read_counter(env: Env, counter_id: Address) -> u32 {
    // your code here
    todo!()
}
```
