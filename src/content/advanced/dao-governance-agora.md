# DAO Governance with Agora

**Difficulty:** Advanced | **Time:** ~25 minutes

## What You'll Learn

- The two conditions every simple governance proposal needs to pass
- Why quorum exists even when a proposal is unanimously popular
- How to keep proposal-passing logic separate from vote-counting logic

## Background

Governance contracts — like the Agora pattern referenced elsewhere on this platform — let token holders vote on proposals that change something about a protocol: a parameter, an upgrade, a treasury spend. A proposal passing isn't just "more yes than no" — it's the combination of two independent conditions:

1. **A majority**: strictly more `yes` votes than `no` votes.
2. **Quorum**: total turnout (`yes + no`) has to meet some minimum, regardless of how the vote split.

Quorum exists specifically to stop a proposal from passing on a handful of votes just because nobody else showed up. A proposal with 3 yes votes and 0 no votes is unanimous — and still shouldn't pass on its own if the DAO requires, say, 1,000 tokens' worth of turnout to make a decision binding.

Keeping this as a pure function of vote tallies (rather than reaching into storage itself) makes it trivial to unit test every combination of votes and quorum without touching `Env` at all — a pattern worth reusing any time contract logic doesn't actually need host access.

## Challenge

Write a function `has_passed` that takes `yes_votes`, `no_votes`, and `quorum` (all `i128`) and returns `true` only if `yes_votes` exceeds `no_votes` **and** total turnout meets `quorum`.

### Starter Code

```rust
fn has_passed(yes_votes: i128, no_votes: i128, quorum: i128) -> bool {
    // your code here
    todo!()
}
```
