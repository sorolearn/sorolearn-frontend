import { describe, expect, it } from "vitest";
import { defaultChecks, gradeCode } from "./grader";

const VALID_GREET_CONTRACT = `#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct GreetContract;

#[contractimpl]
impl GreetContract {
    pub fn greet(env: Env, name: String) -> String {
        String::from_str(&env, "Welcome to Soroban, friend!")
    }
}
`;

describe("gradeCode", () => {
  it("fails empty submissions", () => {
    const result = gradeCode("", defaultChecks());
    expect(result.passed).toBe(false);
    expect(result.messages).toContain("The editor is empty.");
  });

  it("fails on unbalanced delimiters", () => {
    const result = gradeCode("#[contract]\npub struct Foo {", defaultChecks());
    expect(result.passed).toBe(false);
    expect(result.messages).toContain("Unbalanced brackets, braces, or parentheses.");
  });

  it("passes balanced delimiters", () => {
    const result = gradeCode("fn foo() { let x = (1 + 2) * [3, 4].len(); }", {});
    expect(result.messages).not.toContain("Unbalanced brackets, braces, or parentheses.");
  });

  it("flags each missing required attribute individually", () => {
    const result = gradeCode("pub struct Foo;", {
      requiredAttributes: ["#[contract]", "#[contractimpl]"],
    });
    expect(result.passed).toBe(false);
    expect(result.messages).toContain("Missing #[contract].");
    expect(result.messages).toContain("Missing #[contractimpl].");
  });

  it("requires the exact function signature, not just the name", () => {
    const result = gradeCode("pub fn greet_something_else() {}", {
      requiredFunctions: [{ name: "greet" }],
    });
    expect(result.passed).toBe(false);
    expect(result.messages).toContain("Missing `pub fn greet(...)`.");
  });

  it("checks required function parameters separately from the signature", () => {
    const result = gradeCode("pub fn greet(env: Env) -> String { todo!() }", {
      requiredFunctions: [{ name: "greet", params: ["name"] }],
    });
    expect(result.passed).toBe(false);
    expect(result.messages).toContain("`greet` should take a parameter like `name`.");
  });

  it("flags leftover placeholders when forbidPlaceholders is set", () => {
    for (const placeholder of ["todo!()", "unimplemented!()", "// your code here"]) {
      const result = gradeCode(`pub fn greet() { ${placeholder} }`, { forbidPlaceholders: true });
      expect(result.passed).toBe(false);
      expect(result.messages.some((m) => m.includes("placeholder"))).toBe(true);
    }
  });

  it("does not flag placeholders when forbidPlaceholders is unset", () => {
    const result = gradeCode("pub fn greet() { todo!() }", {});
    expect(result.messages.some((m) => m.includes("placeholder"))).toBe(false);
  });

  it("flags a missing required substring case-insensitively", () => {
    const passing = gradeCode("returns WELCOME TO SOROBAN, friend", {
      requiredSubstrings: ["Welcome to Soroban"],
    });
    expect(passing.passed).toBe(true);

    const failing = gradeCode("returns something else entirely", {
      requiredSubstrings: ["Welcome to Soroban"],
    });
    expect(failing.passed).toBe(false);
  });

  it("passes a fully correct submission against the real first-contract checks", () => {
    const result = gradeCode(VALID_GREET_CONTRACT, {
      requiredAttributes: ["#[contract]", "#[contractimpl]"],
      requiredFunctions: [{ name: "greet", params: ["name"] }],
      requiredSubstrings: ["Welcome to Soroban"],
      forbidPlaceholders: true,
    });
    expect(result).toEqual({ passed: true, messages: [] });
  });
});

describe("defaultChecks", () => {
  it("requires the contract macros and forbids placeholders", () => {
    expect(defaultChecks()).toEqual({
      requiredAttributes: ["#[contract]", "#[contractimpl]"],
      forbidPlaceholders: true,
    });
  });
});
