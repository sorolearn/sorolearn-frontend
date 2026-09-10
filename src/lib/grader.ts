import type { GradeResult, LessonChecks } from "@/types";

// Static analysis, not compilation: this checks the *shape* of submitted
// code (required macros, function signatures, no leftover placeholders)
// rather than actually building it. Real sandboxed execution of arbitrary
// learner-submitted Rust is a separate, deliberately-deferred piece of work
// (it needs a real container/timeout/resource-limit story before it's safe
// to run server-side) — this is the honest static-analysis step ahead of it.

const PLACEHOLDER_PATTERNS = [/todo!\s*\(/, /unimplemented!\s*\(/, /\/\/\s*your code here/i];

const DELIMITER_PAIRS: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
const OPENERS = new Set(Object.values(DELIMITER_PAIRS));
const CLOSERS = new Set(Object.keys(DELIMITER_PAIRS));

function findUnbalancedDelimiters(code: string): string | null {
  const stack: string[] = [];
  for (const ch of code) {
    if (OPENERS.has(ch)) stack.push(ch);
    else if (CLOSERS.has(ch) && (stack.pop() ?? null) !== DELIMITER_PAIRS[ch]) {
      return "Unbalanced brackets, braces, or parentheses.";
    }
  }
  return stack.length > 0 ? "Unbalanced brackets, braces, or parentheses." : null;
}

export function gradeCode(code: string, checks: LessonChecks = {}): GradeResult {
  const messages: string[] = [];

  if (code.trim().length === 0) {
    return { passed: false, messages: ["The editor is empty."] };
  }

  const balanceError = findUnbalancedDelimiters(code);
  if (balanceError) messages.push(balanceError);

  for (const attribute of checks.requiredAttributes ?? []) {
    if (!code.includes(attribute)) messages.push(`Missing ${attribute}.`);
  }

  for (const fn of checks.requiredFunctions ?? []) {
    // `pub` is optional: contract methods need it, but the earlier plain-Rust
    // fundamentals lessons (no #[contract] yet) use ordinary private fns.
    const signature = new RegExp(`(?:pub\\s+)?fn\\s+${fn.name}\\s*(?:<[^>]*>)?\\s*\\(`);
    if (!signature.test(code)) {
      messages.push(`Missing \`fn ${fn.name}(...)\`.`);
      continue;
    }
    for (const param of fn.params ?? []) {
      if (!code.includes(param)) {
        messages.push(`\`${fn.name}\` should take a parameter like \`${param}\`.`);
      }
    }
  }

  if (checks.forbidPlaceholders && PLACEHOLDER_PATTERNS.some((p) => p.test(code))) {
    messages.push("Replace the placeholder (todo!(), unimplemented!(), or \"your code here\") with real code.");
  }

  for (const substring of checks.requiredSubstrings ?? []) {
    if (!code.toLowerCase().includes(substring.toLowerCase())) {
      messages.push(`Doesn't look complete yet — check for "${substring}".`);
    }
  }

  return { passed: messages.length === 0, messages };
}

export function defaultChecks(): LessonChecks {
  return {
    requiredAttributes: ["#[contract]", "#[contractimpl]"],
    forbidPlaceholders: true,
  };
}
