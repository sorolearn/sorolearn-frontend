# Upgradeability and Migration Patterns

**Difficulty:** Advanced | **Time:** ~25 minutes

## What You'll Learn

- Why a contract's address can stay fixed while its code changes
- `env.deployer().update_current_contract_wasm(...)` and what it does (and doesn't) touch
- Why an upgrade function is one of the highest-value auth checks in a whole contract

## Background

A deployed Soroban contract's address is derived once, at deployment, and everyone who integrates with it — other contracts, wallets, off-chain services — depends on that address staying stable. But bugs get found and features get added, so Soroban gives contracts a way to swap their code in place: `env.deployer().update_current_contract_wasm(new_wasm_hash)` points the contract's address at a new WASM binary, while its address and all of its existing storage stay exactly where they were.

That last part is worth sitting with: **storage isn't touched by an upgrade.** The new code sees whatever the old code left in storage — which is powerful (you don't lose state), but also means an upgrade that changes what a storage key is expected to contain needs its own explicit migration logic, not just new code and a wish.

The other thing worth sitting with: if `update_current_contract_wasm` isn't gated behind authorization, upgradeability isn't a feature — it's a complete, silent takeover vector. Anyone who can call an ungated upgrade function can replace your contract's logic with anything they want, keeping your users, your storage, and your reputation. This is why an upgrade function's `require_auth()` check is arguably the single highest-stakes auth check a contract can have.

## Challenge

Write an `upgrade` function that requires the `admin`'s authorization, then upgrades the contract's code to `new_wasm_hash` using `env.deployer().update_current_contract_wasm(...)`.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Address, BytesN, Env};

#[contract]
pub struct UpgradeableContract;

#[contractimpl]
impl UpgradeableContract {
    pub fn upgrade(env: Env, admin: Address, new_wasm_hash: BytesN<32>) {
        // your code here
        todo!()
    }
}
```
