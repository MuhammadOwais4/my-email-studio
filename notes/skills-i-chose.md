# Choosing skills for my email studio

Searched skills.sh on 2026-10-29 for: "mail marketing", "mail sequence", "campaign plan", "resend". Nothing installed yet.

## The two sources I recommend

**1. For writing campaigns: `coreyhaines31/marketingskills`** (57K GitHub stars, 70–239K installs per skill)
- Not an official company, but by far the most-starred marketing skills repo, and it is updated often (last update Oct 2026).
- It has the skills I actually need: `emails`, `copywriting`, `cold-email`, `marketing-plan`, `launch`, `ab-testing`, `copy-editing`.
- High stars *and* high installs line up, which suggests real people use it.

**2. For sending mail: `resend/resend-skills`** (official Resend org, 208 stars, ~24K installs for `resend`)
- Published by Resend itself, the company whose API I'll send through, so the instructions should match the real API.
- Includes `resend`, `resend-cli`, `react-email`, and `email-best-practices`.
- Resend also runs `resend/react-email` (19.9K stars), which is a long-standing, trusted project.

Note: Anthropic's official `anthropics/skills` repo (184K stars) has no email or marketing skill, so there's no Anthropic option for this.

## Two results I would not trust

**1. `mbfinotti/sales-skills` (cold-email-deliverability) and `mbfinotti/advertising-skills`**
- They show 28K and 22K installs but only 3 and 2 GitHub stars, the repos are under two months old, and the owner has 1 follower.
- Install counts that high with almost no stars don't add up. The numbers may be inflated, so I can't tell whether anyone really uses these.

**2. `nudgen-marketing/mermail-skills` (mermail-compose-email, mermail-agent-inbox)**
- 12–14 installs and 4 stars. Almost nobody has used or checked these.
- "Agent inbox" and "mail agent" skills would get access to my email, so an unknown publisher is too risky for that.

(Also skipped: the `lark-mail` skills. They're popular but made for Feishu/Lark Mail, not for marketing email.)

## Three things to check before installing any skill

1. **Who publishes it.** Is it the official company (like `resend/` or `anthropics/`) or a well-known person? Look at the GitHub owner, not just the skill name.
2. **Do the numbers make sense together?** Stars, installs, repo age, and recent updates should tell the same story. Lots of installs with almost no stars on a brand-new repo is a warning sign.
3. **Read the SKILL.md and any scripts first.** Check what it tells the agent to do: does it run commands, ask for API keys, send data to unknown URLs, or touch my inbox? If I don't understand it, I don't install it.
