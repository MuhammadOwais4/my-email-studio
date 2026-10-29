# My Email Studio

A small email studio built with Claude Code, following the Email Studio Lab project.

## What's inside

- **CLAUDE.md**: studio rules, and a "Brands and campaigns" table that points each brand to its voice file.
- **brand/**: voice files for Soft-Technix and Kettlebird Tea.
- **leads/**: a practice lead list (all addresses at example.com) with consent and group columns.
- **campaigns/steep-club-launch/**: a four-week Kettlebird campaign: plan, four emails, and personalized versions for three audience groups.
- **campaigns/test-bad/**: a deliberately bad email used to test the review script.
- **.claude/rules/emails.md**: rules that apply only to campaign emails.
- **.claude/skills/personalize/**: a skill that rewrites a campaign email for each group, using the brand voice.
- **.claude/hooks/resend-guard.js**: a PreToolUse hook that blocks sending to real addresses. Only @resend.dev addresses and my own address are allowed.
- **.mcp.json**: the Resend MCP server, pointed at a practice email server on localhost.
- **review/** and **scripts/review.mjs**: a headless review that checks an email with a fresh Claude session and a JSON schema.
- **notes/**: notes from the course steps, including the handoff note and the review-dig scratchpad.

## Running it

1. Start the practice email server: `npx emulate@0.12.3 start --service resend`
2. Open the folder in Claude Code and run `/personalize campaigns/steep-club-launch`.
3. Run the review: `node scripts/review.mjs <email file>`

Nothing is sent to real people. The guard hook and the practice server keep all sends in test mode.
