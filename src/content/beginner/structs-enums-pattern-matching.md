# Structs, Enums, and Pattern Matching

**Difficulty:** Beginner | **Time:** ~20 minutes

## What You'll Learn

- How to group related data with a `struct`
- How to model "one of several possibilities" with an `enum`
- How to destructure both with `match`

## Background

Soroban contracts constantly need to represent two different shapes of data: **records** (a fixed bundle of fields that always exist together) and **choices** (a value that's exactly one of several known variants). Rust gives you a dedicated tool for each.

**Structs** group fields together, the same way you'd reach for an object in most other languages:

```rust
struct Balance {
    amount: i128,
    locked: bool,
}
```

**Enums** describe a fixed set of alternatives — and unlike many languages, each variant can carry its own data:

```rust
enum Direction {
    North,
    South,
    East,
    West,
}
```

Where Rust really earns its keep is `match`. It forces you to handle every variant of an enum — miss one, and the compiler refuses to build. This is a big part of why Soroban contracts are less prone to the "forgot to handle a case" bugs that plague dynamically-typed contract languages:

```rust
fn as_arrow(dir: Direction) -> &'static str {
    match dir {
        Direction::North => "^",
        Direction::South => "v",
        Direction::East => ">",
        Direction::West => "<",
        // omitting a variant here is a compile error, not a runtime surprise
    }
}
```

## Challenge

Define the `Direction` enum from above (`North`, `South`, `East`, `West`), then write a function `opposite` that takes a `Direction` and returns the opposite one — `North` and `South` swap, `East` and `West` swap. Use a `match` expression.

### Starter Code

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn opposite(dir: Direction) -> Direction {
    // your code here
    todo!()
}
```

### Tests That Must Pass

```rust
#[test]
fn test_opposite() {
    assert!(matches!(opposite(Direction::North), Direction::South));
    assert!(matches!(opposite(Direction::East), Direction::West));
}
```
