# Lending and Collateralization Mechanics

**Difficulty:** Advanced | **Time:** ~35 minutes

## What You'll Learn

- Why lending protocols require over-collateralization
- How a collateral ratio is calculated and expressed
- The condition that triggers liquidation

## Background

A lending protocol lets you borrow against collateral you've deposited — but unlike a bank loan, there's no credit check, so the protocol's only real security is the collateral itself. If the value of what you've borrowed ever gets too close to the value of what you've put up, the protocol needs to be able to liquidate the position before it goes underwater (collateral worth less than the debt).

The core number is the **collateral ratio** — collateral value divided by debt value, usually expressed in basis points (1 basis point = 0.01%, so 15000 bps = 150%):

```
collateral_ratio_bps = collateral_value * 10000 / debt_value
```

A protocol sets a **minimum collateral ratio** — say 150%. If a position's ratio falls below that minimum, it's undercollateralized and becomes eligible for liquidation: anyone can repay part of the debt and claim a discounted slice of the collateral, which is what keeps the protocol solvent even in a falling market.

A position with zero debt can't be undercollateralized by definition — there's nothing at risk yet, regardless of how much or how little collateral is deposited.

## Challenge

Write a function `is_undercollateralized` that takes `collateral_value`, `debt_value`, and `min_collateral_ratio_bps` (all `i128`) and returns `true` if the position's collateral ratio has fallen below the minimum.

### Starter Code

```rust
fn is_undercollateralized(collateral_value: i128, debt_value: i128, min_collateral_ratio_bps: i128) -> bool {
    // your code here
    todo!()
}
```
