# Rust Ownership and Borrowing

**Difficulty:** Beginner | **Time:** ~25 minutes

## What You'll Learn

- What "ownership" means in Rust, and why it exists
- The difference between moving a value and borrowing it with `&`
- Why Soroban contracts lean on borrowing to avoid unnecessary copies

## Background

Rust has no garbage collector, and no manual `free()` either. Instead, every value has exactly one **owner**, and the value is cleaned up automatically when its owner goes out of scope. This is what lets Soroban contracts run predictably inside a metered WASM host — there's no GC pause to account for, and no dangling pointers to worry about.

Two consequences follow from that one rule:

**1. Moving.** When you pass a value like a `String` or `Vec` to a function by value, ownership moves into that function. The original variable can no longer be used:

```rust
let name = String::from("Alice");
consume(name);
// name can't be used here anymore — it moved into consume()
```

**2. Borrowing.** Most of the time you don't want to give up ownership just to let a function look at your data. That's what references (`&`) are for — a borrow lets a function read (or, with `&mut`, modify) a value without taking ownership of it:

```rust
fn print_len(s: &str) -> usize {
    s.len() // just reading — the caller still owns the String afterward
}

let name = String::from("Alice");
print_len(&name); // borrowed, not moved
println!("{}", name); // still valid — we never gave it up
```

Soroban contracts follow the same rules as any other Rust code. In practice, this means: prefer borrowing (`&T`) over taking ownership (`T`) in function parameters whenever the function only needs to *read* the value, and reserve owned parameters for when the function actually needs to consume or store the value.

## Challenge

Write a function `longest` that takes two string slices, `a: &str` and `b: &str`, and returns whichever one is longer — without taking ownership of either argument.

Because the returned reference has to point at data borrowed from one of the two inputs, both parameters and the return type share the same lifetime, written `'a`.

### Starter Code

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    // your code here
    todo!()
}
```

### Tests That Must Pass

```rust
#[test]
fn test_longest() {
    assert_eq!(longest("hi", "hello"), "hello");
    assert_eq!(longest("same", "size"), "same");
}
```
