# Authorization & require_auth()

**Difficulty:** Intermediate | **Time:** ~25 minutes

## What You'll Learn

- How Soroban's authorization model works
- How to use `env.require_auth()` to gate state mutations
- Why missing auth checks are the #1 Soroban vulnerability

## Background

In Soroban, **authorization is explicit**. If your function changes state, you must call `env.require_auth(&address)` before doing so. If the transaction was not signed by that address, the call will abort.

This is different from Ethereum's `msg.sender` — in Soroban, you must explicitly declare who you expect to authorize the call.

### Correct Pattern

```rust
pub fn withdraw(env: Env, caller: Address, amount: i128) {
    // Always auth before any state change
    env.require_auth(&caller);

    let key = symbol_short!("BAL");
    let balance: i128 = env.storage().persistent().get(&key).unwrap_or(0);
    env.storage().persistent().set(&key, &(balance - amount));
}
```

### Vulnerable Pattern (Missing Auth)

```rust
// DANGEROUS: anyone can call this and drain the contract
pub fn withdraw(env: Env, amount: i128) {
    let key = symbol_short!("BAL");
    let balance: i128 = env.storage().persistent().get(&key).unwrap_or(0);
    env.storage().persistent().set(&key, &(balance - amount));
}
```

## Challenge

Fix the vulnerable `withdraw` function above by adding the correct authorization check.

The fixed function should:
1. Accept a `caller: Address` parameter
2. Call `env.require_auth(&caller)` before reading or writing storage
3. Pass the test below

### Tests That Must Pass

```rust
#[test]
fn test_withdraw_requires_auth() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, VaultContract);
    let client = VaultContractClient::new(&env, &contract_id);
    let caller = Address::generate(&env);
    // Should succeed when auth is mocked
    client.withdraw(&caller, &500_i128);
}
```
