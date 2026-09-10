# Error Handling with Result and Option

**Difficulty:** Beginner | **Time:** ~20 minutes

## What You'll Learn

- Why Rust (and Soroban) don't use exceptions
- `Option<T>` for "a value might not be there"
- `Result<T, E>` for "an operation might fail, and here's why"

## Background

Rust has no `try`/`catch`. Instead, the possibility of absence or failure is baked directly into a function's return type, and the compiler forces you to deal with it before you can use the value. This matters even more in a Soroban contract than in ordinary code — an unhandled panic aborts the entire transaction, so being explicit about what can go wrong is how you keep a contract predictable.

**`Option<T>`** represents a value that might not exist:

```rust
fn find_owner(id: u32) -> Option<Address> {
    if id == 0 {
        None
    } else {
        Some(some_address)
    }
}
```

**`Result<T, E>`** represents an operation that might fail, and carries a reason when it does:

```rust
fn withdraw(balance: i128, amount: i128) -> Result<i128, String> {
    if amount > balance {
        Err(String::from("insufficient funds"))
    } else {
        Ok(balance - amount)
    }
}
```

Both types force the caller to handle the failure case — via `match`, `if let`, or the `?` operator — before they can get at the success value. There's no way to accidentally treat a missing or failed result as if it succeeded.

## Challenge

Write a function `safe_divide` that takes two `i64` values, `a` and `b`, and returns `Result<i64, String>`: `Ok(a / b)` if `b` isn't zero, or `Err("division by zero".to_string())` if it is.

### Starter Code

```rust
fn safe_divide(a: i64, b: i64) -> Result<i64, String> {
    // your code here
    todo!()
}
```

### Tests That Must Pass

```rust
#[test]
fn test_safe_divide() {
    assert_eq!(safe_divide(10, 2), Ok(5));
    assert_eq!(safe_divide(1, 0), Err("division by zero".to_string()));
}
```
