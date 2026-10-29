# Practice Launch Review: Steep Club, Email 01

Date: 30 October 2026
Campaign: `campaigns/steep-club-launch/` (Kettlebird Tea, sample brand)
Mode: Resend practice mode. Nothing new was sent during this review.

## Results

| Test | Pass or Fail | What we saw |
|---|---|---|
| 1. Find the three tagged emails | Pass | All three are there. Each one was **sent twice**, once at 20:26 and again at 20:31 on 29 Oct, so there are 6 tagged emails, not 3. |
| 2. Delivery status | Pass | All 6 tagged emails show **delivered**. |
| 3. Who received them | Pass | All 8 sent emails went to allowed addresses: 7 to `delivered@resend.dev` and 1 to MY_EMAIL. None went to anyone else. |
| 4. Subjects match email 01 | Pass | Each group's `01-its-here.md` has the subject "The Steep Club is open. You're hearing first". All 6 sent subjects match it once you take off the [group] tag. |

## Things to fix before a real launch

- **Double send.** The launch ran twice. That did no harm in practice mode, but real leads would get the email twice.
- **Blanks still in the emails:** `[box contents]`, `[cups per box]`, `[founding offer]`, `[offer end date]`, `[website]`, `{{company_address}}` and `{{unsubscribe_url}}`.

## What changes on a real Resend account

- Emails go to real people's inboxes instead of test addresses.
- You can't take a sent email back, so mistakes reach real people.
- Your sending name is on the line. If people mark your email as spam or it bounces, inboxes like Gmail may start treating you as spam.
- You send from your own verified domain, not `onboarding@resend.dev`.
- The law applies. Real people need a working unsubscribe link and a real business address.

## Why the guard still matters

- It stops mistakes like sending to the whole list by accident.
- It catches the wrong list or the wrong version, like the gift-buyers email going to daily-drinkers, or a draft that still has blanks.
- It makes "test first" the habit: send to yourself, check it, then send for real.
- It enforces the "never send to real people" rule in code, so you don't have to rely on Claude remembering it.
- When going live, change the guard on purpose so it allows the real list. Don't just switch it off.
