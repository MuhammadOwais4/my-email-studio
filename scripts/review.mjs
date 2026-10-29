// Review every email in a campaign folder with Claude Code, without anyone typing.
// Usage: node scripts/review.mjs campaigns/<campaign-folder>
// Saves the findings to review/findings.json.
// Exit codes: 0 = no high-severity findings, 1 = at least one high finding, 2 = the review itself failed.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];

if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}
if (!existsSync(join(root, folder))) {
  console.error(`Folder not found: ${folder}`);
  process.exit(2);
}

// On Windows, `claude` is a .cmd wrapper that Node can't run without a shell.
// Find the real claude.exe so the schema text is passed through untouched.
function findClaude() {
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN;
  if (process.platform !== "win32") return "claude";
  for (const dir of (process.env.PATH || "").split(delimiter)) {
    const candidates = [
      join(dir, "claude.exe"),
      join(dir, "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe"),
    ];
    const found = candidates.find((p) => existsSync(p));
    if (found) return found;
  }
  return "claude";
}

const schema = readFileSync(join(root, "review", "findings.schema.json"), "utf8");
const prompt =
  `Review every email in ${folder} against brand/kettlebird-voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

const run = spawnSync(
  findClaude(),
  ["-p", prompt, "--output-format", "json", "--json-schema", schema, "--allowedTools", "Read,Glob,Grep"],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
);

if (run.error) {
  console.error(`Could not start Claude Code: ${run.error.message}`);
  process.exit(2);
}

// The output is either one result object, or a list whose last item is the result.
let output;
try {
  output = JSON.parse(run.stdout);
} catch {
  console.error("Claude Code did not return JSON.");
  console.error(run.stderr || run.stdout);
  process.exit(2);
}
const result = Array.isArray(output) ? output.at(-1) : output;
const findings = result?.structured_output?.findings;

if (!Array.isArray(findings)) {
  console.error("No structured findings in the result.");
  console.error(JSON.stringify(result, null, 2));
  process.exit(2);
}

mkdirSync(join(root, "review"), { recursive: true });
writeFileSync(join(root, "review", "findings.json"), JSON.stringify(result.structured_output, null, 2) + "\n");

const count = (level) => findings.filter((f) => f.severity === level).length;
const high = count("high");
console.log(
  `${folder}: ${findings.length} finding(s) — ${high} high, ${count("medium")} medium, ${count("low")} low. Saved to review/findings.json.`,
);

process.exit(high > 0 ? 1 : 0);
