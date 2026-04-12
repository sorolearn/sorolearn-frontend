# Your First Soroban Contract

**Difficulty:** Beginner | **Time:** ~20 minutes

## What You'll Learn

- The structure of a Soroban smart contract
- How to define a `#[contract]` and `#[contractimpl]`
- How to deploy and invoke a contract on Testnet

## Background

Soroban is Stellar's smart contract platform. Contracts are written in **Rust** and compiled to **WebAssembly (WASM)**. If you've never written Rust before, don't worry — Soroban only requires a small, learnable subset.

Every Soroban contract has the same skeleton:

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, name: soroban_sdk::String) -> soroban_sdk::String {
        soroban_sdk::String::from_str(&env, &format!("Hello, {}!", name))
    }
}
```

- `#![no_std]` — Soroban contracts don't use the Rust standard library
- `#[contract]` — marks the struct as a Soroban contract
- `#[contractimpl]` — marks the impl block that defines callable functions
- `Env` — the first argument of every contract function; gives you access to storage, auth, and more

## Challenge

Write a Soroban contract with a function `greet` that takes a `name: String` and returns `"Welcome to Soroban, <name>!"`.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct GreetContract;

#[contractimpl]
impl GreetContract {
    pub fn greet(env: Env, name: String) -> String {
        // your code here
        todo!()
    }
}
```

### Tests That Must Pass

```rust
#[test]
fn test_greet() {
    let env = Env::default();
    let contract_id = env.register_contract(None, GreetContract);
    let client = GreetContractClient::new(&env, &contract_id);
    let result = client.greet(&String::from_str(&env, "Alice"));
    assert_eq!(result, String::from_str(&env, "Welcome to Soroban, Alice!"));
}
```
