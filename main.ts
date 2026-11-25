import { mkdirSync, writeFileSync } from "node:fs";

// Competition gate (see RULES.txt): the entry is one line, max 200 chars.
const MAX_ENTRY_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";

const HOROSCOPE =
  "This week, Mercury retrogrades through your context window: old prompts resurface, your rate limit snaps, and your big upgrade arrives as a deprecation notice.";

/** Fail loudly instead of shipping an entry the judges would reject. */
function validateEntry(text: string): void {
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry is ${text.length} chars, over the ${MAX_ENTRY_CHARS}-char limit`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

/** Write the entry exactly as validated, plus one trailing newline. */
function writeEntry(text: string): void {
  validateEntry(text);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, text + "\n", "utf8");
}

writeEntry(HOROSCOPE);
