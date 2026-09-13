# Writing and Running Tests with soroban-sdk testutils

**Difficulty:** Intermediate | **Time:** ~25 minutes

## What You'll Learn

- Why Soroban contracts are tested in-process instead of against a live network
- How to spin up an `Env`, register a contract, and get a client
- How `mock_all_auths()` lets you test `require_auth()`-gated functions

## Background

You don't need a running Stellar node to test a Soroban contract. The `testutils` feature of `soroban-sdk` gives you an in-memory host that behaves like the real one — same storage semantics, same authorization rules, same execution model — but runs entirely inside `cargo test`.

A typical test has three parts: build an environment, register the contract, and call it through its generated client.

```rust
use soroban_sdk::testutils::Address as _;

#[test]
fn test_increment() {
    let env = Env::default();
    let contract_id = env.register(CounterContract, ());
    let client = CounterContractClient::new(&env, &contract_id);

    client.increment();
    let second = client.increment();

    assert_eq!(second, 2);
}
```

If the function under test calls `env.require_auth(...)`, your test needs to either provide a real mock authorization or bypass the check entirely with `env.mock_all_auths()` — calling it once at the start of a test authorizes every `require_auth()` call made during it, which is exactly what you want when you're testing the function's *logic*, not its auth-checking.

## Challenge

Given the `CounterContract` below (already defined, with an `increment` function that returns the new count), write a test `test_increment` that registers it, calls `increment()` twice, and asserts the second call returns `2`.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env};

#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn increment(env: Env) -> u32 {
        let key = symbol_short!("COUNT");
        let count: u32 = env.storage().instance().get(&key).unwrap_or(0) + 1;
        env.storage().instance().set(&key, &count);
        count
    }
}

#[test]
fn test_increment() {
    // your code here
    todo!()
}
```
