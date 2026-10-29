---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in a campaign's `emails/` folder, and only to those files.

Each email file must follow these rules, in this order from top to bottom.

1. **Subject line first.** The very first line is `Subject: ...`. The subject is 50 characters or fewer.
2. **Preview line second.** The second line is `Preview: ...`. The preview is 90 characters or fewer.
3. **Greet the reader by name.** The greeting uses `{{first_name}}`, for example "Hi {{first_name}},". Don't write a real name, and don't use any other placeholder for it.
4. **One main link only.** Each email has exactly one main link, written like this:
   `[Button text](https://kettlebird.example/steep-club)`
   Change the button text to suit the email, but keep that address. Don't add a second main link.
5. **End with the sign-off.** Use the sign-off from the voice file listed for this campaign in `CLAUDE.md`. Never use another brand's sign-off. For Kettlebird Tea campaigns, that is the sign-off in `brand/kettlebird-voice.md`:

   Warm wishes,
   The Kettlebird Tea Team
   [website]

6. **Then the footer.** Right after the sign-off, add these two lines exactly as written. Use plain text, not a code block.

   You're getting this because you joined the Kettlebird Tea waitlist.
   Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing comes after the footer.
