---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize

Write one version of each campaign email for each lead group. Drafts only. Never send, schedule, or test-send anything.

Campaign folder: `$ARGUMENTS`

## 1. Check the campaign folder

- If no campaign folder was given, use Glob on `campaigns/*/` and stop. Reply with the list of campaign folders and ask which one to use. Don't write anything.
- If the folder doesn't exist, or it has no `emails/*.md` files, stop and say so. Then list the campaign folders that do exist.

## 2. Find the brand and the rules

- Read `CLAUDE.md` and find the campaign in the "Brands and campaigns" table. Use only the voice file listed for it. Never use another brand's voice file.
- If the campaign isn't in the table, stop and say it needs a brand before it can be personalized.
- Read that voice file.
- Read every file in `.claude/rules/` whose `paths` match `<campaign folder>/emails/*.md`. Those rules only load on their own for that folder, so follow them yourself for every version you write.
- If the campaign folder has a `plan.md`, read what it says about each group: who they are, what they want, and what they worry about.

## 3. Find the groups

- Read `leads/leads.csv` and list each different value in the `group` column. For example: `tea-curious`, `gift-buyers`, `daily-drinkers`.
- Use only the group names. Don't copy any names, email addresses, or other details from the leads into an email.

## 4. Write one version per email per group

For each file in `<campaign folder>/emails/` and each group, write a version that changes only two things:

1. **The opening line.** This is the first sentence after the greeting. Rewrite it so it speaks to that group.
2. **One example.** Pick one example, bullet, or reason and reword it so it fits that group. Change only one.

Keep everything else exactly the same: the subject, the preview, the greeting with `{{first_name}}`, the structure and headings, the one main link and its button text, every `[placeholder]`, the sign-off, and the footer.

While you write:

- Use only facts that are already in the email or the plan. Don't fill in a `[placeholder]`, and don't add a new price, date, number, or delivery promise.
- Follow the voice file. Use its words, avoid the words it lists, and never make a claim it forbids.
- Write in plain English, with short sentences and everyday words.

## 5. Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`.
- Before writing, use Glob to check whether any of those files already exist. If any do, stop. List them and say they need to be moved or approved before they can be replaced. Never overwrite or delete a file.
- Don't change the original emails or any other file.

## 6. Reply

Reply with a short summary only:

- How many files you wrote (emails × groups).
- One example opening line for each group.

Nothing else.
