# Oracle Integration with Pulsar

**Difficulty:** Advanced | **Time:** ~25 minutes

## What You'll Learn

- Why price-dependent contracts need an external oracle
- How to call an oracle contract using the client pattern from the cross-contract-calls lesson
- Why "no price available" has to be handled explicitly, not assumed away

## Background

A contract that liquidates undercollateralized loans, or prices an AMM trade against a reference rate, needs to know an asset's price — and the Soroban host deliberately has no way to fetch that itself (no I/O, remember). The price has to come from another contract: an **oracle**, like the Pulsar price feeds referenced elsewhere on this platform.

Calling an oracle uses exactly the client pattern from the cross-contract-calls lesson — the oracle is just another deployed contract with an auto-generated client:

```rust
let price: Option<i128> = OracleContractClient::new(&env, &oracle_id).price(&asset);
```

Notice the return type: `Option<i128>`, not `i128`. This matters more here than almost anywhere else in this curriculum. An oracle might not have a price for every asset, might be temporarily stale, or might simply not have been asked about this asset yet — and code that silently treats a missing price as `0` can trigger cascading bad decisions (a "price" of zero looks like the asset just became worthless, which could trigger surprise liquidations). Handling the `None` case explicitly, rather than unwrapping and hoping, is the entire point of this lesson.

## Challenge

Given the `OracleContract` below (already defined), write a function `get_price_or_default` that calls its `price(asset)` method through `OracleContractClient` and returns `default` if no price is available.

### Starter Code

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct OracleContract;

#[contractimpl]
impl OracleContract {
    pub fn price(env: Env, asset: Symbol) -> Option<i128> {
        env.storage().instance().get(&asset)
    }
}

fn get_price_or_default(env: Env, oracle_id: Address, asset: Symbol, default: i128) -> i128 {
    // your code here
    todo!()
}
```
