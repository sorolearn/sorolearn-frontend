# Automated Market Makers (AMMs) from Scratch

**Difficulty:** Advanced | **Time:** ~35 minutes

## What You'll Learn

- The constant-product formula (`x * y = k`) that powers most on-chain exchanges
- How a swap's output amount is derived from that formula
- Why the multiply-then-divide order matters for integer math

## Background

An automated market maker doesn't use an order book — it holds two reserves (say, token A and token B) and prices trades so that the product of the two reserves stays constant. If a pool holds `reserve_in` of the token you're selling and `reserve_out` of the token you're buying, then after your trade the product must still equal `reserve_in * reserve_out` (ignoring fees, which real pools layer on top of this).

Solving for the output amount given an input amount:

```
amount_out = (amount_in * reserve_out) / (reserve_in + amount_in)
```

The larger a trade is relative to the pool's reserves, the worse its effective price gets — that's slippage, and it falls directly out of this formula. A tiny trade against deep reserves barely moves the price; a trade that's a large fraction of `reserve_in` eats into `amount_out` disproportionately.

One implementation detail matters a lot in a Soroban contract: **multiply before you divide.** `i128` arithmetic is integer arithmetic — `amount_in / reserve_in * reserve_out` throws away a remainder before you're done with it, and can be meaningfully less accurate than `amount_in * reserve_out / reserve_in`.

## Challenge

Write a function `get_amount_out` that takes `amount_in`, `reserve_in`, and `reserve_out` (all `i128`) and returns the output amount using the constant-product formula above.

### Starter Code

```rust
fn get_amount_out(amount_in: i128, reserve_in: i128, reserve_out: i128) -> i128 {
    // your code here
    todo!()
}
```
